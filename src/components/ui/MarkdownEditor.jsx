import { useState } from 'react';
import { useRef } from 'react';
import ParseMarkdown from "../../features/ParseMarkdown";
import SaveFile from "../../features/SaveFile";
import Button from "./Button";
import "../../styles/MarkdownEditor.css";


export default function MarkdownEditor() {
  // store the current markdown in <textarea>
  const [markdown, setMarkdown] = useState("");
  // use ref for saving
  const ref = useRef(null);

  return (
    <div className="markdown-container">
      <div className="markdown-editor">
        <textarea
          className="markdown-input"
          placeholder='add text...'
          value={markdown}
          onChange={(e) => {
            const curr = e.target.value;
            ref.current = curr;
            setMarkdown(curr);
          }}
        />
      </div>

      <p className="preview-title">output: </p>
      <div className="markdown-preview">
        {ParseMarkdown({ markdown })}
      </div>

      <div className="markdown-file">
        <Button
          title="save"
          btnclass="btn-primary save-markdown"
          onClick={() => {
            ref.current.length === 0 ? alert("no markdown to save") : SaveFile({ list: ref.current });
          }}
        />
        <Button
          title="upload"
          btnclass="btn-dark upload-markdown"
        />
      </div>
    </div>
  );
}