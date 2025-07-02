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
  const vw = video.videoWidth;
  const vh = video.videoHeight;

  canvas.width = vw;
  canvas.height = vh;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, vw, vh);

  // Координаты рамки в процентах (из CSS)
  const frameLeft = 0.05 * vw;
  const frameTop = 0.10 * vh;
  const frameWidth = 0.90 * vw;
  const frameHeight = 0.60 * vh;

  // Создание нового canvas под вырезанный снимок
  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = frameWidth;
  croppedCanvas.height = frameHeight;
  const croppedCtx = croppedCanvas.getContext('2d');

  croppedCtx.drawImage(canvas, frameLeft, frameTop, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

  // Получаем обрезанное изображение
  const croppedDataUrl = croppedCanvas.toDataURL('image/jpeg');
  console.log("Обрезанное фото:", croppedDataUrl);
  alert("Фото обрезано по рамке — смотрите консоль");
});

startCamera();
