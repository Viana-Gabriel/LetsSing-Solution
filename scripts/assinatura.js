const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

// Desenho manual
canvas.addEventListener("mousedown", () => {
    isDrawing = true;
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function draw(event) {
    if (!isDrawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

document.getElementById("clearCanvas").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("saveSignatureManual").addEventListener("click", () => {
    const manualSignature = document.getElementById("canvas").toDataURL();
    localStorage.setItem("assinatura_manual", manualSignature);
    localStorage.removeItem("assinatura_digital");
    alert("Assinatura Manual Salva!");
    window.location.href = "./video.html";
});

document
    .getElementById("saveSignatureDigital")
    .addEventListener("click", () => {
        const digitalSignature = document
            .getElementById("digital-signature")
            .value.trim();

        if (digitalSignature === "") {
            alert("Digite sua assinatura digital antes de salvar.");
            return;
        }

        localStorage.setItem("assinatura_digital", digitalSignature);
        localStorage.removeItem("assinatura_manual");
        alert("Assinatura Digital Salva!");
        window.location.href = "./video.html";
    });

document.getElementById("clearDigital").addEventListener("click", () => {
    document.getElementById("digital-signature").value = "";
});
