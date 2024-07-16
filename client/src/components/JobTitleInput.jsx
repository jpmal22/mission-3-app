import './style.css';
import React from 'react';

function JobTitleInput({ value, onChange }) {
    return (
        <div className="job-title-input">
            <label htmlFor="job-title" className="visually-hidden">Job Title:</label>
            <input
                type="text"
                id="job-title"
                value={value}
                onChange={onChange}
                placeholder="Eg.. Junior Developer"
            />
        </div>
    );
}

export default JobTitleInput;
