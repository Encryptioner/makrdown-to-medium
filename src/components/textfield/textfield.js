import React, { useRef, useCallback } from 'react';
import './textfield.css';
import { useDispatch } from 'react-redux';
import { setContent } from '../../state.js';
import { trackEvent, sanitizeError, analyzeComplexity } from 'services/analytics';
import converter from '../../converter.js';

/** Debounce delay for conversion_completed (ms) */
const CONVERSION_DEBOUNCE_MS = 2000;

const TextField = () => {
  const dispatch = useDispatch();
  const debounceTimer = useRef(null);

  const fireConversionEvents = useCallback((markdown) => {
    try {
      const html = converter({ content: markdown });

      trackEvent({
        name: 'conversion_completed',
        params: {
          markdown_length: markdown.length,
          html_length: html.length,
        },
      });

      const complexity = analyzeComplexity(markdown);
      trackEvent({ name: 'content_complexity', params: complexity });
    } catch (err) {
      trackEvent({
        name: 'conversion_failed',
        params: { error: sanitizeError(err instanceof Error ? err.message : String(err)) },
      });
    }
  }, []);

  const handleChange = useCallback((e) => {
    const markdown = e.target.value;
    dispatch(setContent(markdown));

    // Detect clear (user deleted all content)
    if (markdown === '') {
      if (debounceTimer.current !== null) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = null;
      }
      trackEvent({ name: 'editor_cleared' });
      return;
    }

    // Debounce conversion_completed + content_complexity
    if (debounceTimer.current !== null) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      debounceTimer.current = null;
      fireConversionEvents(markdown);
    }, CONVERSION_DEBOUNCE_MS);
  }, [dispatch, fireConversionEvents]);

  const handlePaste = useCallback((e) => {
    const pasted = e.clipboardData?.getData('text') ?? '';
    if (pasted.length > 0) {
      trackEvent({ name: 'markdown_pasted', params: { paste_length: pasted.length } });
    }
  }, []);

  return (
    <textarea
      className="textfield"
      onChange={handleChange}
      onPaste={handlePaste}
      placeholder="Enter your markdown here..."
    />
  );
};

export default TextField;
