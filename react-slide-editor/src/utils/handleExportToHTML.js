function handleExportToHTML(appRef) {
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

export default handleExportToHTML;