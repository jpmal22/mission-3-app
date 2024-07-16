import './style.css';
import React from 'react';


function UserResponseInput({ value, onChange }) {
    return (
        <div className="response-input">
            <label htmlFor="user-response" className="visually-hidden">Your Response</label>
            <textarea
                id="user-response"
                value={value}
                onChange={onChange}
                placeholder="Your response"
                rows="4" 
            ></textarea>
        </div>
    );
}

export default UserResponseInput;
