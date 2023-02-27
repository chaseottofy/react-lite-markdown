import timestamp from "./timestamp";

/**
 * Recieve raw markdown text from <textarea> and save to json file.
 * Using vanilla 
 * @param {string} list
 * @description save value of textarea to json file
 * @returns {void}
 */
export default function saveFile({ list }) {
  const title = `MD_${timestamp()}.json`;
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(list)], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = title;
  document.body.appendChild(element);
  element.click();
}