import {React, useEffect, useRef, useState} from 'react';
import '../../css/profile.css'

export default function Profile () {
    const [User, setUser] = useState({})
    const [UserAskedQuestion, setUserAskedQuestion] = useState([])
    const [Reputation, setReputation] = useState(0)
    const [UserAnswers, setUserAnswers] = useState([])
    const [Upvotes, setUpvotes] = useState(0)


    const fetchUserData = async () => {
        try {
            const response = await fetch (
                `http://localhost:1000/user/getUser?userId=${localStorage.getItem('userId')}`
            );

            if(response.status !== 200){
                return alert('Server error')
            }
            const data = await response.json();
            setUser(data.user);
            console.log(data);

            const sortedUserAskedQuestionData = [...data.questions].sort((a, b) =>
                a.title.length - b.title.length
            );

            setUserAskedQuestion(sortedUserAskedQuestionData)

            const sortedUserAnswersData = [...data.answers].sort((a, b) =>
                a.answer.length - b.answer.length
            )
            setUserAnswers(sortedUserAnswersData)
            reputationCalculator(data.answers, data.questions)
        } catch (err) {
            console.log(err)
            alert ('Server error');
        }
    }

    const reputationCalculator = (ansArr, quesArr) => {
        let upVotes = 0
        let downVotes = 0
        let noOfQuestions = quesArr.length
        let noOfAnswers = ansArr.length
        let wholeArr = [...ansArr, ...quesArr]
        wholeArr.forEach(stat => {
            upVotes += stat.upvotes.length
            downVotes += stat.downvotes.length
        })
        setUpvotes(upVotes)


        setReputation((4 * upVotes) - (downVotes) + (2 * noOfAnswers) + (0.5 * noOfQuestions));
    }

    const deleteQuestion = async (questionId) => {
        const APIcall = await fetch ('http://localhost:1000/question/deleteQuestion', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify ({quesId: questionId}),
        })

        let response = await APIcall

        if (response.status === 200) {
            fetchUserData()
            alert ('Question deleted successfully')
        } else {
            alert ('Error occured')
        }
    }

    const  getTitle = (score) => {
        if (score <= 10) return "Tiny Doubter 🍼";
        if (score <= 50) return "Question Kid 🤔";
        if (score <= 100) return "Mini Helper 🧸";
        if (score <= 250) return "Smart Cookie 🍪";
        if (score <= 500) return "Clue Finder 🔍";
        if (score <= 1000) return "Brainy Buddy 🧠";
        if (score <= 2000) return "Doubt Buster 💥";
        if (score <= 5000) return "🏆 Answer Champ";
        if (score <= 10000) return "🦸 Question Hero";
        return "🧙 Wonder Wizard";
    }

    const deleteAnswer = async (answerDeletingId) => {
        const APIcall = await fetch ('http://localhost:1000/answer/deleteAnswer', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify ({answerId: answerDeletingId, userId: localStorage.getItem('userId')}),
        })
        let response = await APIcall
        if (response.status === 200) {
            fetchUserData()
            alert ('Answer deleted successfully')
        } else {
            alert ('Error occured')
        }
    }

    const effectRan = useRef(false)

    useEffect(() => {
        if(effectRan.current===false){
            fetchUserData()
            effectRan.current = true
        }
        return () => {
            effectRan.current = true
        };
    })

  return (
    <div>
        <div id="profileNameContainer">
            <img src='https://images.icon-icons.com/3065/PNG/512/profile_user_account_icon_190938.png' alt='reload page' />
            <div id="profileName">
                <h3>@{User.username}</h3>
                <p>{User.email}</p>
                <p>Level: {getTitle(Reputation)}</p>
            </div>
        </div>
        <div id="statsContainer">
            <h2>Statistics</h2>
            <div id="statsDisplay">
                <div className='displayBox'>
                    <h2>Doubts</h2>
                    <h1>{UserAskedQuestion.length}</h1>
                </div>
                <div className='displayBox'>
                    <h2>Answer Given</h2>
                    <h1>{UserAnswers.length}</h1>
                </div>
                <div className='displayBox'>
                    <h2>Upvotes</h2>
                    <h1>{Upvotes}</h1>
                </div>
                <div className='displayBox'>
                    <h2>Reputation</h2>
                    <h1>{Reputation}</h1>
                </div>
            </div>
        </div>
        <div id="profileQuesContainer">
            <h2>Questions Posted</h2>
            <div id="profileQuesDisplay">
                {UserAskedQuestion.length === 0 ? (<p>No question posted</p>) : (
                    UserAskedQuestion.map (ques => {
                        return (
                            <div className='displayQuesBox' key={ques._id}>
                                <h3>{ques.title}</h3>
                                <div className='displayQuesOptions'>
                                    <button onClick={() => {deleteQuestion(ques._id)}}>
                                        <img src='https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png' alt='reload page' />
                                    </button>
                                    <button>
                                        <img src='https://img.icons8.com/ios-glyphs/30/000000/edit.png' alt='reload page' />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
        <div id="profileAnsContainer">
            <h2>Answers Given</h2>
                <div id="profileAnsDisplay">
                {UserAnswers.length === 0 ? (<p>No answer given</p>) : (
                    UserAnswers.map (ans => {
                        return (
                            <div className='displayAnsBox'>
                                <h3>{ans.answer}</h3>
                                <div className='displayAnsOptions'>
                                    <button onClick={() => {deleteAnswer(ans._id)}}>
                                        <img src='https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png' alt='reload page' />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    </div>
  );

}