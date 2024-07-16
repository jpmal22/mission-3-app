import './style.css';

import React, { useEffect, useRef } from 'react';

function ChatDisplay({ conversation }) {
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        // Scrolls to the bottom every time the conversation updates
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation]);

    return (
        <div className="chat-display">
            {conversation.map((entry, index) => (
                <p key={index} className={entry.speaker === 'AI' ? 'ai-message' : 'user-message'}>
                    {entry.speaker}: {entry.text}
                </p>
            ))}
            
            <div ref={endOfMessagesRef} />
        </div>
    );
}

export default ChatDisplay;
