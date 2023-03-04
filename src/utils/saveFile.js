import timestamp from "./timestamp";
export default function saveFile({ html }) {
  const element = document.createElement("a");
  const file = new Blob([html], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `MD_${timestamp()}.txt`;
  document.body.appendChild(element);
  element.click();
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // always revoke blobs (learned the hard way)
  URL.revokeObjectURL(element.href); 
  document.body.removeChild(element);
}