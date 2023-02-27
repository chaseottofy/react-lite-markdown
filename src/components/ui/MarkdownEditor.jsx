import ParseMarkdown from "../../features/ParseMarkdown";
import "../../styles/MarkdownEditor.css";

function handleResize(e) {

}

export default function MarkdownEditor(
  { markdown, setMarkdown, layoutState }
) {
  return (
    <div
      className={layoutState === "column" ? "markdown-container vert" : "markdown-container horiz"}
    >
      {/* <div 
        className="markdown-resize"
      ></div> */}

      <div className="markdown-editor">
        <textarea
          className="markdown-input"
          placeholder='add text...'
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
      <div className="markdown-preview">
        {ParseMarkdown({ markdown })}
      </div>
    </div>
  );
}