const videoElement = document.getElementById('video');
const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');
const randomWordElement = document.getElementById('randomWord');
let mediaRecorder, recordedChunks = [];

const palavras = ["Avião", "Casa", "Sol", "Carro", "Árvore", "Montanha", "Mar", "Céu", "Estrela", "Fogo"];

function obterPalavraAleatoria() {
  const palavraAleatoriaIndex = Math.floor(Math.random() * palavras.length);
  return palavras[palavraAleatoriaIndex];
}

async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoElement.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = ({ data }) => {
      if (data.size > 0) recordedChunks.push(data);
    };

    mediaRecorder.onstop = () => saveRecording();
  } catch (error) {
    alert('Erro ao acessar a câmera. Verifique as permissões.');
    console.error('Erro ao acessar a câmera:', error);
  }
}

function saveRecording() {
  alert('Vídeo salvo com sucesso!');
}

startButton.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state === 'inactive') {
    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
    alert('Gravação iniciada!');
  }
});

stopButton.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  randomWordElement.textContent = obterPalavraAleatoria();
  initCamera();
});