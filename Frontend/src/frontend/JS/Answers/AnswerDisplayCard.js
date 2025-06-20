import React from 'react';
import '../../css/answerDisplayCard.css';
import {
    FaClock, FaThumbsUp, FaThumbsDown, FaReply,
    FaEdit, FaTrashAlt, FaFlag
} from 'react-icons/fa';
import { usePopup } from "../../Contexts/PopupContext";

export default function AnswerDisplayCard(props) {
    const { showPopup } = usePopup();
    const isOwner = props.userId === localStorage.getItem("userId");

    const handleDelete = async () => {
        showPopup('Are you sure you want to delete this answer?', async () => {
            try {
                const res = await fetch('http://localhost:1000/answer/deleteAnswer', {
                    method: 'DELETE',
                    mode: 'cors',
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
        if (res.status === 200) props.fetchAnswersFunction();
        else alert('Already liked or error');
    };

    const dislikeAnswer = async () => {
        const res = await fetch('http://localhost:1000/answer/dislikeAnswer', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answerId: props.answerId, userId: localStorage.getItem("userId") })
        });
        if (res.status === 200) props.fetchAnswersFunction();
        else alert('Already disliked or error');
    };

    return (
        <div className="answer-card">
            {/* Top Bar with Profile Pic, Username and Timestamp */}
            <div className="answer-header">
                <div className="user-info-top">
                    <img
                        src={props.userProfilePic || "/default-avatar.png"}
                        alt={`${props.username}'s avatar`}
                        className="profile-pic"
                        onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png"; }}
                    />
                    <span className="username">{props.username}</span>
                </div>

                <span className="timestamp">
          <FaClock className="small-icon" /> {props.createdAt}
        </span>
            </div>

            {/* Answer Text */}
            <div className="answer-text">
                <p>{props.answer}</p>
            </div>

            {/* Bottom Section */}
            <div className="answer-footer">
                {/* Vote Buttons */}
                <div className="votes">
                    <button className="icon-btn" onClick={likeAnswer}>
                        <FaThumbsUp className="small-icon" /> {props.upvotes.length}
                    </button>
                    <button className="icon-btn" onClick={dislikeAnswer}>
                        <FaThumbsDown className="small-icon" /> {props.downvotes.length}
                    </button>
                </div>

                {/* Mini Action Widgets */}
                <div className="widgets">
                    {isOwner && (
                        <>
                            <button className="icon-btn mini"><FaEdit /></button>
                            <button className="icon-btn mini" onClick={handleDelete}><FaTrashAlt /></button>
                        </>
                    )}
                    <button className="icon-btn mini"><FaReply /></button>
                    <button className="icon-btn mini"><FaFlag /></button>
                </div>
            </div>
        </div>
    );
}
