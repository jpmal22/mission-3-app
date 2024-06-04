import React, { useState } from "react";
import axios from "axios";
import styles from "./InterviewApp.module.css";
import BounceLoader from "react-spinners/BounceLoader"; 

function InterviewApp() {
  const [jobTitle, setJobTitle] = useState("");
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0); // Added to track the number of questions asked

  const handleJobTitleChange = (e) => setJobTitle(e.target.value);
  const handleUserInputChange = (e) => setUserInput(e.target.value);

  const handleUserInputSubmit = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Interview Skills Practice</h1>

        <div className={styles.inputBoxContainer}>
          <label className={styles.label} htmlFor="jobTitle">
            Job Title:
          </label>
          <input
            className={styles.inputBox}
            type="text"
            id="jobTitle"
            name="jobTitle"
            placeholder="E.g., Junior Developer"
            value={jobTitle}
            onChange={handleJobTitleChange}
          />
        </div>

        <div className={styles.chat}>
          {chat.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.user ? styles.userMessage : styles.aiMessage
              }`}
            >
              {message.user && (
                <>
                  <div className={`${styles.bubble} ${styles.userBubble}`}>
                    {message.user}
                  </div>
                  <img
                    src="/user-img.jpg"
                    alt="User Avatar"
                    className={styles.avatar}
                  />
                </>
              )}
              {message.ai && (
                <>
                  <img
                    src="/AI-profile-img.jpg"
                    alt="AI Avatar"
                    className={styles.avatar}
                  />
                  <div className={`${styles.bubble} ${styles.aiBubble}`}>
                    {message.ai}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className={styles.inputContainer}>
          {loading && (
            <div className={styles.loaderContainer}>
              <BounceLoader color="#61dafb" />
            </div>
          )}
          <textarea
            className={styles.textArea}
            placeholder="Type your response here..."
            value={userInput}
            onChange={handleUserInputChange}
          />
          <button
            className={styles.submitButton}
            type="button"
            onClick={handleUserInputSubmit}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </header>
    </div>
  );
}

export default InterviewApp;
