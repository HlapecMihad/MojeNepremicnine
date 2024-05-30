import React from 'react';

const CallToAction = ({ link, text }) => {
    return (
        <div className="cta-container">
            <p className="cta-text">{text}</p>
            <a href={link} target="_blank" rel="noopener noreferrer">
                <button className="btn-search m-2">POJDI</button>
            </a>
        </div>
    );
}

export default CallToAction;