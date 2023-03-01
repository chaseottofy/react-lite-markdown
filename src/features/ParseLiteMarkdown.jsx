/**
  #, ##, ###          H1, H2, H3
  *text*              bold
  [link](url)         link
  {url}               image
  <code></code>       codeblock
  >                   blockquote
  - unordered         list
  ___                 linebreak


 * ParseLiteMarkdown
 * @param {string} html
 * @returns {JSX.Element}
 * @listens e.target - textarea - ./components/ui/MarkdownRenderer
 * @description only supports h1, h2, h3, bold, link, image, codeblock, blockquote, unordered list.
 */
export default function ParseLiteMarkdown({ html }) {
  let lines = html.split('\n');
  const pattern = {
    header1: {
      regex: /^# (.+)/,
      class: "header1",
    },
    header2: {
      regex: /^## (.+)/,
      class: "header2",
    },
    header3: {
      regex: /^### (.+)/,
      class: "header3",
    },
    bold: {
      regex: /\*([^\*]+)\*/g,
      class: "bold",
    },
    hr: {
      regex: /^___$/,
      class: "hr",
    },
    link: {
      regex: /\[([^\]]+)\]\(([^\)]+)\)/g,
      class: "link",
    },
    image: {
      regex: /\{([^\}]+)\}/g,
      class: "image",
    },
    code: {
      regex: /<code>([\s\S]+)<\/code>/g,
      class: "code",
    },
    blockquote: {
      regex: /^> (.+)/,
      class: "blockquote",
    },
    unorderedList: {
      regex: /^- (.+)/,
      class: "unordered-list",
    },
  };

  const parsedLines = lines.map((line, i) => {

    /* HEADER 1 : # text */
    if (pattern.header1.regex.test(line)) {
      return (
        <h1 key={i} className={pattern.header1.class}>
          {line.match(pattern.header1.regex)[1]}
        </h1>
      );
    }

    /* HEADER 2 : ## text */
    if (pattern.header2.regex.test(line)) {
      return (
        <h2 key={i} className={pattern.header2.class}>
          {line.match(pattern.header2.regex)[1]}
        </h2>
      );
    }

    /* HEADER 3 : ### text */
    if (pattern.header3.regex.test(line)) {
      return (
        <h3 key={i} className={pattern.header3.class}>
          {line.match(pattern.header3.regex)[1]}
        </h3>
      );
    }

    /* BOLD : *text* */
    if (pattern.bold.regex.test(line)) {
      let currbold = line.match(pattern.bold.regex);
      let boldarr = line.split(pattern.bold.regex);
      return (
        <div key={i}>
          {
            boldarr.map((text, idx) => {
              if (text === currbold[0].slice(1, -1)) {
                return <b key={idx} className={pattern.bold.class}>
                  {text}
                </b>;
              }
              return <span key={idx}>{text}</span>;
            })
          }
        </div>
      );
    }

    /* CODE <code>text</code> */
    // 
    if (pattern.code.regex.test(line)) {
      let currcode = line.match(pattern.code.regex);
      let codesplit = line.split(pattern.code.regex);
      return (
        <div key={i}>
          {
            codesplit.map((text, idx) => {
              // slice <code></code>
              if (text === currcode[0].slice(6, -7)) {
                return (
                  <pre key={idx} className="pre">
                    <code key={idx} className={pattern.code.class}>
                      {text}
                    </code>
                  </pre>
                );
              }
              return <span key={idx}>{text}</span>;
            })
          }
        </div>
      );
    }

    /* LINEBREAK : ___ */
    if (pattern.hr.regex.test(line)) {
      return <hr key={i} className={pattern.hr.class} />;
    }

    /* LINK [linkname](url) */
    /* Must include https:// ? */
    if (pattern.link.regex.test(line)) {
      let [text, url] = line.split("](");
      return (
        <a
          key={i}
          href={url.slice(0, -1)}
          target="_blank"
          className="link"
        >
          {text.slice(1)}
        </a>
      );
    }

    /* IMAGE {url} */
    if (pattern.image.regex.test(line)) {
      return (
        <img
          key={i}
          src={line.slice(1, -1)}
          alt={`${line}`}
          className="image"
        />
      );
    }

    /* BLOCKQUOTE : > text */
    if (pattern.blockquote.regex.test(line)) {
      return (
        <blockquote key={i} className={pattern.blockquote.class}>
          {line.match(pattern.blockquote.regex)[1]}
        </blockquote>
      );
    }

    /* UNORDERED LIST : - text */
    if (pattern.unorderedList.regex.test(line)) {
      return (
        <li key={i} className={pattern.unorderedList.class}>
          {line.match(pattern.unorderedList.regex)[1]}
        </li>
      );
    }

    /* EMPTY */
    if (line === "") {
      return <br key={i} />;
    }

    /* Default */
    return <p key={i}>{line}</p>;
  });

  return parsedLines;
};
