import {React, useState, useEffect, useRef} from 'react';
import '../../css/answers.css';
import {useLocation} from 'react-router-dom';
import AnswerDisplayCard from './AnswerDisplayCard';
import {usePopup} from "../../Contexts/PopupContext";

export default function Answers () {
  const {showPopup} = usePopup();

  const [AnswersArr, setAnswersArr] = useState([]);
  const [UserAnswer, setUserAnswer] = useState('');
  const location = useLocation();
  const {question, questionBody, questionId, author} = location.state || {};

  const fetchAnswers = async () => {
    try {
      let response = await fetch('http://localhost:1000/answer/getAnswer', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({questionId: questionId}),
      });

      let data = await response;
      let answersData = await data.json();
      setAnswersArr(answersData);
    } catch (err) {
      console.log(err);
    }
  };

  const upvoteQuestion = async (questionId) => {
    const APIcall = await fetch('http://localhost:1000/question/upvoteQuestion', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({questionId: questionId, userId: localStorage.getItem('userId')}),
    });

    let response = await APIcall;

    if (response.status === 200) {
      fetchAnswers();
      alert('Question upvoted successfully');
    }
    else if (response.status === 401) {
      alert('You liked it already');
    } else {
      alert('Server error');
    }
  };

  const effectRan = useRef(false);

  const postAnswer = async () => {
    if (UserAnswer.trim().length < 21 || UserAnswer.trim().length > 5000) {
      return showPopup('Your answer must have at least 20 characters and max 5000 characters', () => {}, {showOk: true, showCancel: false});
    }

    if (localStorage.getItem('userId') === null) {
      return showPopup('Login or Sign up for posting the answer', () => {}, {showOk: true, showCancel: false});
    }

    let answerData = {
      answer: UserAnswer,
      question: questionId,
      author: localStorage.getItem('userId'),
    };

    const APIcall = await fetch('http://localhost:1000/answer/postAnswer', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answerData),
    });

    let response = await APIcall;

    if (response.status !== 200) {
      return showPopup('Server error occurred', () => {}, {showOk: true, showCancel: false});
    }

    setUserAnswer('');
    fetchAnswers();
    return showPopup('Answer posted successfully', () => {}, {showOk: true, showCancel: false});
  };

  function formatDateTimeHumanReadable (isoString) {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    if (effectRan.current === false) {
      fetchAnswers();
      effectRan.current = true;
    }

    return () => {
      effectRan.current = true;
    };
  });

  return (
      <div className="answers-page">
        <div className="question-card">
          <h1 className="question-title">{question}</h1>
          <p className="question-body">{questionBody}</p>
          <div className="question-meta">
            <span className="question-author">Posted by: {author}</span>
            <div className="vote-buttons">
              <button className="btn vote-btn" onClick={() => upvoteQuestion(questionId)}>⬆ Upvote</button>
              <button className="btn vote-btn">⬇ Downvote</button>
            </div>
          </div>
        </div>

        <div className="answer-form-container">
        <textarea
            className="answer-textarea"
            cols="60"
            rows="10"
            placeholder="Write your answer here..."
            onChange={e => setUserAnswer(e.target.value)}
            value={UserAnswer}
        />
          <p className="char-count">Characters: {UserAnswer.length}</p>

          <div className="answer-form-buttons">
            <button onClick={postAnswer} className="btn post-btn">Post Answer</button>
            <button onClick={() => setUserAnswer('')} className="btn clear-btn">Clear</button>
          </div>
        </div>

        <div className="answers-section">
          {AnswersArr.length === 0 ? (
              <p className="no-answers-text">No answers yet. Be the first to answer!</p>
          ) : (
              AnswersArr.map(data => (
                  <AnswerDisplayCard
                      key={data._id}
                      answer={data.answer}
                      createdAt={formatDateTimeHumanReadable(data.createdAt)}
                      username={data.author.username}
                      userId={data.author._id}
                      answerId={data._id}
                      fetchAnswersFunction={fetchAnswers}
                      upvotes={data.upvotes}
                      downvotes={data.downvotes}
                  />
              ))
          )}
        </div>
      </div>
  );
}
