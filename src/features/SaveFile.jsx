import timestamp from "../utils/timestamp";

export default function SaveFile({ list }) {
  const title = `MD_${timestamp()}.json`;
  // const element = document.createElement("a");
  // const file = new Blob([JSON.stringify(list)], { type: "text/plain" });
  // element.href = URL.createObjectURL(file);
  // element.download = "list.json";
  // document.body.appendChild(element);
  // element.click();
}