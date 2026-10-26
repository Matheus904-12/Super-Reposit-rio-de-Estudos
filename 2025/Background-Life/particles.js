const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('particles').appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.xSpeed = (Math.random() - 0.5) * 2;
    this.ySpeed = (Math.random() - 0.5) * 2;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > canvas.width) this.xSpeed *= -1;
    if (this.y < 0 || this.y > canvas.height) this.ySpeed *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
  }
}

function createParticles(num) {
  particles = [];
  for (let i = 0; i < num; i++) particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles(100);
});

createParticles(100);
animate();
