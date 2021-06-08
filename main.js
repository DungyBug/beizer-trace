const ctx = document.getElementById("ctx").getContext("2d");

let points = [];
let mx = 0, my = 0;

BEIZER_SUBDIVISION = 128;

function draw() {

    if(points.length > 100) { // We need array with length 100 max
        points.shift();
    }
    points.push({x: mx, y: my});

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 1920, 1080);
    ctx.lineWidth = 8;
    drawBeizerCurve(ctx, points);

    requestAnimationFrame(draw);
}

document.onmousemove = (e) => {
    mx = e.pageX;
    my = e.pageY;
}

draw();