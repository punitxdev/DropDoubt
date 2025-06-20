import React, { useState, useEffect } from 'react';
import '../../css/QuesPreview.css';
import { NavLink } from 'react-router-dom';

export default function QuesPreview(props) {
    const [Question, setQuestion] = useState('');
    const [QuestionBody, setQuestionBody] = useState('');

    useEffect(() => {
        let quesTxt = props.question;
        let words = quesTxt.split(' ');

        if (words.length < 20) {
            setQuestion(props.question);
        } else {
            let trimQuestion = words.slice(0, 20).join(' ');
            setQuestion(trimQuestion + '...');
        }

        let quesBodyTxt = props.questionBody;
        let bodyWords = quesBodyTxt.split(' ');

        if (bodyWords.length < 40) {
            setQuestionBody(props.questionBody);
        } else {
            let trimQuestionBody = bodyWords.slice(0, 40).join(' ');
            setQuestionBody(trimQuestionBody + '...');
        }
    }, [props.question, props.questionBody]);

    return (
        <NavLink
            to="/answers"
            className="quesPreviewCard"
            state={{
                question: Question,
                questionBody: QuestionBody,
                questionId: props.questionId,
                author: props.author,
            }}
        >
            <div className="card">
                <div className="card-header">
                    <h2 className="ques-title">{Question}</h2>
                </div>
                <div className="card-body">
                    <p className="ques-body">{QuestionBody}</p>
                </div>
                <div className="card-footer">
                    <span className="author">👤 {props.author}</span>
                    <span className="upvotes">⬆️ {props.upvotes}</span>
                </div>
            </div>
        </NavLink>
    );
}
