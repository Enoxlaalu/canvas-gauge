const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cw = canvas.width;
const ch = canvas.height;

const PI = Math.PI;
const PI2 = PI * 2;
const r = 130;

ctx.lineCap = 'round';

const slider = document.getElementById('slider')

let percent = 50;
let start = 1
let end = 1
let color

slider.addEventListener('change', () => {
    start = 1
    end = 1
    percent = parseInt(slider.value)
    updateCanvas()
})

const arcs = [
    {
        start: 1,
        end: .54,
        color: 'red'
    },
    {
        start: .5,
        end: .415,
        color: 'orange'
    },
    {
        start: .375,
        end: .29,
        color: 'yellow'
    },
    {
        start: .25,
        end: 0,
        color: 'green'
    }
]

function drawArc({start, end, color, lineWidth}) {
    ctx.beginPath();
    ctx.arc(cw / 2, ch / 2, r, PI2 - PI * start, PI2 - PI * end);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth || 12;
    ctx.stroke();
}

function round(num) {
    return Math.round(num * 100) / 100
}

function drawGauge() {
    ctx.clearRect(0, 0, cw, ch);

    arcs.forEach(arc => drawArc(arc))

    const step = round(100 - start * 100)

    if (step < 50) color = 'red'
    if (step >= 50 && step <= 62) color = 'orange'
    if (step > 62 && step <= 75) color = 'yellow'
    if (step > 75) color = 'green'

    ctx.fillStyle = color;
    ctx.font = "48px Comic Sans MS";
    ctx.fillText(step.toString(), cw / 2 - 24, ch / 2)

    drawArc({start, end, color, lineWidth: 26})
    drawArc({start, end, color: 'white'})
}

function updateCanvas() {
    const percentPosition = round(1 - percent / 100)

    drawGauge()

    start = round(start - 0.01)
    end = round(end - 0.01)

    if (start <= percentPosition) {
        drawGauge()
        return
    }

    requestAnimationFrame(updateCanvas)
}

updateCanvas()