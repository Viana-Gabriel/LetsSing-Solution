const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', () => {
    isDrawing = true;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!isDrawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}


document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


document.getElementById('saveSignatureManual').addEventListener('click', () => {
    const manualSignature = canvas.toDataURL();
    alert('Assinatura Manual Salva!');
    localStorage.setItem('assinatura',manualSignature)
    console.log(manualSignature)
});


document.getElementById('clearDigital').addEventListener('click', () => {
    document.getElementById('digital-signature').value = '';
});


document.getElementById('saveSignatureDigital').addEventListener('click', () => {
    const digitalSignature = document.getElementById('digital-signature').value;
    alert('Assinatura Digital Salva!');
    console.log(digitalSignature);
});