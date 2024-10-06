const canvas = document.getElementById("universeCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let objects = [];

function addStar() {
  const star = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    mass: 1e10, // Массив звезды
    radius: 10,
    color: "yellow",
    vx: Math.random() * 2 - 1, // Скорость по X
    vy: Math.random() * 2 - 1, // Скорость по Y
  };
  objects.push(star);
}

function addBlackHole() {
  const blackHole = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    mass: 1e12, // Масса черной дыры
    radius: 20,
    color: "black",
    vx: 0,
    vy: 0,
  };
  objects.push(blackHole);
}

function drawObject(obj) {
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
  ctx.fillStyle = obj.color;
  ctx.fill();
  ctx.closePath();
}

function updateObjectPosition(obj) {
  obj.x += obj.vx;
  obj.y += obj.vy;
}

function applyGravity() {
  const G = 6.6743e-11; // Гравитационная постоянная

  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      if (i !== j) {
        const dx = objects[j].x - objects[i].x;
        const dy = objects[j].y - objects[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > objects[i].radius + objects[j].radius) {
          const force = (G * objects[i].mass * objects[j].mass) / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          objects[i].vx += fx / objects[i].mass;
          objects[i].vy += fy / objects[i].mass;
        }
      }
    }
  }
}

function startSimulation() {
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    applyGravity();

    for (const obj of objects) {
      updateObjectPosition(obj);
      drawObject(obj);
    }

    requestAnimationFrame(loop);
  }

  loop();
}
