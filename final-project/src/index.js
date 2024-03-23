import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QuestionProvider } from './contexts/QuestionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </BrowserRouter>
);

