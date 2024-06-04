import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function InterviewApp() {
  const [jobTitle, setJobTitle] = useState("");
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [questionCount, setQuestionCount] = useState(0); // Added to track the number of questions asked

  const handleJobTitleChange = (e) => setJobTitle(e.target.value);
  const handleUserInputChange = (e) => setUserInput(e.target.value);

  const handleUserInputSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/interview", {
        jobTitle,
        userInput,
        chat,
        questionCount,
      });
      setChat([...chat, { user: userInput }, { ai: response.data.content }]);
      setUserInput("");
      setQuestionCount(response.data.questionCount);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Mock Interview Application</h1>

        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          placeholder="E.g., Junior Developer"
          value={jobTitle}
          onChange={handleJobTitleChange}
        />

        <div className="chat">
          {chat.map((message, index) => (
            <div key={index}>
              {message.user && <div>User: {message.user}</div>}
              {message.ai && <div>AI: {message.ai}</div>}
            </div>
          ))}
        </div>

        <textarea
          placeholder="Type your response here..."
          value={userInput}
          onChange={handleUserInputChange}
        />

        <button type="button" onClick={handleUserInputSubmit}>
          Submit
        </button>
      </header>
    </div>
  );
}

export default InterviewApp;
