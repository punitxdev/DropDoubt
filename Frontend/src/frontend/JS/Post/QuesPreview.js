import React from 'react';
import '../../css/QuesPreview.css';
import {NavLink} from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function QuesPreview (props) {
  const [Question, setQuestion] = useState ('');
  const [QuestionBody, setQuestionBody] = useState ('');
  useEffect (
    () => {
      let quesTxt = props.question;
      let words = quesTxt.split (' ');

      if (words.length < 20) {
        setQuestion (props.question);
      } else {
        let trimQuestion = words.slice (0, 20).join (' ');
        setQuestion (trimQuestion + '...');
      }

      let quesBodyTxt = props.questionBody;
      let bodyWords = quesBodyTxt.split (' ');

      if (bodyWords < 40) {
        setQuestionBody (props.questionBody);
      } else {
        let trimQuestionBody = bodyWords.slice (0, 40).join (' ');
        setQuestionBody (trimQuestionBody + '...');
      }
    },
    [props.question, props.questionBody]
  );

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
      <div>
        <h2>{Question}</h2>
        <p>{QuestionBody}</p>
        <div className="quesPreviewInfoContainer">
          <a href="/" className="author">Author: {props.author}</a>
          <p>likes: {props.likes}</p>
        </div>
        {/* <p>Time: {props.time}</p> */}
      </div>
    </NavLink>
  );
}
