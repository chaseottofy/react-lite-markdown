/**
 * 
 * @jest
 * @ignore - need to rewrite for react
 */

describe('parseLiteMarkdown', () => {
  it('should convert header 1', () => {
    const markdown = '# Header 1';
    const expected = '<h1>Header 1</h1>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert header 2', () => {
    const markdown = '## Header 2';
    const expected = '<h2>Header 2</h2>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert header 3', () => {
    const markdown = '### Header 3';
    const expected = '<h3>Header 3</h3>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert bold text', () => {
    const markdown = '*bold*';
    const expected = '<strong>bold</strong>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert blue text', () => {
    const markdown = '(blue)';
    const expected = '<span style="color: blue;">blue</span>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert horizontal line', () => {
    const markdown = '___';
    const expected = '<hr>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert italic text', () => {
    const markdown = '_italic_';
    const expected = '<em>italic</em>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert link', () => {
    const markdown = '[link](http://example.com)';
    const expected = '<a href="http://example.com">link</a>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert image', () => {
    const markdown = '![image](http://example.com/image.jpg)';
    const expected = '<img src="http://example.com/image.jpg" alt="image">';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert code block', () => {
    const markdown = '```\nconst a = 1;\nconst b = 2;\nconsole.log(a + b);\n```';
    const expected = '<pre><code>const a = 1;\nconst b = 2;\nconsole.log(a + b);\n</code></pre>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert blockquote', () => {
    const markdown = '> quote';
    const expected = '<blockquote>quote</blockquote>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert unordered list', () => {
    const markdown = `- item 1\n- item 2\n- item 3`;
    const expected = '<ul><li>item 1</li><li>item 2</li><li>item 3</li></ul>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });

  it('should convert ordered list', () => {
    const markdown = '1. item 1\n2. item 2\n3. item 3';
    const expected = '<ol><li>item 1</li><li>item 2</li><li>item 3</li></ol>';
    expect(parseLiteMarkdown(markdown)).toEqual(expected);
  });
});