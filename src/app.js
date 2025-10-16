import React from 'react';
import HalfPage from './components/halfpage/halfpage.js';
import TextField from './components/textfield/textfield.js';
import Medium from './components/medium/medium.js';
import AppBar from './components/appbar/appbar.js';
import './app.css';

const App = () => {
  return (
    <div className="container">
      <AppBar />
      <div className="main">
        <HalfPage header="Markdown" background="#efffff">
          <TextField />
        </HalfPage>
        <HalfPage header="Medium" subheader="(paste into Medium editor)">
          <Medium />
        </HalfPage>
      </div>
    </div>
  );
};

export default App;
