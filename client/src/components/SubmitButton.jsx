import './style.css';
import React from 'react';

function SubmitButton({ onClick, isSubmitting }) {
    return (
        <button
            className="submit-button"
            onClick={onClick}
            disabled={isSubmitting}
            aria-label="Submit your response"
        >
            {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
    );
}

export default SubmitButton;
