document.getElementById('download-pdf').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();


  doc.setFontSize(18);
  doc.text('Contrato de Serviço', 20, 20);
  doc.setFontSize(12);
  doc.text('Este é um contrato fictício gerado pelo sistema LetsSign.', 20, 30);
  doc.text('Data e hora da assinatura: 02/12/2024, 14:35', 20, 40);


  const signatureData = localStorage.getItem('assinatura'); 
  if (signatureData) {
      doc.addImage(signatureData, 'PNG', 20, 50, 100, 25);
  } else {
  
      doc.text('Assinatura não encontrada.', 20, 60);
  }


  doc.save('Contrato-de-servico.pdf');
});
