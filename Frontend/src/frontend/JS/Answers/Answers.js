import {React, useState, useEffect, useRef} from 'react';
import '../../css/answers.css';
import {useLocation} from 'react-router-dom';
import AnswerDisplayCard from './AnswerDisplayCard';

export default function Answers () {
  const [AnswersArr, setAnswersArr] = useState ([]);
  const [UserAnswer, setUserAnswer] = useState ('');
  const location = useLocation ();
  const {question, questionBody, questionId, author} = location.state || {};

  const fetchAnswers = async () => {
    try {
      // console.log ('start');

      let response = await fetch ('http://localhost:1000/answer/getAnswer', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({questionId: questionId}),
      });
      // console.log ('wait');

      let data = await response;
      let answersData = await data.json ();

      setAnswersArr (answersData);
    } catch (err) {
      console.log (err);

      // alert('Server error')
    }
  };
  const effectRan = useRef (false);

  const postAnswer = async () => {
    if (UserAnswer.trim ().length < 21 || UserAnswer.trim().length > 5000) {
      return alert ('Your answer must have atleast 20 characters and max 5000 characters');
    }

    if (localStorage.getItem ('userId') === null) {
      return alert ('Login or Sign up for posting the answer');
    }

    let answerData = {
      answer: UserAnswer,
      question: questionId,
      author: localStorage.getItem ('userId'),
    };

    const APIcall = await fetch ('http://localhost:1000/answer/postAnswer', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (answerData),
    });

    let response = await APIcall;

    if (response.status !== 200) {
      return alert ('Server error');
    }

    setUserAnswer ('');
    fetchAnswers ();

    return alert ('Answer post successfully...');
  };

  function formatDateTimeHumanReadable (isoString) {
    const date = new Date (isoString);

    // Extract UTC components
    const year = date.getUTCFullYear ();
    const month = String (date.getUTCMonth () + 1).padStart (2, '0');
    const day = String (date.getUTCDate ()).padStart (2, '0');
    const hours = String (date.getUTCHours ()).padStart (2, '0');
    const minutes = String (date.getUTCMinutes ()).padStart (2, '0');
    const seconds = String (date.getUTCSeconds ()).padStart (2, '0');

    // Return as "YYYY-MM-DD HH:MM:SS" (24-hour format)
    return `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`;
  }
  useEffect (() => {
    if (effectRan.current === false) {
      fetchAnswers ();
      effectRan.current = true;
    }

    return () => {
      effectRan.current = true;
    };
  });
  return (
    <div>
      <h1 className="questionTitle">{question}</h1>
      <p className="questionBody">{questionBody}</p>
      <p className="questionAuthor">Posted by: {author}</p>

      <div id="txtAreaContainer">
        <textarea
          cols="60"
          rows="10"
          placeholder="Enter your answer here..."
          onChange={e => {
            setUserAnswer (e.target.value);
          }}
          value={UserAnswer}
        />

        <p>Total characters: {UserAnswer.length}</p>

        <div>
          <button onClick={postAnswer} className="formBtn round">
            Post Answer
          </button>
          <button
            className="formBtn round"
            onClick={() => {
              setUserAnswer ('');
            }}
          >
            Clear all
          </button>
        </div>
      </div>

      {AnswersArr.length === 0
        ? <p>Post first answer to this question...</p>
        : AnswersArr.map (data => {
            return (
              <AnswerDisplayCard
                answer={data.answer}
                createdAt={formatDateTimeHumanReadable (data.createdAt)}
                username={data.author.username}
                userId={data.author._id}
                answerId={data._id}
                fetchAnswersFunction = {fetchAnswers}
                upvotes={data.upvotes}
                downvotes={data.downvotes}
              />
            );
          })}
    </div>
  );
}
