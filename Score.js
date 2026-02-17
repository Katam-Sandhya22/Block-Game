const canvas = document.getElementById('c'),
    ctx = canvas.getContext('2d');
let bird = 200,
    v = 0,
    score = 0,
    pipes = [],
    over = false;
let high = localStorage.getItem('best') || 0; // Load highest score

window.onclick = () => over ? reset() : v = -6; // Jump or restart

function reset() {
    bird = 200;
    v = 0;
    score = 0;
    pipes = [];
    over = false;
    loop();
}

function loop() {
    if (over) return;
    v += 0.3;
    bird += v; // Gravity logic
    ctx.clearRect(0, 0, 320, 480);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(50, bird, 25, 25); // Bird

    if (pipes.length == 0 || pipes[pipes.length - 1].x < 150)
        pipes.push({ x: 320, y: Math.random() * 200 + 50 });

    pipes.forEach((p, i) => {
        p.x -= 2; // Move trees
        ctx.fillStyle = 'green';
        ctx.fillRect(p.x, 0, 40, p.y); // Top tree
        ctx.fillRect(p.x, p.y + 120, 40, 480); // Bottom tree

        // Collision & Scoring
        if (p.x < 75 && p.x > 10 && (bird < p.y || bird > p.y + 95)) over = true;
        if (p.x == 50) score++;
        if (p.x < -40) pipes.splice(i, 1);
    });

    if (bird > 480 || bird < 0) over = true;
    if (over) {
        if (score > high) localStorage.setItem('best', score); // Save record
        ctx.fillStyle = "white";
        ctx.fillText("OUT! Click to Restart", 80, 240);
    } else {
        requestAnimationFrame(loop);
    }
    document.getElementById('s').innerText = score;
    document.getElementById('h').innerText = localStorage.getItem('best') || 0;
}
loop();