const canvas = document.getElementById("animation");
const ctx = canvas.getContext("2d");
const message = document.getElementById("message");

let width, height;
let drops = [];
const fontSize = 16;
const characters = "01LOVEアイウエオカキクケコ";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  width = canvas.width;
  height = canvas.height;

  const columns = Math.ceil(width / fontSize);
  drops = Array.from(
    { length: columns },
    () => Math.random() * -50
  );
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Create falling digital rain
function drawRain() {
  ctx.fillStyle = "rgba(5, 0, 11, 0.12)";
  ctx.fillRect(0, 0, width, height);

  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = characters[
      Math.floor(Math.random() * characters.length)
    ];

    ctx.fillStyle =
      Math.random() > 0.95 ? "#ff8cfa" : "#b64cff";

    ctx.fillText(
      char,
      i * fontSize,
      drops[i] * fontSize
    );

    if (
      drops[i] * fontSize > height &&
      Math.random() > 0.975
    ) {
      drops[i] = 0;
    }

    drops[i] += 0.45;
  }
}

// Show words one after another
function showMessage(text) {
  message.classList.remove("show");

  setTimeout(() => {
    message.textContent = text;
    message.classList.add("show");
  }, 250);
}

// Draw a glowing heart using a mathematical formula
function drawHeart(progress) {
  const scale = Math.min(width / 35, height / 35, 12);
  const cx = width / 2;
  const cy = height / 2;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  ctx.beginPath();

  const maxAngle = Math.PI * 2 * progress;

  for (let t = 0; t <= maxAngle; t += 0.025) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    if (t === 0) {
      ctx.moveTo(x, -y);
    } else {
      ctx.lineTo(x, -y);
    }
  }

  ctx.strokeStyle = "#ff35c8";
  ctx.lineWidth = 0.35;
  ctx.shadowColor = "#ff00bb";
  ctx.shadowBlur = 15;
  ctx.stroke();

  ctx.restore();
}

// Run the complete animation
const startTime = performance.now();

function animate(now) {
  const elapsed = (now - startTime) / 1000;

  drawRain();

  if (elapsed < 2.5) {
    showTimedMessage("3", 0);
  } else if (elapsed < 5) {
    showTimedMessage("2", 2.5);
  } else if (elapsed < 7.5) {
    showTimedMessage("1", 5);
  } else if (elapsed < 10) {
    showTimedMessage("You", 7.5);
  } else if (elapsed < 12.5) {
    showTimedMessage("My", 10);
  } else if (elapsed < 15) {
    showTimedMessage("Love", 12.5);
  } else {
    message.classList.remove("show");

    const progress = Math.min(
      (elapsed - 15) / 3,
      1
    );

    drawHeart(progress);

    if (progress >= 1) {
      message.textContent = "I Love You Saru ❤️";
      message.classList.add("show");
    }
  }

  requestAnimationFrame(animate);
}

let currentStage = "";

function showTimedMessage(text, start) {
  if (currentStage !== text && elapsedForMessage(start)) {
    currentStage = text;
    showMessage(text);
  }
}

function elapsedForMessage(start) {
  return true;
}

requestAnimationFrame(animate);
