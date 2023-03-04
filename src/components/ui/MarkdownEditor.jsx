import { useState, useEffect, useDeferredValue } from "react";
// icon
import { IoLogoGithub } from "react-icons/io5";
// plugin : split editor and preview (allow user to resize)
import Split from "react-split";
import Tooltip from "./Tooltip";
import ParseLiteMarkdown from '../../features/ParseLiteMarkdown';
import useIsFirstRender from '../../hooks/useIsFirstRender';
import wordCounter from "../../utils/wordCounter";
import calcFileSize from "../../utils/calcFileSize";
import "../../styles/MarkdownEditor.css";
import "../../styles/Commands.css";

/**
 * @Component MarkdownRenderer
 * @param {string} html - save textarea value to state
 * @param {function} setHtml
 * @param {string} layoutState - horizontal or vertical layout
 */
export default function MarkdownRenderer({
  html,
  setHtml,
  layoutState,
}) {

  const isFirstRender = useIsFirstRender(); // bool
  const [wordCount, setWordCount] = useState(0);
  const [parsedSize, setParsedSize] = useState("0 Bytes"); // size of parsed html

  const [lines, setLines] = useState(16);
  const [currentLine, setCurrentLine] = useState("0px");
  const [topColHeight, setTopColHeight] = useState("50%");
  const deferredLines = useDeferredValue(lines);
  const [scrollH, setScrollH] = useState(0);

  const handleHtmlChange = (e) => {
    const curr = e.target.value;
    setHtml(curr);
  };

  const appendLineNumbers = () => {
    let lineNumbers = [];
    for (let i = 0; i < lines; i++) {
      lineNumbers.push(
        <div key={i} className="line-number">{i + 1}</div>
      );
    }
    return lineNumbers;
  };

  const createHighlightGrid = () => {
    const lineheight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--lineheight'));
    const height = document.querySelector(".markdown-container").offsetHeight;
    const rows = Math.ceil(height / lineheight);
    // console.log(rows);
    // console.log(lineheight);
  }

  const createLineNumbers = () => {
    const textarea = document.querySelector(".markdown-input");
    const textareaHeight = textarea.scrollHeight;
    if (textareaHeight === scrollH) return;
    setScrollH(textareaHeight);

    const lines = parseInt(textareaHeight / parseInt(getComputedStyle(textarea).lineHeight));
    setLines(lines);
    console.log('lines', lines);
  };

  // line numbers scroll with textarea
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const linePosition = document.querySelector(".line-numbers__wrapper");
    const outputwrapper = document.querySelector(".output-wrapper");
    linePosition.scrollTop = scrollTop;
    outputwrapper.scrollTop = scrollTop;
  };

  useEffect(() => {
    if (isFirstRender) return;
    createLineNumbers();
  }, [layoutState]);

  useEffect(() => {
    if (isFirstRender) return;
    if (deferredLines !== lines) {
      createLineNumbers();
    }

    const handleResize = () => createLineNumbers();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [deferredLines]);

  useEffect(() => {
    if (isFirstRender) return;
    setWordCount(wordCounter(html));
    setParsedSize(calcFileSize(html));
    createLineNumbers();
    createHighlightGrid();
  }, [html]);

  return (
    <div className="markdown-container">

      <div className="line-numbers__wrapper" style={{ height: layoutState === "column" ? topColHeight : "100%" }}>{appendLineNumbers()}</div>

      <Split
        className={layoutState === "column" ? "split vert" : "split horiz"}
        direction={layoutState === "column" ? "vertical" : "horizontal"}
        snapOffset={layoutState === "column" ? 30 : 30}
        minSize={layoutState === "column" ? 0 : [200, 0]}
        gutterSize={12}
        gutterAlign="center"
        sizes={[50, 50]}
        dragInterval={1}
        onDragEnd={(sizes) => {
          // may need to update if new width has triggered word wrap ...only when row layout
          createLineNumbers();
          if (layoutState === "column") {
            const newcalc = `calc(${String(100 - sizes[1]) + "%"} - 6px)`;
            setTopColHeight(newcalc);
          } else {
            setTopColHeight("100%");
          }
        }} 
      >
        <div
          className="input-wrapper"
          style={{height: layoutState === "column" ? "50%" : "100%", width: layoutState === "column" ? "100%" : "50%"}}
        >

          <div className="line-highlight__grid">
            <div className="lh"></div>
            <div className="lh"></div>
            <div className="lh"></div>
            <div className="lh"></div>
          </div>

          <textarea
            value={html}
            onChange={handleHtmlChange}
            spellCheck="false"
            rows="1"
            onScroll={handleScroll}
            className="markdown-input"
            placeholder="# MARKDOWN LITE&#10;## Write your markdown here... &#10;&#10;## Only ten commands exist at the moment. &#10;> Click on ? mark for complete list.&#10;&#10;### Change layout/copy output w/ icons next to ? mark.&#10;&#10;### Grab & move divider to resize the editor/preview.&#10;&#10;### Download/Upload with top right icons (json)."
          />
        </div>

        <div
          className={layoutState === "column" ? "markdown-output output-column" : "markdown-output"}
          style={{ height: layoutState === "column" ? "50%" : "100%", width: layoutState === "column" ? "100%" : "50%" }}
        >
          {ParseLiteMarkdown({ html })}
        </div>
      </Split>

      <div className="markdown-footer">
        <div className="markdown-footer__col1">
          <div className="footer-title">session: </div>
          <div className="bytes-total"><span>{parsedSize}</span></div>
          <div className="word-count">
            <span>{wordCount}</span>
            <span>words</span>
          </div>
          <div className="line-count">
            <span>{lines}</span>
            <span>lines</span>
          </div>
        </div>

        <div className="markdown-footer__col2">
          <Tooltip content="by chase ottofy" position="left">
            <a
              title="github repo link"
              rel="noreferrer"
              href="https://github.com/chaseottofy/react-lite-markdown"
              target="_blank"
              role="link"
              className="git-link__wrapper"
            >
              <span>repo</span>
              <IoLogoGithub className="git-link" />
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}