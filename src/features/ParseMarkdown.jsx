// simple version of markdown
// #              header
// *text*         bold
// (text)         blue
// [text](link)   link
// ```            code block
export default function ParseMarkdown({ markdown }) {
  // ref.current = markdown;
  const lines = markdown.split("\n");
  const parsedLines = lines.map((line, i) => {

    // CODE BLOCK (not fully implemented...) 
    if (line === "```") {
      return <pre key={i} className="command-codeblock"></pre>;
    }

    // HEADER
    if (line.startsWith("#")) {
      return <h1 key={i} className="header">{line.slice(1)}</h1>;
    }

    // BOLD
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

    // LINK
    if (line.includes("[")) {
      const linkStart = line.indexOf("[");
      const linkEnd = line.indexOf("]");
      const linkText = line.slice(linkStart + 1, linkEnd);
      const beforeLink = line.slice(0, linkStart);
      const afterLink = line.slice(linkEnd + 1);
      return (
        <p key={i}>
          {beforeLink}
          <a href={afterLink}>{linkText}</a>
        </p>
      );
    }

    // BLUE TEXT
    if (line.includes("(")) {
      const blueStart = line.indexOf("(");
      const blueEnd = line.indexOf(")");
      const blueText = line.slice(blueStart + 1, blueEnd);
      const beforeBlue = line.slice(0, blueStart);
      const afterBlue = line.slice(blueEnd + 1);
      return (
        <p key={i}>
          <span className={blueEnd === -1 ? "temp-blue" : null}>{beforeBlue}</span>
          <span className="command-blue">{blueText}</span>
          <span className={blueEnd === -1 ? "temp-blue" : null}>{afterBlue}</span>
        </p>
      );
    }

    // line break <br />
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