import { useState, useRef, useEffect } from 'react';

function HighlightedTextarea() {
  const [highlightedLine, setHighlightedLine] = useState(0);
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    function updateHighlightedLine() {
      const cursorPosition = textarea.selectionStart;
      const lineNumber = textarea.value.substr(0, cursorPosition).split('\n').length - 1;
      setHighlightedLine(lineNumber);
    }

    textarea.addEventListener('input', updateHighlightedLine);
    textarea.addEventListener('scroll', updateHighlightedLine);
    textarea.addEventListener('focus', updateHighlightedLine);

    return () => {
      textarea.removeEventListener('input', updateHighlightedLine);
      textarea.removeEventListener('scroll', updateHighlightedLine);
      textarea.removeEventListener('focus', updateHighlightedLine);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <textarea
        ref={textareaRef}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />
      <pre style={{ whiteSpace: 'pre-wrap', padding: '4px 0' }}>
        {textareaRef.current?.value?.split('\n').map((line, i) => (
          <div
            key={i}
            style={{
              backgroundColor: i === highlightedLine ? '#ffffcc' : 'transparent',
              borderRadius: '2px',
              padding: '2px 4px',
            }}
          >
            {line}
          </div>
        ))}
      </pre>
    </div>
  );
}


