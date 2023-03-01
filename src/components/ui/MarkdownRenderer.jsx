import Split from "react-split";
import ParseLiteMarkdown from '../../features/ParseLiteMarkdown';
import "../../styles/MarkdownEditor.css";
import "../../styles/MarkdownCommands.css";

/**
 * MarkdownRenderer
 * @description - renders markdown editor and preview
 * @param {string} html - save textarea value to state
 * @param {function} setHtml
 * @param {string} layoutState - horizontal or vertical layout
 */
export default function MarkdownRenderer(
  {
    html,
    setHtml,
    layoutState,
  }) {
  return (
    <div className="markdown-container">
      <Split
        className={layoutState === "column" ? "split vert" : "split horiz"}
        direction={layoutState === "column" ? "vertical" : "horizontal"}
        sizes={[50, 50]}
        minSize={0}
        gutterSize={8}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
      >
        <div
          className="input-wrapper"
          style={{ height: layoutState === "column" ? "50%" : "100%", width: layoutState === "column" ? "100%" : "50%" }}
        >
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            spellCheck="false"
            className="markdown-input"
            placeholder="# MARKDOWN LITE&#10;## Write your markdown here... &#10;&#10;> (this is not traditional markdown).&#10;## Click on ? mark for list of commands.&#10;&#10;### Change layout/copy output w/ icons next to ? mark.&#10;&#10;### Grab & move divider to resize the editor/preview.&#10;&#10;### Download/Upload with top right icons (json)."
          />
        </div>
        <div
          className="output-wrapper"
          style={{ height: layoutState === "column" ? "50%" : "100%", width: layoutState === "column" ? "100%" : "50%" }}
        >
          {ParseLiteMarkdown({ html })}
        </div>
      </Split>
    </div>
  );
}