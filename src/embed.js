import React from 'react';
import ReactDOM from 'react-dom/client';
import FeedbackWidget from './components/FeedbackWidget.jsx';

// FirmaId aus URL holen (?firmaId=xyz)
const params = new URLSearchParams(window.location.search);
const firmaId = params.get('firmaId');

const rootEl = document.getElementById('widget-root');
const root = ReactDOM.createRoot(rootEl);

// Widget anzeigen
root.render(
  React.createElement(FeedbackWidget, { firmaId })
);
