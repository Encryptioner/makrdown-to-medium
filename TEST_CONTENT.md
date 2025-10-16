# Test Markdown for Medium Conversion

This document contains various markdown elements to test the converter.

## Headings Test

### Heading 3
#### Heading 4
##### Heading 5

## Paragraphs and Spacing

This is a regular paragraph with some text. It should have proper spacing before and after.

This is another paragraph. There should be adequate spacing between paragraphs.

## Lists Test

### Ordered List
1. First item
2. Second item
3. Third item
4. Fourth item

### Ordered List with Nested Items
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item
4. Fourth item

### Unordered List
- First bullet
- Second bullet
- Third bullet
- Fourth bullet

### Unordered List with Nested Items
- First bullet
- Second bullet
  - Nested bullet 2.1
  - Nested bullet 2.2
- Third bullet

### Mixed List
1. Numbered item
   - Bullet under number
   - Another bullet
2. Second numbered
   - More bullets

## Code Test

### Inline Code
This is some text with `inline code` in it. Here's another `variable` reference.

### Code Block
```javascript
function example() {
  const test = "hello world";
  if (test) {
    console.log("This should preserve indentation");
  }
  return test;
}
```

### Code Block without Language
```
Plain code block
  With indentation
    And more indentation
```

## Blockquotes

> This is a blockquote. It should be formatted nicely for Medium.
> It can span multiple lines.

> Another blockquote with just one line.

## Links and Images

This is a [link to Google](https://google.com) in a sentence.

Here's an image:
![Alt text](https://via.placeholder.com/150)

## Emphasis

This has *italic text* and **bold text** and ***bold italic text***.

## Horizontal Rule

---

## Complex Nested List
1. First level item 1
   - Second level bullet 1
   - Second level bullet 2
     1. Third level number 1
     2. Third level number 2
   - Second level bullet 3
2. First level item 2
   1. Second level number 1
   2. Second level number 2
      - Third level bullet 1
      - Third level bullet 2

## Tables (if supported)

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Line Breaks

This line has two spaces at the end
And this should be on a new line

Without spaces
This should be continuous
