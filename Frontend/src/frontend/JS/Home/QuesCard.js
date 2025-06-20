import React from 'react';
import "../../css/Home_Style/QuesCard.css"; // Optional

export default function QuesCard({ questionTitle, questionBrief, like, comment, username }) {
    return (
        <div className="ques-card">
            <h3>{questionTitle}</h3>
            <p>{questionBrief}</p>
            <div className="ques-meta">
                <span>👍 {like}</span>
                <span>💬 {comment}</span>
                <span>👤 {username}</span>
            </div>
        </div>
    );
}
