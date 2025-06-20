import React, {useEffect, useRef, useState, useContext } from 'react';
import { usePopup } from '../../Contexts/PopupContext';
import {useNavigate} from 'react-router-dom';
import '../../css/profile.css';
import {AuthContext} from "../../Contexts/AuthContext";

export default function Profile() {
    const { showPopup } = usePopup();
    const [User, setUser] = useState({});
    const [UserAskedQuestion, setUserAskedQuestion] = useState([]);
    const [Reputation, setReputation] = useState(0);
    const [UserAnswers, setUserAnswers] = useState([]);
    const [Upvotes, setUpvotes] = useState(0);

    const {setUserToken} = useContext(AuthContext)

    const fetchUserData = async () => {
        try {
            if (!localStorage.getItem('userId')) {
                return showPopup('Login or Sign up to view your profile', () => {}, { showOk: true, showCancel: false });
            }
            const response = await fetch(`http://localhost:1000/user/getUser?userId=${localStorage.getItem('userId')}`);
            if (response.status !== 200) {
                showPopup('Server error', () => {}, { showOk: true, showCancel: false });
            }
            const data = await response.json();
            setUser(data.user);
            const sortedUserAskedQuestionData = [...data.questions].sort((a, b) => a.title.length - b.title.length);
            setUserAskedQuestion(sortedUserAskedQuestionData);
            const sortedUserAnswersData = [...data.answers].sort((a, b) => a.answer.length - b.answer.length);
            setUserAnswers(sortedUserAnswersData);
            reputationCalculator(data.answers, data.questions);
        } catch (err) {
            console.log(err);
            showPopup('Server error', () => {}, { showOk: true, showCancel: false });
        }
    };

    const reputationCalculator = (ansArr, quesArr) => {
        let upVotes = 0, downVotes = 0;
        let noOfQuestions = quesArr.length;
        let noOfAnswers = ansArr.length;
        [...ansArr, ...quesArr].forEach(stat => {
            upVotes += stat.upvotes.length;
            downVotes += stat.downvotes.length;
        });
        setUpvotes(upVotes);
        setReputation((4 * upVotes) - (downVotes) + (2 * noOfAnswers) + (0.5 * noOfQuestions));
    };

    const deleteQuestion = (questionId) => {
        showPopup(`Are you sure you want to delete this question?`, async () => {
            try {
                const response = await fetch('http://localhost:1000/question/deleteQuestion', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ quesId: questionId }),
                });
                if (response.status === 200) fetchUserData();
                else showPopup('Server error occurred', () => {}, { showOk: true, showCancel: false });
            } catch (err) {
                showPopup('Error occurred', () => {}, { showOk: true, showCancel: false });
            }
        }, { showOk: true, showCancel: true });
    };

    const deleteAnswer = (answerId) => {
        showPopup(`Are you sure you want to delete this answer?`, async () => {
            try {
                const response = await fetch('http://localhost:1000/answer/deleteAnswer', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answerId, userId: localStorage.getItem('userId') }),
                });
                if (response.status === 200) fetchUserData();
                else showPopup('Server error occurred', () => {}, { showOk: true, showCancel: false });
            } catch (err) {
                showPopup('Error occurred', () => {}, { showOk: true, showCancel: false });
            }
        }, { showOk: true, showCancel: true });
    };

    const getTitle = (score) => {
        if (score <= 10) return 'Tiny Doubter 🍼';
        if (score <= 50) return 'Question Kid 🤔';
        if (score <= 100) return 'Mini Helper 🧸';
        if (score <= 250) return 'Smart Cookie 🍪';
        if (score <= 500) return 'Clue Finder 🔍';
        if (score <= 1000) return 'Brainy Buddy 🧠';
        if (score <= 2000) return 'Doubt Buster 💥';
        if (score <= 5000) return '🏆 Answer Champ';
        if (score <= 10000) return '🦸 Question Hero';
        return '🧙 Wonder Wizard';
    };

    const logout = () => {
        setUserToken('')
        showPopup('Logged out successfully', () => {}, { showOk: true, showCancel: false });
        navigate('/login');
    }

    const effectRan = useRef(false);
    const navigate = useNavigate()
    useEffect(() => {
        if (!effectRan.current) {
            fetchUserData();
            effectRan.current = true;
        }
        return () => {
            effectRan.current = true;
        };
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src="https://images.icon-icons.com/3065/PNG/512/profile_user_account_icon_190938.png" alt="User Profile" />
                <div className="profile-info">
                    <h3>@{User.username}</h3>
                    <p>{User.email}</p>
                    <p>Level: {getTitle(Reputation)}</p>
                </div>

                {/* Logout button UI */}
                <button className="logout-button" title="Logout" style={{"display": localStorage.getItem('userId') ? 'block' : 'none' }} onClick={logout}>
                    Logout
                </button>
            </div>


            <div className="profile-stats">
                <h2>Statistics</h2>
                <div className="stats-grid">
                    <div className="stat-box"><h2>Doubts</h2><h1>{UserAskedQuestion.length}</h1></div>
                    <div className="stat-box"><h2>Answers</h2><h1>{UserAnswers.length}</h1></div>
                    <div className="stat-box"><h2>Upvotes</h2><h1>{Upvotes}</h1></div>
                    <div className="stat-box"><h2>Reputation</h2><h1>{Reputation}</h1></div>
                </div>
            </div>

            <div className="profile-section">
                <h2>Questions Posted</h2>
                <div className="list-container">
                    {UserAskedQuestion.length === 0 ? <p>No question posted</p> : UserAskedQuestion.map(ques => (
                        <div className="list-item" key={ques._id}>
                            <h3>{ques.title}</h3>
                            <div className="item-actions">
                                <button onClick={() => deleteQuestion(ques._id)}><img src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png" alt="Delete" /></button>
                                <button><img src="https://img.icons8.com/ios-glyphs/30/000000/edit.png" alt="Edit" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="profile-section">
                <h2>Answers Given</h2>
                <div className="list-container">
                    {UserAnswers.length === 0 ? <p>No answer given</p> : UserAnswers.map(ans => (
                        <div className="list-item" key={ans._id}>
                            <h3>{ans.answer}</h3>
                            <div className="item-actions">
                                <button onClick={() => deleteAnswer(ans._id)}><img src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png" alt="Delete" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
