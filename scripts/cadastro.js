// steps.js
document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".step");
    const progressBar = document.getElementById("progress-bar");
    let currentStep = 0;

    const updateSteps = () => {
        steps.forEach((step, index) => {
            step.classList.toggle("d-none", index !== currentStep);
        });
        const progress = ((currentStep + 1) / steps.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute("aria-valuenow", `${progress}`);
    };

    window.resetStepsToFirst = function () {
        currentStep = 0;
        updateSteps();
    };

    document.getElementById("next-1").addEventListener("click", () => {
        const nome = document
            .querySelector('[name="NomeCompleto"]')
            .value.trim();
        const email = document.querySelector('[name="E-mail"]').value.trim();
        const telefone = document
            .querySelector('[name="NumeroTelefone"]')
            .value.trim();

        if (!nome || !email || !telefone) {
            alert("Por favor, preencha todos os campos antes de continuar.");
            return;
        }

        currentStep = 1;
        updateSteps();
    });

    document.getElementById("next-2").addEventListener("click", () => {
        const senha = document.querySelector('[name="Senha"]').value.trim();
        const confirmarSenha = document
            .querySelector('[name="ConfirmarSenha"]')
            .value.trim();

        if (!senha || !confirmarSenha) {
            alert("Preencha a senha e a confirmação.");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

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

const fileInput = document.getElementById("file-input");
const previewImage = document.getElementById("preview-image");
const uploadButton = document.getElementById("upload-button");
const cameraButton = document.getElementById("camera-button");
const cameraContainer = document.getElementById("camera-container");
const cameraPreview = document.getElementById("camera-preview");
const captureButton = document.getElementById("capture-button");

let cameraStream;

// Ação para upload de arquivo
uploadButton.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataUrl = e.target.result;
            previewImage.src = imageDataUrl;
            stopCamera();
            previewImage.classList.remove("d-none");
            cameraContainer.classList.add("d-none");

            localStorage.setItem("imgDocumento", imageDataUrl); // salva no localStorage
        };
        reader.readAsDataURL(file);
    }
});

// Ação para ligar a câmera
cameraButton.addEventListener("click", async () => {
    if (cameraContainer.classList.contains("d-none")) {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            cameraPreview.srcObject = cameraStream;
            cameraContainer.classList.remove("d-none");
            previewImage.classList.add("d-none");
            previewImage.src = "./Assets/default-avatar.png";
        } catch (error) {
            alert("Erro ao acessar a câmera: " + error.message);
        }
    } else {
        stopCamera();
    }
});

// Captura imagem da câmera
captureButton.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    canvas.width = cameraPreview.videoWidth;
    canvas.height = cameraPreview.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    previewImage.src = dataUrl;
    previewImage.classList.remove("d-none");
    stopCamera();

    localStorage.setItem("imgDocumento", dataUrl); // salva no localStorage
});

// Função para desligar a câmera
function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
        cameraStream = null;
    }
    cameraContainer.classList.add("d-none");
    previewImage.classList.remove("d-none");
}
