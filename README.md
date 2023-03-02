# markdown lite

What separates this from many other react markdown editors is the avoidance of dangerouslySetInnerHTML and the ability to resize the editor/preview panels.

All input is parsed through custom logic and rendered as react elements.

Features:

- Lighthouse: 100, 100, 100, 100
- avoids dangerouslySetInnerHTML
- editor and preview
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
