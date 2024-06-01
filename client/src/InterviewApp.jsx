import React from 'react';
import './style.css';  

function InterviewApp() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Mock Interview Application</h1>
        
        <label htmlFor="jobTitle">Job Title:</label>
        <input type="text" id="jobTitle" name="jobTitle" placeholder="E.g., Junior Developer" />
        
        <button type="button">Submit</button>
      </header>
    </div>
  );
}

export default InterviewApp;
