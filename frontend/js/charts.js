/* ============================================================
   PsychHealth AI — Web Application Visualizations
   High-DPI Retina charts matching screenshot inspirations:
   1. Semicircle PSS Gauge Meter (Screenshot 9)
   2. Grouped Before vs After Comparison Chart (Screenshot 15)
   3. Longitudinal Stress Score Line Chart (Screenshot 13)
   ============================================================ */

const Charts = {
    setupCanvas(canvas) {
        if (!canvas) return null;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        const width = rect.width || canvas.width || 320;
        const height = rect.height || canvas.height || 180;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        return { ctx, width, height };
    },

    /**
     * Semicircle Speedometer Gauge (Screenshot 9)
     * 180-degree arch with Low (0-13), Mod (14-26), High (27-40) zones
     */
    renderSemicircleGauge(canvasId, score = 22, maxScore = 40) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const setup = this.setupCanvas(canvas);
        if (!setup) return;
        const { ctx, width, height } = setup;

        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height - 20;
        const radius = Math.min(centerX - 24, centerY - 10);
        const arcWidth = 14;

        // Arch angles: PI (180deg) to 2*PI (360deg / 0deg)
        const startAngle = Math.PI;
        const totalAngle = Math.PI;

        // Segment 1: Low (0 to 13) -> 13/40 = 32.5%
        const angleLow = startAngle + (13 / 40) * totalAngle;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, angleLow);
        ctx.strokeStyle = '#10b981'; // Green
        ctx.lineWidth = arcWidth;
        ctx.lineCap = 'butt';
        ctx.stroke();

        // Segment 2: Moderate (14 to 26) -> 13/40 = 32.5%
        const angleMod = startAngle + (26 / 40) * totalAngle;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, angleLow, angleMod);
        ctx.strokeStyle = '#f59e0b'; // Amber
        ctx.lineWidth = arcWidth;
        ctx.lineCap = 'butt';
        ctx.stroke();

        // Segment 3: High (27 to 40) -> 14/40 = 35%
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, angleMod, startAngle + totalAngle);
        ctx.strokeStyle = '#ef4444'; // Red
        ctx.lineWidth = arcWidth;
        ctx.lineCap = 'butt';
        ctx.stroke();

        // Needle indicator
        const scoreFrac = Math.max(0, Math.min(1, score / maxScore));
        const needleAngle = startAngle + scoreFrac * totalAngle;
        const needleLength = radius - 8;

        const needleX = centerX + needleLength * Math.cos(needleAngle);
        const needleY = centerY + needleLength * Math.sin(needleAngle);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(needleX, needleY);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Center hub circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#0f172a';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    },

    /**
     * Grouped Before vs After Comparison Bar Chart (Screenshot 15)
     */
    renderBeforeAfterChart(canvasId, data = null) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const setup = this.setupCanvas(canvas);
        if (!setup) return;
        const { ctx, width, height } = setup;

        ctx.clearRect(0, 0, width, height);

        const metrics = data || [
            { label: 'PSS Score', before: 22, after: 17, max: 35, unit: 'pts', diff: '-5 pts', improved: true },
            { label: 'Sleep', before: 5.2, after: 7.0, max: 10, unit: 'hrs', diff: '+1.8 hrs', improved: true },
            { label: 'Study Hours', before: 2.1, after: 3.3, max: 6, unit: 'hrs', diff: '+1.2 hrs', improved: true }
        ];

        const padding = { top: 25, bottom: 40, left: 30, right: 30 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;
        const groupWidth = chartW / metrics.length;
        const barWidth = 26;

        metrics.forEach((m, idx) => {
            const groupX = padding.left + idx * groupWidth;
            const centerX = groupX + groupWidth / 2;

            // Before Bar
            const beforeH = (m.before / m.max) * chartH;
            const beforeY = padding.top + chartH - beforeH;
            const beforeX = centerX - barWidth - 3;

            ctx.fillStyle = '#3b82f6'; // Blue for Before
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(beforeX, beforeY, barWidth, beforeH, [4, 4, 0, 0]) : ctx.fillRect(beforeX, beforeY, barWidth, beforeH);
            ctx.fill();

            // Value label
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(m.before, beforeX + barWidth / 2, beforeY - 5);

            // After Bar
            const afterH = (m.after / m.max) * chartH;
            const afterY = padding.top + chartH - afterH;
            const afterX = centerX + 3;

            ctx.fillStyle = '#10b981'; // Green for After
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(afterX, afterY, barWidth, afterH, [4, 4, 0, 0]) : ctx.fillRect(afterX, afterY, barWidth, afterH);
            ctx.fill();

            // Value label
            ctx.fillStyle = '#059669';
            ctx.fillText(m.after, afterX + barWidth / 2, afterY - 5);

            // Group Label at bottom
            ctx.fillStyle = '#475569';
            ctx.font = '600 12px sans-serif';
            ctx.fillText(m.label, centerX, height - padding.bottom + 16);

            // Delta Pill
            ctx.fillStyle = m.improved ? '#10b981' : '#f59e0b';
            ctx.font = '500 10px sans-serif';
            ctx.fillText(m.diff, centerX, height - padding.bottom + 30);
        });
    },

    /**
     * Longitudinal Stress Score Curve — Sleek, High-DPI, Trend Chart
     */
    renderStressTrend(canvasId, assessments = []) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const setup = this.setupCanvas(canvas);
        if (!setup) return;
        const { ctx, width, height } = setup;

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.clearRect(0, 0, width, height);

        const list = assessments.length > 0 ? assessments : [
            { pss_score: 22, date: new Date(Date.now() - 7 * 86400000).toISOString(), label: 'Baseline' },
            { pss_score: 18, date: new Date().toISOString(), label: 'Current' }
        ];

        const padding = { top: 32, right: 38, bottom: 42, left: 38 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        const yForScore = (s) => padding.top + chartH - (Math.max(0, Math.min(40, s)) / 40) * chartH;

        // Draw Soft Normative Zone Bands
        const y0 = yForScore(0);
        const y13 = yForScore(13);
        const y26 = yForScore(26);
        const y40 = yForScore(40);

        // Low Zone (0-13): Soft Green
        ctx.fillStyle = isDark ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.08)';
        ctx.fillRect(padding.left, y13, chartW, y0 - y13);

        // Moderate Zone (14-26): Soft Amber
        ctx.fillStyle = isDark ? 'rgba(245, 158, 11, 0.06)' : 'rgba(245, 158, 11, 0.07)';
        ctx.fillRect(padding.left, y26, chartW, y13 - y26);

        // High Zone (27-40): Soft Red
        ctx.fillStyle = isDark ? 'rgba(239, 68, 68, 0.06)' : 'rgba(239, 68, 68, 0.07)';
        ctx.fillRect(padding.left, y40, chartW, y26 - y40);

        // Zone Boundary Dashed Lines & Labels
        const bands = [
            { score: 13, label: 'Low ≤13', color: '#10b981' },
            { score: 26, label: 'Mod ≤26', color: '#f59e0b' }
        ];

        bands.forEach(b => {
            const y = yForScore(b.score);
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = b.color;
            ctx.font = '600 10px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(b.label, width - padding.right, y - 4);
        });

        // Map Data Points
        const points = list.map((a, i) => {
            const x = list.length === 1
                ? padding.left + chartW / 2
                : padding.left + (i / (list.length - 1)) * chartW;
            const y = yForScore(a.pss_score);
            const dt = a.date ? new Date(a.date) : null;
            const dateStr = dt && !isNaN(dt) ? `${dt.getDate()}/${dt.getMonth() + 1}` : (a.label || `T${i + 1}`);
            return { x, y, score: a.pss_score, date: dateStr, level: a.pss_level };
        });

        // Shaded Gradient Fill Under Curve
        if (points.length > 1) {
            const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
            grad.addColorStop(0, isDark ? 'rgba(59, 130, 246, 0.35)' : 'rgba(37, 99, 235, 0.22)');
            grad.addColorStop(1, isDark ? 'rgba(59, 130, 246, 0.0)' : 'rgba(37, 99, 235, 0.0)');

            ctx.beginPath();
            ctx.moveTo(points[0].x, y0);
            ctx.lineTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                const prev = points[i - 1];
                const curr = points[i];
                const cx = (prev.x + curr.x) / 2;
                ctx.bezierCurveTo(cx, prev.y, cx, curr.y, curr.x, curr.y);
            }
            ctx.lineTo(points[points.length - 1].x, y0);
            ctx.closePath();
            ctx.fillStyle = grad;
            ctx.fill();

            // Smooth Trend Line
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                const prev = points[i - 1];
                const curr = points[i];
                const cx = (prev.x + curr.x) / 2;
                ctx.bezierCurveTo(cx, prev.y, cx, curr.y, curr.x, curr.y);
            }
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 3.5;
            ctx.lineCap = 'round';
            ctx.stroke();
        }

        // Render Data Point Bullets & Badges
        points.forEach((pt) => {
            // Glow halo
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 9, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(37, 99, 235, 0.18)';
            ctx.fill();

            // Main dot
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = '#2563eb';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Score Pill Badge
            const pillW = 46;
            const pillH = 18;
            const pillX = pt.x - pillW / 2;
            const pillY = pt.y - 28;

            ctx.fillStyle = isDark ? '#1e293b' : '#ffffff';
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 1.2;
            if (ctx.roundRect) {
                ctx.beginPath();
                ctx.roundRect(pillX, pillY, pillW, pillH, 9);
                ctx.fill();
                ctx.stroke();
            } else {
                ctx.fillRect(pillX, pillY, pillW, pillH);
            }

            ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
            ctx.font = '700 10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`${pt.score} PSS`, pt.x, pillY + 13);

            // Date text at bottom
            ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
            ctx.font = '500 11px sans-serif';
            ctx.fillText(pt.date, pt.x, height - padding.bottom + 20);
        });
    }
};
