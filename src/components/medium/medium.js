import React, { useState } from 'react';
import './medium.css';
import { useSelector } from 'react-redux';
import converter from '../../converter.js';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Medium = () => {
  const content = useSelector(state => state.content);
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const htmlContent = converter({ content });

  const handleCopy = async () => {
    try {
      const mediumElement = document.getElementById('medium');
      const html = mediumElement.innerHTML;

      // Copy as both HTML and plain text
      const blob = new Blob([html], { type: 'text/html' });
      const data = [new ClipboardItem({
        'text/html': blob,
        'text/plain': new Blob([html], { type: 'text/plain' })
      })];

      await navigator.clipboard.write(data);
      setCopied(true);
      setSnackbarOpen(true);

      // Track copy event in Google Analytics
      if (window.trackCopyToClipboard) {
        window.trackCopyToClipboard(html.length);
      }

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard. Please try selecting and copying manually.');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="medium-container">
      <div className="medium-copy-button-wrapper">
        <Button
          variant="contained"
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          onClick={handleCopy}
          color={copied ? 'success' : 'primary'}
          sx={{ mb: 2 }}
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
      </div>
      <div
        id="medium"
        className="medium"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          HTML copied to clipboard! Ready to paste into Medium.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Medium;
