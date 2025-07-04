import { React, useState, useEffect } from 'react';
import '../../css/answers.css';
import { useLocation } from 'react-router-dom';
import AnswerDisplayCard from './AnswerDisplayCard';
import { usePopup } from "../../Contexts/PopupContext";

export default function Answers() {
  const { showPopup } = usePopup();
  const [AnswersArr, setAnswersArr] = useState([]);
  const [UserAnswer, setUserAnswer] = useState('');
  const [SortingMethod, setSortingMethod] = useState('newest');
  const [showEditor, setShowEditor] = useState(false);

  const location = useLocation();
  const hash = location.hash;
  const {
    question, questionBody, questionId,
    author, authorId, isVerified, upVotes, downVotes
  } = location.state || {};

  const fetchAnswers = async () => {
    try {
      const res = await fetch('http://localhost:1000/answer/getAnswer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId }),
      });
      if (res.status !== 200) {
        return showPopup('Server error', () => {}, { showOk: true, showCancel: false });
      }
      const data = await res.json();
      setAnswersArr(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.replace('#', ''));
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300); // delay to ensure DOM rendered
    }
  }, [AnswersArr]);

  const postAnswer = async () => {
    if (UserAnswer.trim().length < 21 || UserAnswer.trim().length > 5000) {
      return showPopup('Your answer must have at least 20 characters and max 5000 characters', () => {}, { showOk: true, showCancel: false });
    }

    if (!localStorage.getItem('userId')) {
      return showPopup('Login or Sign up to post an answer', () => {}, { showOk: true, showCancel: false });
    }

    const res = await fetch('http://localhost:1000/answer/postAnswer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answer: UserAnswer,
        question: questionId,
        author: localStorage.getItem('userId'),
      }),
    });

    if (res.status !== 200) {
      return showPopup('Server error occurred', () => {}, { showOk: true, showCancel: false });
    }

    setUserAnswer('');
    fetchAnswers();
    return showPopup('Answer posted successfully', () => {}, { showOk: true, showCancel: false });
  };

  const formatDateTime = (iso) => {
    const d = new Date(iso);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}, ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
  };

  const handleSorting = (method) => {
    setSortingMethod(method);
    if (!AnswersArr.length) return;

    const sorted = [...AnswersArr];
    switch (method) {
      case 'newest': sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      case 'oldest': sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
      case 'upvotes': sorted.sort((a, b) => b.upvotes.length - a.upvotes.length); break;
      case 'downvotes': sorted.sort((a, b) => b.downvotes.length - a.downvotes.length); break;
      case 'best':
        sorted.sort((a, b) => (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length));
        break;
      case 'verifiedUsers': sorted.sort((a, b) => b.author.isVerified - a.author.isVerified); break;
      case 'shortest': sorted.sort((a, b) => a.answer.length - b.answer.length); break;
      case 'longest': sorted.sort((a, b) => b.answer.length - a.answer.length); break;
      default: return showPopup('Invalid sort method', () => {}, { showOk: true, showCancel: false });
    }

    setAnswersArr(sorted);
  };

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
              <button className="btn vote-btn">⬆ {upVotes}</button>
              <button className="btn vote-btn">⬇ {downVotes}</button>
            </div>
          </div>
        </div>

        <div className="answer-form-container">
          <button className="btn toggle-editor-btn" onClick={() => setShowEditor(prev => !prev)}>
            {showEditor ? '✖️ Hide Editor' : '📝 Write an Answer'}
          </button>

          {showEditor && (
              <>
            <textarea
                className="answer-textarea"
                placeholder="Write your answer here..."
                value={UserAnswer}
                onChange={e => setUserAnswer(e.target.value)}
            />
                <p className="char-count">Characters: {UserAnswer.length}</p>
                <div className="answer-form-buttons">
                  <button className="btn post-btn" onClick={postAnswer}>Post Answer</button>
                  <button className="btn clear-btn" onClick={() => setUserAnswer('')}>Clear</button>
                </div>
              </>
          )}
        </div>

        <p className="total-results-text">Total results: {AnswersArr.length}</p>

        <div className="answer-sort-container">
          <label htmlFor="sortAnswers">Sort by:</label>
          <select
              id="sortAnswers"
              className="sort-dropdown"
              value={SortingMethod}
              onChange={e => handleSorting(e.target.value)}
          >
            <option value="newest">🕒 Newest First</option>
            <option value="oldest">📜 Oldest First</option>
            <option value="best">🎯 Best</option>
            <option value="verifiedUsers">🛡️ Verified Users</option>
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
                      createdAt={formatDateTime(data.createdAt)}
                      username={data.author.username}
                      userId={data.author._id}
                      answerId={data._id}
                      fetchAnswersFunction={fetchAnswers}
                      upvotes={data.upvotes}
                      downvotes={data.downvotes}
                      profileImage={data.author.profileImage}
                      isVerified={data.author.isVerified}
                      isAccepted={data.isAccepted}
                      quesAuthorId={authorId}
                      questionId={questionId}
                  />
              ))
          )}
        </div>
      </div>
  );
}
