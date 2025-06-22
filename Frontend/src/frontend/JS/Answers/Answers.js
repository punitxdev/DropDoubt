import {React, useState, useEffect, useRef} from 'react';
import '../../css/answers.css';
import {useLocation} from 'react-router-dom';
import AnswerDisplayCard from './AnswerDisplayCard';
import {usePopup} from "../../Contexts/PopupContext";

export default function Answers () {
  const {showPopup} = usePopup();

  const [AnswersArr, setAnswersArr] = useState([]);
  const [UserAnswer, setUserAnswer] = useState('');
  const [SortingMethod, setSortingMethod] = useState('newest')
  const location = useLocation();
  const {question, questionBody, questionId, author, isVerified} = location.state || {};

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
      console.log(answersData)
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
      return showPopup('Question upvoted successfully', () => {}, {showOk: true, showCancel: false});
    }
    else if (response.status === 401) {
      return showPopup('You already liked it', () => {}, {showOk: true, showCancel: false});
    } else {
      return showPopup('Server error occurred', () => {}, {showOk: true, showCancel: false});
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

  const handleSorting = (method) => {
    console.log(method)
    setSortingMethod(method)
    if(AnswersArr.length === 0){
      return
    }
    if (method === 'newest'){
      setAnswersArr(AnswersArr.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)))
    } else if (method === 'oldest') {
      setAnswersArr(AnswersArr.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)))
    }else if (method === 'upvotes') {
      setAnswersArr(AnswersArr.sort((a,b) => b.upvotes.length - a.upvotes.length))
    } else if (method === 'downvotes') {
      setAnswersArr(AnswersArr.sort((a,b) => b.downvotes.length - a.downvotes.length))
    } else if (method === 'best') {
      setAnswersArr(AnswersArr.sort((a,b) => (b.upvotes.length - b.downvotes.length) -( a.upvotes.length - a.downvotes.length)))
    } else if(method === 'shortest'){
      setAnswersArr(AnswersArr.sort((a,b) => a.answer.length - b.answer.length))
    } else if(method==='longest'){
      setAnswersArr(AnswersArr.sort((a,b) => b.answer.length - a.answer.length))
    } else {
      return showPopup('Server error', () => {}, { showOk: true, showCancel: false });
    }

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
            <span className="question-author">
                Posted by: {author}
                  {isVerified && (
                      <img
                          src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                          alt="Verified"
                          className="verified-badge"
                          title="Verified User"
                      />
                  )}
            </span>

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

        <div className="answer-sort-container">
          <label htmlFor="sortAnswers">Sort by:</label>
          <select id="sortAnswers" className="sort-dropdown" value={SortingMethod} onChange={e => handleSorting(e.target.value)}>
            <option value="newest">🕒 Newest First</option>
            <option value="oldest">📜 Oldest First</option>
            <option value="best">🎯 Best</option>
            <option value="verifiedUsers">🎯 Verified  Users</option>
            <option value="upvotes">👍 Most Upvoted</option>
            <option value="downvotes">👎 Most Downvoted</option>
            <option value="shortest">📱 Shortest</option>
            <option value="longest">🖥️ Longest</option>
          </select>
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
                      profileImage={data.author.profileImage}
                      downvotes={data.downvotes}
                      isVerified={data.author.isVerified}
                  />
              ))
          )}
        </div>
      </div>
  );
}
