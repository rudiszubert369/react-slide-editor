import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function handleExportToPDF(appRef) {
  const doc = new jsPDF();

  // Use html2canvas to capture a screenshot of the app
  html2canvas(appRef.current).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    // Calculate dimensions of PDF page (assuming A4 paper size)
    const pdfWidth = 210;
    const pdfHeight = 297;
    const appWidth = appRef.current.offsetWidth;
    const appHeight = appRef.current.offsetHeight;
    const scaleFactor = Math.min(pdfWidth / appWidth, pdfHeight / appHeight);
    const scaledWidth = appWidth * scaleFactor;
    const scaledHeight = appHeight * scaleFactor;

    // Add the app screenshot to the PDF document
    doc.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);

    // Save the PDF document
    doc.save('slide.pdf');
  });
}

export default handleExportToPDF;
