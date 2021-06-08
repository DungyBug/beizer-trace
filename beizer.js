let BEIZER_SUBDIVISION = 1; // Higher value - less quality of beizer curve

/*
filterBeizer

Returns Beizer-filtered point

@points - points array
@t - Coefficient, from 0 to 1
*/
function filterBeizer(points, t) {
    let _points = points;
    let newPoints = [];

    while(newPoints.length !== 1) {
        newPoints = [];

        for(let i = 0; i < _points.length - 1; i++) {
            newPoints.push({
                x: _points[i].x + (_points[i + 1].x - _points[i].x) * t,
                y: _points[i].y + (_points[i + 1].y - _points[i].y) * t
            })
        }

        _points = newPoints;
    }

    return newPoints[0];
}

/*
getSummaryLength

Gets total length of line, maked by points argument
*/
function getSummaryLength(points) {
    let length = 0;

    for(let i = 0; i < points.length - 1; i++) {
        let p = {
            x: points[0].x - points[i].x,
            y: points[0].y - points[i].y
        }
        let p2 = {
            x: points[points.length - 1].x - points[i].x,
            y: points[points.length - 1].y - points[i].y
        }
        length += Math.sqrt(p.x * p.x + p.y * p.y) + Math.sqrt(p2.x * p2.x + p2.y * p2.y);
    }

    return length * 0.5;
}

/*
drawBeizerCurve

Draws Beizer Curve
*/
function drawBeizerCurve(ctx, points) {
    if(points.length < 2) {
        return;
    }

    let inc = BEIZER_SUBDIVISION / getSummaryLength(points);

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for(let i = 0; i < 1; i += inc) {
        ctx.strokeStyle = "hsl(" + i * 360 + ", 100%, 50%)";

        let p = filterBeizer(points, i);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
    }

    ctx.stroke();
}