import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 
import InterviewApp from './InterviewApp';

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
  <React.StrictMode>
    <InterviewApp />
  </React.StrictMode>
);


