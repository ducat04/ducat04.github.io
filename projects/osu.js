const game = document.getElementById("game");
const cursor = document.getElementById("cursor");

let mouseX = 0;
let mouseY = 0;
let circles = [];
let gameStarted = false;

const HIT_TIME = 1000;


document.getElementById("startBtn").onclick = () => {
  document.getElementById("startModal").style.display = "none";
  gameStarted = true;
};


document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});


function clickEffect() {
  cursor.classList.add("click");
  setTimeout(() => cursor.classList.remove("click"), 50);
}


function showText(text, x, y) {
  const el = document.createElement("div");
  el.className = "hit-text";
  el.textContent = text;
  el.style.left = x + "px";
  el.style.top = y + "px";
  game.appendChild(el);
  setTimeout(() => el.remove(), 800);
}


function hit() {
  if (circles.length === 0) return;

  let best = null;
  let bestDist = Infinity;

  circles.forEach(c => {
    const dx = mouseX - c.x;
    const dy = mouseY - c.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < bestDist) {
      bestDist = dist;
      best = c;
    }
  });

  if (!best || bestDist > 60) return;

  const elapsed = Date.now() - best.spawnTime;
  const diff = Math.abs(elapsed - HIT_TIME);

  let result = "Bad";

  if (diff < 120) result = "Perfect!";
  else if (diff < 280) result = "Nice!";
  else result = "Bad";

  showText(result, best.x, best.y);

  best.circle.remove();
  best.approach.remove();
  circles = circles.filter(c => c !== best);
}


document.addEventListener("mousedown", () => {
  clickEffect();
  hit();
});

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "x" || e.key.toLowerCase() === "z") {
    clickEffect();
    hit();
  }
});

function spawnCircle() {
  const circle = document.createElement("div");
  const approach = document.createElement("div");

  circle.className = "circle";
  approach.className = "approach";

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  circle.style.left = x + "px";
  circle.style.top = y + "px";
  approach.style.left = x + "px";
  approach.style.top = y + "px";

  const obj = {
    x, y,
    circle,
    approach,
    spawnTime: Date.now()
  };

  circles.push(obj);

  setTimeout(() => {
    if (circle.parentNode) {
      showText("Miss", x, y);
      circle.remove();
      approach.remove();
      circles = circles.filter(c => c !== obj);
    }
  }, HIT_TIME + 300);

  game.appendChild(circle);
  game.appendChild(approach);
}

setInterval(() => {
  if (gameStarted) {
    spawnCircle();
  }
}, 700);
