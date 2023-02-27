import { useState } from 'react';
import "../styles/MarkdownEditor.css";

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
        return <pre className="code-block"></pre>;
      }

      // check for header
      if (line.startsWith("#")) {
        return <h1 className="header">{line.slice(1)}</h1>;
      }

      // check for bold
      if (line.includes("*")) {
        const boldStart = line.indexOf("*");
        const boldEnd = line.lastIndexOf("*");
        const boldText = line.slice(boldStart + 1, boldEnd);
        const beforeBold = line.slice(0, boldStart);
        const afterBold = line.slice(boldEnd + 1);
        return (
          <p>
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
        return (
          <p>
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
          <p>
            {beforeBlue}
            <span className="blue-text">{blueText}</span>
            {afterBlue}
          </p>
        );
      }

      return <p key={i}>
        {line}
      </p>;
    });

    return parsedLines;
  }

  return (
    <div className="container">
      <h1>Markdown Editor</h1>
      <div className="markdown-editor">
        <textarea
          className="markdown-input"
          placeholder='add text...'
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
        <div className="markdown-preview">
          {parseMarkdown({ markdown })}
        </div>
    </div>
  );
}