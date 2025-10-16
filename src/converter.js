import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: false,
  pedantic: false,
  smartLists: true,
});

function converter(input) {
  return marked.parse(input.content || '');
}

export default converter;
