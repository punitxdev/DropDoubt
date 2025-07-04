import React from 'react';
import '../../css/answerDisplayCard.css';
import {
    FaClock, FaThumbsUp, FaThumbsDown, FaReply,
    FaEdit, FaTrashAlt, FaFlag, FaCheckCircle
} from 'react-icons/fa';
import { usePopup } from "../../Contexts/PopupContext";

export default function AnswerDisplayCard(props) {
    const { showPopup } = usePopup();
    const isOwner = props.quesAuthorId === localStorage.getItem("userId");

    const handleDelete = async () => {
        showPopup('Are you sure you want to delete this answer?', async () => {
            try {
                const res = await fetch('http://localhost:1000/answer/deleteAnswer', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answerId: props.answerId, userId: props.userId })
                });
                if (res.status === 200) {
                    props.fetchAnswersFunction();
                    showPopup('Deleted successfully', () => {}, { showOk: true, showCancel: false });
                } else {
                    showPopup('Server error', () => {}, { showOk: true, showCancel: false });
                }
            } catch (err) {
                showPopup('Network error', () => {}, { showOk: true, showCancel: false });
            }
        }, { showOk: true, showCancel: true });
    };

    const likeAnswer = async () => {
        const res = await fetch('http://localhost:1000/answer/likeAnswer', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answerId: props.answerId, userId: localStorage.getItem("userId") })
        });
        if (res.status === 200) return props.fetchAnswersFunction();
        else return showPopup('Already liked or error', () => {}, { showOk: true, showCancel: false });
    };

    const dislikeAnswer = async () => {
        const res = await fetch('http://localhost:1000/answer/dislikeAnswer', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answerId: props.answerId, userId: localStorage.getItem("userId") })
        });
        if (res.status === 200) return props.fetchAnswersFunction();
        else return showPopup('Already disliked or error', () => {}, { showOk: true, showCancel: false });
    };

    const setAsBestAnswer = async (answerId) => {
        if (localStorage.getItem("userId") !== props.quesAuthorId) {
            return showPopup("You can't mark this answer as best answer", () => {}, { showOk: true, showCancel: false });
        }

        const res = await fetch('http://localhost:1000/answer/setAsBestAnswer', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answerId: answerId }),
        });

        if (res.status === 200) {
            props.fetchAnswersFunction();
            return showPopup('Answer marked as best answer successfully', () => {}, { showOk: true, showCancel: false });
        } else if (res.status === 401) {
            return showPopup('You already marked this answer as best answer', () => {}, { showOk: true, showCancel: false });
        } else {
            return showPopup('Server error occurred', () => {}, { showOk: true, showCancel: false });
        }
    };

    return (
        <div className="answer-card-modern" id={`answer-${props.answerId}`}>
            <div className="answer-card-header">
                <div className="left-header">
                    <img
                        src={`http://localhost:1000${props.profileImage}`}
                        alt="profile"
                        className="avatar"
                        onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png"; }}
                    />
                    <span className="username">
            {props.username}
                        {props.isVerified && (
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                                alt="Verified"
                                className="verified-badge"
                                title="Verified User"
                            />
                        )}
                        {props.isAccepted && (
                            <span className="best-answer-badge">
                <FaCheckCircle /> Best Answer
              </span>
                        )}
          </span>
                </div>
                <div className="timestamp">
                    <FaClock className="clock-icon" /> {props.createdAt}
                </div>
            </div>

            <div className="answer-card-body">
                <div className="answer-text-box">
                    <p className="answer-content">{props.answer}</p>
                </div>
            </div>

            <div className="answer-card-footer">
                <div className="vote-buttons">
                    <button className="icon-btn" onClick={likeAnswer}><FaThumbsUp /> {props.upvotes.length}</button>
                    <button className="icon-btn" onClick={dislikeAnswer}><FaThumbsDown /> {props.downvotes.length}</button>
                </div>

                <div className="action-buttons">
                    {isOwner && (
                        <>
                            <button className="icon-btn"><FaEdit /></button>
                            <button className="icon-btn" onClick={handleDelete}><FaTrashAlt /></button>
                        </>
                    )}
                    <button className="icon-btn"><FaReply /></button>
                    <button className="icon-btn"><FaFlag /></button>

                    {isOwner && !props.isAccepted && (
                        <button className="icon-btn best-answer-btn" onClick={() => setAsBestAnswer(props.answerId)}>
                            ✅ Mark as Best Answer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
