import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TEXT_MAX_WIDTH, TITLE_MAX_WIDTH, TEXT_MIN_WIDTH, INPUT_TYPE_TITLE } from '../constants';

export function handleExportToPDF(appRef) {
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

export function handleExportToHTML(appRef) {
  const app = appRef.current;

  // Get the outer HTML of the app container
  const htmlContent = app.outerHTML;

  // Create a data URI from the HTML content
  const dataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);

  // Create a download link and simulate a click to trigger the download
  const downloadLink = document.createElement('a');
  downloadLink.href = dataUri;
  downloadLink.download = 'slide.html';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export function adjustTextareaWidth(ref, type) {
  const maxWidth = type === INPUT_TYPE_TITLE ? TITLE_MAX_WIDTH : TEXT_MAX_WIDTH;
  const lines = ref.value.split('\n');
  const fontSize = parseInt(getComputedStyle(ref).fontSize);
  const maxLineWidth = lines.reduce((max, line) => Math.max(max, line.length * fontSize * 0.6), 0);//*0.6 is a result of trial and error of trying to match design
  const inputWidth = Math.min(maxLineWidth + TEXT_MIN_WIDTH, maxWidth);

  ref.style.width = `${inputWidth}px`;
}