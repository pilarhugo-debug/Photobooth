const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snap = document.getElementById("snap");
const countdown = document.getElementById("countdown");

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => { video.srcObject = stream; });

const TOTAL_PHOTOS = 3;
const photos = [];

function waitSeconds(n) {
  return new Promise(resolve => {
    let remaining = n;
    countdown.textContent = remaining;
    const interval = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(interval);
        countdown.textContent = "";
        resolve();
      } else {
        countdown.textContent = remaining;
      }
    }, 1000);
  });
}

function takePhoto() {
  const offscreen = document.createElement("canvas");
  offscreen.width = video.videoWidth;
  offscreen.height = video.videoHeight;
  const ctx = offscreen.getContext("2d");
  ctx.drawImage(video, 0, 0);
  return offscreen.toDataURL("image/png");
}

function buildStrip() {
  const w = video.videoWidth;
  const h = video.videoHeight;
  const padding = 20;
  const gap = 15;

  canvas.width = w + padding * 2;
  canvas.height = h * TOTAL_PHOTOS + gap * (TOTAL_PHOTOS - 1) + padding * 2;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  photos.forEach((dataUrl, i) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const y = padding + i * (h + gap);
      ctx.drawImage(img, padding, y, w, h);
    };
  });
}

snap.addEventListener("click", async () => {
  snap.disabled = true;
  photos.length = 0;

  for (let i = 0; i < TOTAL_PHOTOS; i++) {
    await waitSeconds(3);
    photos.push(takePhoto());
  }

  buildStrip();
  snap.disabled = false;
});
