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
        const parentW = canvas.parentElement ? canvas.parentElement.clientWidth : 0;
        const rect = canvas.getBoundingClientRect();

        const width = parentW || rect.width || canvas.width || 320;
        const height = rect.height || (canvas.parentElement ? canvas.parentElement.clientHeight : 0) || canvas.height || 180;

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
     * Clean, Elegant Longitudinal Stress Curve (Progress Trends)
     * Defined trend curve with soft zone shading, smooth bezier interpolation,
     * crisp data markers, and legible date badges.
     */
    renderStressTrend(canvasId, assessments = []) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const setup = this.setupCanvas(canvas);
        if (!setup) return;
        const { ctx, width, height } = setup;

        ctx.clearRect(0, 0, width, height);

        const list = assessments.length > 0 ? assessments : [
            { pss_score: 22, date: '2026-09-28', label: 'Baseline' },
            { pss_score: 17, date: '2026-10-05', label: 'Day 7' }
        ];

        const padding = { top: 32, right: 44, bottom: 40, left: 36 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        const yForScore = (s) => padding.top + chartH - (Math.max(0, Math.min(40, s)) / 40) * chartH;

        // 1. Soft Normative Background Zone Shading
        const yHigh = yForScore(40);
        const yMod = yForScore(26);
        const yLow = yForScore(13);
        const yBottom = yForScore(0);

        // High zone (27–40)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.04)';
        ctx.fillRect(padding.left, yHigh, chartW, yMod - yHigh);

        // Moderate zone (14–26)
        ctx.fillStyle = 'rgba(245, 158, 11, 0.04)';
        ctx.fillRect(padding.left, yMod, chartW, yLow - yMod);

        // Low zone (0–13)
        ctx.fillStyle = 'rgba(16, 185, 129, 0.04)';
        ctx.fillRect(padding.left, yLow, chartW, yBottom - yLow);

        // 2. Subtle horizontal benchmark lines
        const bands = [
            { score: 13, label: 'Low ≤13', color: '#10b981' },
            { score: 26, label: 'Mod ≤26', color: '#f59e0b' }
        ];

        bands.forEach(b => {
            const y = yForScore(b.score);
            ctx.beginPath();
            ctx.setLineDash([4, 4]);
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);

            // Label pill on the right margin
            ctx.fillStyle = b.color;
            ctx.font = '600 10px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(b.label, width - padding.right + 6, y + 3);
        });

        // 3. Calculate Point Coordinates
        const points = list.map((a, i) => {
            const x = list.length === 1
                ? padding.left + chartW / 2
                : padding.left + (i / (list.length - 1)) * chartW;
            const y = yForScore(a.pss_score);

            // Clean formatted date label
            let dateStr = `A#${i + 1}`;
            if (a.date) {
                try {
                    const d = new Date(a.date);
                    if (!isNaN(d.getTime())) {
                        dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                    }
                } catch (e) {}
            }
            return { x, y, score: a.pss_score, dateLabel: dateStr, level: a.pss_level };
        });

        // 4. Smooth Bezier Curve & Soft Gradient Fill Underneath
        if (points.length > 1) {
            // Gradient Fill
            const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
            grad.addColorStop(0, 'rgba(13, 148, 136, 0.22)');
            grad.addColorStop(1, 'rgba(13, 148, 136, 0.01)');

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 0; i < points.length - 1; i++) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
            }
            ctx.quadraticCurveTo(
                points[points.length - 1].x,
                points[points.length - 1].y,
                points[points.length - 1].x,
                points[points.length - 1].y
            );
            // Close path along the bottom
            ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
            ctx.lineTo(points[0].x, padding.top + chartH);
            ctx.closePath();
            ctx.fillStyle = grad;
            ctx.fill();

            // Main Stroke Curve
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 0; i < points.length - 1; i++) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
            }
            ctx.quadraticCurveTo(
                points[points.length - 1].x,
                points[points.length - 1].y,
                points[points.length - 1].x,
                points[points.length - 1].y
            );
            ctx.strokeStyle = '#0d9488'; // Clean Teal
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.stroke();
        }

        // 5. Draw Clean Points & Legible Floating Badges
        points.forEach((pt, idx) => {
            // Outer pulse circle
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.strokeStyle = '#0d9488';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Inner dot
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.5, 0, 2 * Math.PI);
            ctx.fillStyle = '#0d9488';
            ctx.fill();

            // Pill Badge for Score (Offset dynamically to prevent clipping)
            const pillY = Math.max(padding.top + 12, pt.y - 12);
            const scoreText = `${pt.score}`;
            ctx.font = 'bold 11px sans-serif';
            const textW = ctx.measureText(scoreText).width;

            // Small badge background
            ctx.fillStyle = pt.score <= 13 ? 'rgba(16, 185, 129, 0.95)' : pt.score <= 26 ? 'rgba(245, 158, 11, 0.95)' : 'rgba(239, 68, 68, 0.95)';
            const pillW = textW + 12;
            const pillH = 16;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(pt.x - pillW / 2, pillY - pillH + 3, pillW, pillH, 8);
            } else {
                ctx.fillRect(pt.x - pillW / 2, pillY - pillH + 3, pillW, pillH);
            }
            ctx.fill();

            // Badge text
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(scoreText, pt.x, pillY);

            // Clean X-Axis Date Label
            ctx.fillStyle = '#64748b';
            ctx.font = '500 10px sans-serif';
            ctx.textAlign = 'center';

            // Show date every 1 or 2 items if many
            const shouldShowDate = points.length <= 8 || idx === 0 || idx === points.length - 1 || idx % 2 === 0;
            if (shouldShowDate) {
                ctx.fillText(pt.dateLabel, pt.x, height - padding.bottom + 18);
            }
        });
    },

    /**
     * Lifestyle Multi-Metric Chart (Sleep, Screen, Study over Time)
     * Feeds directly from Daily Habit Logs into Progress Trends
     */
    renderLifestyleTrends(canvasId, habits = []) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const setup = this.setupCanvas(canvas);
        if (!setup) return;
        const { ctx, width, height } = setup;

        ctx.clearRect(0, 0, width, height);

        if (!habits || habits.length === 0) return;

        const padding = { top: 25, right: 30, bottom: 35, left: 35 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        const maxHours = 12;
        const yForHrs = (h) => padding.top + chartH - (Math.min(maxHours, Math.max(0, h)) / maxHours) * chartH;

        // Draw grid lines
        [3, 6, 9].forEach(h => {
            const y = yForHrs(h);
            ctx.beginPath();
            ctx.setLineDash([3, 3]);
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)';
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#94a3b8';
            ctx.font = '9px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(`${h}h`, padding.left - 6, y + 3);
        });

        // Series: Sleep (Indigo), Screen (Purple), Study (Emerald)
        const series = [
            { key: 'sleep_hours', color: '#3b82f6', label: 'Sleep' },
            { key: 'screen_hours', color: '#a855f7', label: 'Screen' },
            { key: 'study_hours', color: '#10b981', label: 'Study' }
        ];

        series.forEach(s => {
            const pts = habits.map((entry, idx) => {
                const x = habits.length === 1 ? padding.left + chartW / 2 : padding.left + (idx / (habits.length - 1)) * chartW;
                const val = parseFloat(entry[s.key]) || 0;
                const y = yForHrs(val);
                return { x, y, val };
            });

            if (pts.length > 1) {
                ctx.beginPath();
                ctx.moveTo(pts[0].x, pts[0].y);
                for (let i = 1; i < pts.length; i++) {
                    ctx.lineTo(pts[i].x, pts[i].y);
                }
                ctx.strokeStyle = s.color;
                ctx.lineWidth = 2.2;
                ctx.stroke();
            }

            pts.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3.5, 0, 2 * Math.PI);
                ctx.fillStyle = s.color;
                ctx.fill();
            });
        });

        // Bottom Date Labels
        habits.forEach((entry, idx) => {
            const x = habits.length === 1 ? padding.left + chartW / 2 : padding.left + (idx / (habits.length - 1)) * chartW;
            ctx.fillStyle = '#64748b';
            ctx.font = '9px sans-serif';
            ctx.textAlign = 'center';
            const dateParts = entry.date ? entry.date.split('-') : [];
            let label = dateParts.length >= 3 ? `${dateParts[1]}/${dateParts[2]}` : `D${idx + 1}`;
            if (entry.timestamp && habits.filter(h => h.date === entry.date).length > 1) {
                try {
                    const t = new Date(entry.timestamp);
                    label = `${label} ${t.getHours()}:${String(t.getMinutes()).padStart(2, '0')}`;
                } catch(e) {}
            }
            ctx.fillText(label, x, height - padding.bottom + 16);
        });
    }
};
