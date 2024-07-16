import React, { useState } from 'react';
import './index.css';
import JobTitleInput from './components/JobTitleInput';
import ChatDisplay from './components/ChatDisplay';
import UserResponseInput from './components/UserResponseInput';
import SubmitButton from './components/SubmitButton';
import axios from 'axios';

function InterviewApp() {
  const [jobTitle, setJobTitle] = useState('');
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async () => {
    if (!conversation.length) {
      setConversation([{ speaker: 'Interviewer', text: 'Tell me about yourself.' }]);
    } else {
      try {
        const response = await axios.post('http://localhost:3001/api/interview', { jobTitle, message: userInput });
        setConversation([...conversation, { speaker: 'User', text: userInput }, { speaker: 'Interviewer', text: response.data.question }]);
        setUserInput('');
      } catch (error) {
        console.error('Error submitting the response:', error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mock Interview Application</h1>
        <JobTitleInput value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        <ChatDisplay conversation={conversation} />
        <UserResponseInput value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <SubmitButton onClick={handleSubmit} />
      </header>
    </div>
  );
}

export default InterviewApp;