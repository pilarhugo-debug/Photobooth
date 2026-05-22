const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snap = document.getElementById("snap");

navigator.mediaDevices.getUserMedia({
  video: true
})
.then((stream) => {
  video.srcObject = stream;
});

snap.addEventListener("click", () => {

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");

  // limpiar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // espejo REAL
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);

  // dibujar
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // resetear transformación
  ctx.setTransform(1, 0, 0, 1, 0, 0);

});
