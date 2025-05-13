document.getElementById("download-pdf").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const now = new Date();
    const dia = String(now.getDate()).padStart(2, "0");
    const mes = String(now.getMonth() + 1).padStart(2, "0");
    const ano = now.getFullYear();
    const horas = String(now.getHours()).padStart(2, "0");
    const minutos = String(now.getMinutes()).padStart(2, "0");
    const dataHoraFormatada = `${dia}/${mes}/${ano}, ${horas}:${minutos}`;

    doc.setFontSize(18);
    doc.text("Contrato de Serviço", 20, 20);
    doc.setFontSize(12);
    doc.text(
        "Este é um contrato fictício gerado pelo sistema LetsSign.",
        20,
        30
    );
    doc.text(`Data e hora da assinatura: ${dataHoraFormatada}`, 20, 40);

    const assinaturaManual = localStorage.getItem("assinatura_manual");
    const assinaturaDigital = localStorage.getItem("assinatura_digital");

    if (assinaturaManual) {
        doc.setFontSize(12);
        doc.text("Assinatura Manual:", 20, 50);
        doc.addImage(assinaturaManual, "PNG", 20, 55, 100, 30);
    } else if (assinaturaDigital) {
        doc.setFontSize(12);
        doc.text("Assinatura Digital:", 20, 50);
        doc.setFontSize(14);
        doc.text(assinaturaDigital, 20, 60);
    } else {
        doc.text("Nenhuma assinatura foi fornecida.", 20, 50);
    }

    doc.save("Contrato-de-servico.pdf");
});
