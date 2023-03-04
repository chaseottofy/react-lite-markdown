// .txt file
// mac users : https://macromates.com/
export default function UploadFile({setHtml}) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "text/plain";
  file.onchange = (e) => {
    const targetFile = e.target.files[0];
    if (!targetFile) return;
    if (targetFile.type !== "text/plain") {
      const invalidType = targetFile.type.split("/")[1]
      alert(`Invalid File : You upload (${invalidType}). This application only accepts .txt and .text files`);
      return;
    }
    if (targetFile.size > 50000) {
      alert("File is too large");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setHtml(e.target.result);
    }
    reader.readAsText(targetFile);
  };
  document.body.appendChild(file);
  file.click();
  // file.onchange = null;
  document.body.removeChild(file);
  return;
}