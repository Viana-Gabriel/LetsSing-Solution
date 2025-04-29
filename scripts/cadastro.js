document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step");
  const progressBar = document.getElementById("progress-bar");
  let currentStep = 0;

  const updateSteps = () => {
    steps.forEach((step, index) => {
      step.classList.toggle("d-none", index !== currentStep);
    });
    progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    progressBar.setAttribute("aria-valuenow", `${((currentStep + 1) / steps.length) * 100}`);
  };

  document.getElementById("next-1").addEventListener("click", () => {
    currentStep = 1;
    updateSteps();
  });

  document.getElementById("next-2").addEventListener("click", () => {
    currentStep = 2;
    updateSteps();
  });

  document.getElementById("back-2").addEventListener("click", () => {
    currentStep = 0;
    updateSteps();
  });

  document.getElementById("back-3").addEventListener("click", () => {
    currentStep = 1;
    updateSteps();
  });
});

const fileInput = document.getElementById('file-input');
const previewImage = document.getElementById('preview-image');
const uploadButton = document.getElementById('upload-button');
const cameraButton = document.getElementById('camera-button');
const cameraContainer = document.getElementById('camera-container');
const cameraPreview = document.getElementById('camera-preview');
const captureButton = document.getElementById('capture-button');

let cameraStream;

// Ação para upload de arquivo
uploadButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result; // Atualiza a pré-visualização
      stopCamera(); // Desliga a câmera se estiver ativa
      previewImage.classList.remove('d-none'); // Exibe a imagem
      cameraContainer.classList.add('d-none'); // Esconde o preview da câmera
    };
    reader.readAsDataURL(file);
  }
});

// Ação para ligar a câmera
cameraButton.addEventListener('click', async () => {
  if (cameraContainer.classList.contains('d-none')) {
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraPreview.srcObject = cameraStream;
      cameraContainer.classList.remove('d-none');
      previewImage.classList.add('d-none'); // Esconde o preview de imagem
      previewImage.src = './Assets/default-avatar.png'; // Reseta a pré-visualização
    } catch (error) {
      alert('Erro ao acessar a câmera: ' + error.message);
    }
  } else {
    stopCamera();
  }
});

captureButton.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = cameraPreview.videoWidth;
  canvas.height = cameraPreview.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
  previewImage.src = canvas.toDataURL('image/png');
  previewImage.classList.remove('d-none'); // Exibe a imagem capturada
  stopCamera(); 
});

// Função para desligar a câmera
function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
  }
  cameraContainer.classList.add('d-none');
  previewImage.classList.remove('d-none'); // Restaura a imagem pré-visualizada
}
