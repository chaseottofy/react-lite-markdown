import { useState } from 'react';
import "../../styles/MarkdownEditor.css";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("");

  function parseMarkdown({ markdown }) {
    // simple version of markdown
    // #              header
    // *text*         bold
    // (text)         blue
    // [text](link)   link
    // ```            code block
    const lines = markdown.split("\n");
    const parsedLines = lines.map((line, i) => {

      // check for code block
      if (line === "```") {
        return <pre key={i} className="command-codeblock"></pre>;
      }

      // check for header
      if (line.startsWith("#")) {
        return <h1 key={i} className="header">{line.slice(1)}</h1>;
      }

      // check for bold
      if (line.includes("*")) {
        const boldStart = line.indexOf("*");
        const boldEnd = line.lastIndexOf("*");
        const boldText = line.slice(boldStart + 1, boldEnd);
        const beforeBold = line.slice(0, boldStart);
        const afterBold = line.slice(boldEnd + 1);
        return (
          <p key={i}>
            {beforeBold}
            <b>{boldText}</b>
            {afterBold}
          </p>
        );
      }

      // check for link
      if (line.includes("[")) {
        const linkStart = line.indexOf("[");
        const linkEnd = line.indexOf("]");
        const linkText = line.slice(linkStart + 1, linkEnd);
        const beforeLink = line.slice(0, linkStart);
        const afterLink = line.slice(linkEnd + 1);
        console.log(afterLink);
        return (
          <p key={i}>
            {beforeLink}
            <a href={afterLink}>{linkText}</a>
          </p>
        );
      }

      // check for blue text
      if (line.includes("(")) {
        const blueStart = line.indexOf("(");
        const blueEnd = line.indexOf(")");
        const blueText = line.slice(blueStart + 1, blueEnd);
        const beforeBlue = line.slice(0, blueStart);
        const afterBlue = line.slice(blueEnd + 1);
        return (
          <p key={i}>
            {/* {beforeBlue} */}
            <span className={blueEnd === -1 ? "temp-blue" : null}>{beforeBlue}</span>
            <span className="command-blue">{blueText}</span>
            <span className={blueEnd === -1 ? "temp-blue" : null}>{afterBlue}</span>
            {/* {afterBlue} */}
          </p>
        );
      }

      // empty line should be a <br />
      if (line === "") {
        return <br key={i} />;
      }

      // default
      return <p key={i}>
        {line}
      </p>;
    });

    return parsedLines;
  }

  return (
    <div className="markdown-container">
      <div className="markdown-editor">
        <textarea
          className="markdown-input"
          placeholder='add text...'
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
      <p className="preview-title">output: </p>
      <div className="markdown-preview">
        {parseMarkdown({ markdown })}
      </div>
      <div className="markdown-file">
        <button className="btn-primary save-markdown">save</button>
        <button className="btn-dark upload-markdown">upload</button>
      </div>
    </div>
  );
}