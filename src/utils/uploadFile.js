import { useState } from "react";

export default function UploadFile({ setMarkdown }) {

  const validateUpload = (data) => {
    if (!data) return false;
    if (typeof data !== "string") return false;
    if (data.length === 0) return false;
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
      const json = e.target.result;
      if (!validateUpload(json)) {
        alert("Invalid file");
        return;
      } else {
        setMarkdown(json);
      }
    }
    reader.readAsText(file);
  };
  document.body.appendChild(file);
  file.click();
  document.body.removeChild(file);
  return;
}