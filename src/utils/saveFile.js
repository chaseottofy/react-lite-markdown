import timestamp from "./timestamp";
/**
 * Recieve raw markdown text from <textarea> and save to json file.
 * Using vanilla 
 * @param {string} html
 * @description save value of textarea to json file
 * @returns {void}
 */
export default function saveFile({ html }) {
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(html)], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `MD_${timestamp()}.json`;
  document.body.appendChild(element);
  element.click();
}