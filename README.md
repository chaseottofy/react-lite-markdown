# markdown lite

What separates this from many other react markdown editors is the avoidance of dangerouslySetInnerHTML and the ability to resize the editor/preview panels.
All input is parsed through custom logic and rendered as react elements.

I do not have much react experience at this point (1 week) and I have not explored the majority of the react api/standard library. This is purely an attempt to get my feet wet, disregard any bad practices.

Features:

- avoids dangerouslySetInnerHTML
- editor and preview
- horizontal and vertical layouts
- horizontal and vertical resizing
- word and character counter
- save to json file
- upload from json file
- copy to clipboard

## Nine total commands

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
```
