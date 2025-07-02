const video = document.getElementById('camera');
const canvas = document.getElementById('snapshot');
const button = document.getElementById('take-photo');

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false
    });
    video.srcObject = stream;
  } catch (error) {
    alert("Ошибка доступа к камере: " + error.message);
  }
}

button.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg');
  console.log("Снимок:", dataUrl);
  alert("Фото сделано — смотрите консоль");
});

startCamera();