import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function InterviewApp() {
  const [jobTitle, setJobTitle] = useState("");
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleJobTitleChange = (e) => setJobTitle(e.target.value);
  const handleUserInputChange = (e) => setUserInput(e.target.value);

 //handleUserInput is called when the user submits their input. 
 //It sends a POST request to the /api/interview endpoint with the jobTitle, userInput, and chat history in the request body.
 //If successful, it adds the user input to the chat history and the AI response from the server.
  const handleUserInputSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/interview", {
        jobTitle,
        userInput,
        chat,
      });
      setChat([...chat, { user: userInput }, { ai: response.data.content }]);
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //The UI of the app
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
