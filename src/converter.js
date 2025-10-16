import { marked, Renderer } from 'marked';

/**
 * Custom renderer for Medium-compatible HTML output
 * Medium has known issues with complex HTML structures, nested lists,
 * and formatting. This renderer produces clean, simplified HTML that
 * pastes correctly into Medium's editor.
 */
class MediumRenderer extends Renderer {
  /**
   * Headings - Add proper spacing and clean structure
   */
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    return `<h${depth}>${text}</h${depth}>\n`;
  }

  /**
   * Paragraphs - Ensure proper spacing for Medium
   */
  paragraph({ tokens }) {
    const text = this.parser.parseInline(tokens);
    return `<p>${text}</p>\n`;
  }

  /**
   * Blockquotes - Clean formatting for Medium
   */
  blockquote({ tokens }) {
    const text = this.parser.parse(tokens);
    return `<blockquote>\n${text}</blockquote>\n`;
  }

  /**
   * Lists - Simplified structure for better Medium compatibility
   * Medium has issues with complex nested lists, so we keep them simple
   */
  list({ ordered, start, items }) {
    const type = ordered ? 'ol' : 'ul';
    const startAttr = ordered && start !== 1 ? ` start="${start}"` : '';
    let body = '';

    for (let i = 0; i < items.length; i++) {
      body += this.listitem(items[i]);
    }

    return `<${type}${startAttr}>\n${body}</${type}>\n`;
  }

  /**
   * List items - Clean structure without unnecessary nesting
   */
  listitem({ tokens, task, checked }) {
    let text = this.parser.parse(tokens, false);

    // Handle task lists if present
    if (task) {
      const checkbox = checked ? '☑' : '☐';
      text = `${checkbox} ${text}`;
    }

    // Clean up extra paragraph tags that can cause issues in Medium
    text = text.trim();
    if (text.startsWith('<p>') && text.endsWith('</p>\n')) {
      text = text.slice(3, -5);
    } else if (text.startsWith('<p>') && text.endsWith('</p>')) {
      text = text.slice(3, -4);
    }

    return `<li>${text}</li>\n`;
  }

  /**
   * Code blocks - Preserve formatting and indentation
   * Medium can lose code formatting, so we use <pre><code>
   */
  code({ text, lang }) {
    const langAttr = lang ? ` class="language-${lang}"` : '';
    // Escape HTML entities to prevent interpretation
    const escapedText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    return `<pre><code${langAttr}>${escapedText}</code></pre>\n`;
  }

  /**
   * Inline code - Simple formatting for Medium
   */
  codespan({ text }) {
    return `<code>${text}</code>`;
  }

  /**
   * Links - Clean anchor tags
   */
  link({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttr}>${text}</a>`;
  }

  /**
   * Images - Simple img tags for Medium
   */
  image({ href, title, text }) {
    const titleAttr = title ? ` title="${title}"` : '';
    const altAttr = text ? ` alt="${text}"` : '';
    return `<img src="${href}"${altAttr}${titleAttr} />`;
  }

  /**
   * Strong/Bold text
   */
  strong({ tokens }) {
    const text = this.parser.parseInline(tokens);
    return `<strong>${text}</strong>`;
  }

  /**
   * Emphasis/Italic text
   */
  em({ tokens }) {
    const text = this.parser.parseInline(tokens);
    return `<em>${text}</em>`;
  }

  /**
   * Horizontal rules
   */
  hr() {
    return '<hr />\n';
  }

  /**
   * Line breaks - Handle breaks properly for Medium
   */
  br() {
    return '<br />\n';
  }

  /**
   * Tables - Medium has limited table support, but we format them cleanly
   */
  table({ header, rows }) {
    let body = '';

    // Header
    if (header && header.length > 0) {
      let headerRow = '<tr>\n';
      for (let i = 0; i < header.length; i++) {
        headerRow += `<th>${this.parser.parseInline(header[i].tokens)}</th>\n`;
      }
      headerRow += '</tr>\n';
      body += `<thead>\n${headerRow}</thead>\n`;
    }

    // Body rows
    if (rows && rows.length > 0) {
      let bodyRows = '';
      for (let i = 0; i < rows.length; i++) {
        let row = '<tr>\n';
        for (let j = 0; j < rows[i].length; j++) {
          row += `<td>${this.parser.parseInline(rows[i][j].tokens)}</td>\n`;
        }
        row += '</tr>\n';
        bodyRows += row;
      }
      body += `<tbody>\n${bodyRows}</tbody>\n`;
    }

    return `<table>\n${body}</table>\n`;
  }

  /**
   * Strikethrough text (if GFM is enabled)
   */
  del({ tokens }) {
    const text = this.parser.parseInline(tokens);
    return `<del>${text}</del>`;
  }
}

// Create renderer instance
const renderer = new MediumRenderer();

// Configure marked with optimal settings for Medium
marked.use({
  renderer,
  gfm: true,           // GitHub Flavored Markdown
  breaks: false,       // Don't convert \n to <br> - Medium handles paragraphs better
  pedantic: false,     // Don't be overly strict
  smartLists: true,    // Use smarter list behavior
  smartypants: false,  // Don't use smart typography (Medium handles this)
  xhtml: true          // Use XHTML-style self-closing tags
});

/**
 * Main converter function
 * Converts markdown content to Medium-compatible HTML
 */
function converter(input) {
  const content = input.content || '';

  if (!content.trim()) {
    return '';
  }

  try {
    // Parse markdown to HTML
    let html = marked.parse(content);

    // Post-processing: Clean up any extra whitespace that might cause issues
    html = html.trim();

    return html;
  } catch (error) {
    console.error('Markdown conversion error:', error);
    return '<p>Error converting markdown. Please check your syntax.</p>';
  }
}

export default converter;
