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

  ctx.save();

  ctx.scale(-1, 1);
  ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);

  ctx.restore();

});
