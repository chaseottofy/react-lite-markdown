import { useState, useEffect } from "react";
// plugin : split editor and preview : allow user to resize
import Split from "react-split";
// feature : parse markdown
import ParseLiteMarkdown from '../../features/ParseLiteMarkdown';
// styles
import "../../styles/MarkdownEditor.css";
import "../../styles/MarkdownCommands.css";

/**
 * MarkdownRenderer
 * @description - renders markdown editor and preview
 * @param {string} html - save textarea value to state
 * @param {function} setHtml
 * @param {string} layoutState - horizontal or vertical layout
 */
export default function MarkdownRenderer({
  html,
  setHtml,
  layoutState,
}) {

  // switch between word and char count on click
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [countState, setCountState] = useState("words");
  const [lines, setLines] = useState(1);

  const handleHtmlChange = (e) => {
    const curr = e.target.value;
    setHtml(curr);
    setWordCount(curr.split(" ").length);
    setCharCount(curr.split("").length);
  };

  const appendLineNumbers = () => {
    let lineNumbers = [];
    for (let i = 0; i < lines; i++) {
      lineNumbers.push(<div key={i} className="line-number">{i + 1}</div>)
    }
    return lineNumbers;
  }

  const createLineNumbers = () => {
    const textarea = document.querySelector(".markdown-input");
    const textareaHeight = textarea.scrollHeight;
    const lines = parseInt(textareaHeight/parseInt(getComputedStyle(textarea).lineHeight))
    setLines(lines);
  }

  useEffect(() => {
    createLineNumbers();
  }, [html]);

  useEffect(() => {
    const handleResize = () => {
      createLineNumbers();
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  // when textarea scrolls, scroll line numbers
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const linePosition = document.querySelector(".line-position");
    linePosition.scrollTop = scrollTop;
  }

  return (
    <div className="markdown-container">
      <div className="line-position">
        {appendLineNumbers()}
      </div>

      <div
        className="word-count"
        disabled={charCount === 0}
        onClick={() => setCountState((prev) => prev === "words" ? "chars" : "words")}
      >
        {countState === "words" ? wordCount : charCount}
      </div>

      <Split
        className={layoutState === "column" ? "split vert" : "split horiz"}
        direction={layoutState === "column" ? "vertical" : "horizontal"}
        sizes={[50, 50]}
        minSize={
          layoutState === "column" ? [0, 200] : [200, 0]
        }
        onDragEnd={createLineNumbers}
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
            onChange={handleHtmlChange}
            spellCheck="false"
            rows="1"
            onScroll={handleScroll}
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