export default function UploadFile({ setHtml }) {
  const validateUpload = (data) => {
    if (!data) return false;
    if (typeof data !== "string") return false;
    if (data.length === 0) return false;
    
    // JSON.parse will throw an error if the string is not json
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  }

  const file = document.createElement("input");
  file.type = "file";
  file.accept = "application/json";
  file.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!validateUpload(e.target.result)) {
        alert("Invalid file");
        return;
      } else {
        setHtml(() => JSON.parse(e.target.result))
      }
    }
    reader.readAsText(file);
  };
  document.body.appendChild(file);
  file.click();
  document.body.removeChild(file);
  return;
}