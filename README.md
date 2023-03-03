# markdown lite

What separates this from many other react markdown editors is the avoidance of dangerouslySetInnerHTML and the ability to resize the editor/preview panels. It also incorporates a dynamic numbered line system (similar to notepad++), along with three contrast-safe themes, local storage, and a file upload/download system.

Note that this is not traditional markdown. I've kept things limited to purely what I find useful/use most of the time.

Markdown expressions are rendered/represented as react elements. Aside from avoiding potential security risks, delivering content through an actual react element raises performance significantly. Using setDangerousHtml & then performing HTML sanitation goes against every core principle of react's reconciliation process.

Features:

- Lighthouse: 100, 100, 100, 100
- avoids dangerouslySetInnerHTML
- editor and preview
- custom dynamic line counter
- horizontal and vertical layouts
- horizontal and vertical resizing
- three themes (dark/neutral/light)
- local storage
- word and character counter
- save to json file
- upload from json file
- copy to clipboard

## Ten total commands

```javascript
#                H1
##               H2
###              H3
*text*           bold
[link](url)      link
{url}            image
<code></code>    codeblock
>                blockquote
- unordered      list
___              linebreak
```
