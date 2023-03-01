/**
 * markdownparse
 * @param {string} text 
 * @description original implementation.. removing when done
 */
function markdownparse(text) {
  const header1Regex = /^# (.+)/;
  const header2Regex = /^## (.+)/;
  const header3Regex = /^### (.+)/;
  const boldRegex = /\*([^\*]+)\*/g;
  const blueRegex = /\(([^\)]+)\)/g;
  const hrRegex = /^___$/;
  const italicRegex = /_([^_]+)_/g;
  const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  const imageRegex = /\{([^\}]+)\}/g
  const codeRegex = /^`{3}\n([\s\S]+)\n`{3}$/;
  const blockquoteRegex = /^> (.+)/;
  const unorderedListRegex = /^- (.+)/;
  const orderedListRegex = /^(\d+)\. (.+)/;
  let lines = text.split("\n");
  let html = "";

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (hrRegex.test(line)) {
      html += '<hr>';
    } else if (italicRegex.test(line)) {
      html += line.replace(italicRegex, '<em>$1</em>');
    } else if (linkRegex.test(line)) {
      html += line.replace(linkRegex, '<a href="$2">$1</a>');
    } else if (imageRegex.test(line)) {
      html += line.replace(imageRegex, '<img src="$1" alt="$1">');
    } else if (codeRegex.test(line)) {
      html += `<pre><code>${line.match(codeRegex)[1]}</code></pre>`;
    } else if (blockquoteRegex.test(line)) {
      html += `<blockquote>${line.match(blockquoteRegex)[1]}</blockquote>`;
    } else if (unorderedListRegex.test(line)) {
      html += '<ul>';
      while (unorderedListRegex.test(line)) {
        html += `<li>${line.match(unorderedListRegex)[1]}</li>`;
        line = lines[++i];
      }
      html += '</ul>';
      i--;
    } else if (orderedListRegex.test(line)) {
      html += '<ol>';
      while (orderedListRegex.test(line)) {
        html += `<li>${line.match(orderedListRegex)[2]}</li>`;
        line = lines[++i];
      }
      html += '</ol>';
      i--;
    } else {
      html += line + '<br>';
    }
  }
  return html;
}