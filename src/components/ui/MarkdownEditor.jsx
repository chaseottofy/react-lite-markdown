import { useState, useEffect, useDeferredValue } from "react";
// icon
import { AiFillGithub } from "react-icons/ai";
import { RiFolderDownloadFill, RiFileUploadLine } from "react-icons/ri";
// plugin : split editor and preview (allow user to resize)
import Split from "react-split";
import Tooltip from "./Tooltip";
import Button from "./Button";
import ParseLiteMarkdown from '../../features/ParseLiteMarkdown';
import useIsFirstRender from '../../hooks/useIsFirstRender';
import wordCounter from "../../utils/wordCounter";
import calcFileSize from "../../utils/calcFileSize";
import saveFile from "../../utils/saveFile";
import uploadFile from "../../utils/uploadFile";
import "../../styles/MarkdownEditor.css";
import "../../styles/Commands.css";
import "../../styles/Footer.css";

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

  const calcLineNumbers = () => {
    const textarea = document.querySelector(".markdown-input");
    const textareaHeight = textarea.scrollHeight;
    if (textareaHeight === scrollH) return;
    setScrollH(textareaHeight);
    const lines = parseInt(textareaHeight / parseInt(getComputedStyle(textarea).lineHeight));
    setLines(lines);
  };

  // line numbers scroll with textarea
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const linePosition = document.querySelector(".line-numbers__wrapper");
    const outputwrapper = document.querySelector(".markdown-output");
    linePosition.scrollTop = scrollTop;
    outputwrapper.scrollTop = scrollTop;
  };

  useEffect(() => {
    if (isFirstRender) return;
    calcLineNumbers();
  }, [layoutState]);

  useEffect(() => {
    if (isFirstRender) return;
    if (deferredLines !== lines) {
      calcLineNumbers();
    }

    const handleResize = () => calcLineNumbers();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [deferredLines]);

  useEffect(() => {
    if (isFirstRender) return;
    setWordCount(wordCounter(html));
    setParsedSize(calcFileSize(html));
    calcLineNumbers();
  }, [html]);

  return (
    <div className="markdown-container">

      <div className="line-numbers__wrapper" style={{ height: layoutState === "column" ? topColHeight : "100%" }}>
        {appendLineNumbers()}
      </div>

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
          calcLineNumbers();
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
          style={{ height: layoutState === "column" ? "50%" : "100%", width: layoutState === "column" ? "100%" : "50%" }}
        >

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



      <div className="footer">
        <div className="footer__col1">
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


        <div className="footer__col2">
          <div className="footer-upload-download">
            <Tooltip
              content="download as .txt"
              position="top"
            >
              <Button
                btnclass="btn-svgpair--sm"
                title={
                  <RiFolderDownloadFill className="download-icon__footer"
                  />
                }
                onClick={() => { html.length === 0 ? alert("no markdown to save") : saveFile({ html: html }); }}
              />
            </Tooltip>

            <Tooltip
              content="upload .txt file"
              position="top-left"
            >
              <Button
                btnclass="btn-svgpair--sm"
                title={
                  <RiFileUploadLine className="upload-icon__footer"
                  />
                }
                onClick={() => { uploadFile({ setHtml: setHtml }); }}
              />
            </Tooltip>
          </div>

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
              <AiFillGithub className="git-link" />
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}