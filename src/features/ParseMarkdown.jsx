/**
 * #              HEADER
 * *text*         BOLD
 * (text)         BLUE
 * [text](link)   LINK
 * ```            CODE BLOCK
 * @param {string} markdown
 * @description parse markdown to html
 * @listens {textarea} onChange
 * @returns 
 1.) 
 "#recieve \n(markdown)\n*in*\n[string](format.com)" ->
 * -->
 2.)
 ['#recieve ', '(markdown)', '*in*', '[string](format.com)']
 * -->
 * 3.)
    <h1 class="header">recieve </h1>
    <p class="command-blue">markdown</p>
    <p><b>in</b></p>
    <p><a href="(format.com)">string</a></p>
 */
export default function ParseMarkdown({ markdown }) {
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