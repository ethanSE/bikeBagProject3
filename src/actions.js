export function debounce(fn, ms) {
    let timer
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

export function drawPoints(canvasRef, points, displayScaleFactor) {
    let ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 3;
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x * displayScaleFactor, point.y * displayScaleFactor, 10, 0, 2 * Math.PI);
        ctx.stroke();
    })
}

export function drawLines(canvasRef, points, displayScaleFactor) {
    for (let i = 0; i < points.length - 1; i++) {
        let ctx = canvasRef.current.getContext('2d');
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;
        ctx.moveTo(points[i].x * displayScaleFactor, points[i].y * displayScaleFactor);
        ctx.lineTo(points[i + 1].x * displayScaleFactor, points[i + 1].y * displayScaleFactor);
        ctx.stroke();
    }
}
