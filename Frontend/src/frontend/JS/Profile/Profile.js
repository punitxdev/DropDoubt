import React, { useEffect, useRef, useState, useContext } from 'react';
import { usePopup } from '../../Contexts/PopupContext';
import { useNavigate } from 'react-router-dom';
import '../../css/profile.css';
import { AuthContext } from "../../Contexts/AuthContext";

export default function Profile() {
    const { showPopup } = usePopup();
    const [User, setUser] = useState({});
    const [UserAskedQuestion, setUserAskedQuestion] = useState([]);
    const [Reputation, setReputation] = useState(0);
    const [UserAnswers, setUserAnswers] = useState([]);
    const [Upvotes, setUpvotes] = useState(0);
    const [showBioEditor, setShowBioEditor] = useState(false);
    const [bioText, setBioText] = useState('');
    const [UserProfilePic, setUserProfilePic] = useState(null)

    const { setUserToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const effectRan = useRef(false);

    const fetchUserData = async () => {
        try {
            if (!localStorage.getItem('userId')) {
                return showPopup('Login or Sign up to view your profile', () => {}, { showOk: true, showCancel: false });
            }
            const response = await fetch(`http://localhost:1000/user/getUser?userId=${localStorage.getItem('userId')}`);
            const data = await response.json();
            setUser(data.user);
            setBioText(data.user.bio || '');
            const sortedQ = [...data.questions].sort((a, b) => a.title.length - b.title.length);
            const sortedA = [...data.answers].sort((a, b) => a.answer.length - b.answer.length);
            setUserAskedQuestion(sortedQ);
            setUserAnswers(sortedA);
            console.log(data)
            reputationCalculator(data.answers, data.questions);
        } catch (err) {
            showPopup('Server error', () => {}, { showOk: true, showCancel: false });
        }
    };

    const reputationCalculator = (ansArr, quesArr) => {
        let up = 0, down = 0;
        [...ansArr, ...quesArr].forEach(stat => {
            up += stat.upvotes.length;
            down += stat.downvotes.length;
        });
        setUpvotes(up);
        setReputation((4 * up) - (down) + (2 * ansArr.length) + (0.5 * quesArr.length));
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
        setUserToken('');
        showPopup('Logged out successfully', () => {}, { showOk: true, showCancel: false });
        navigate('/login');
    };

    const changeBio = async () => {
        if (bioText.length === 0) return showPopup('Please enter a bio', () => {}, { showOk: true, showCancel: false });
        try{
            const APIcall = await fetch('http://localhost:1000/user/updateBio', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: localStorage.getItem('userId'), bio: bioText })
            })
            if (APIcall.status === 200) {
                setShowBioEditor(false);
                fetchUserData();
            } else {
                showPopup('Server error', () => {}, { showOk: true, showCancel: false });
            }
        }catch(err){
            showPopup('Network error', () => {}, { showOk: true, showCancel: false });
        }

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            if(file.size > 5*1024*1024){
                e.target.value = null;
                return showPopup('File size should be less than 5MB', () => {}, { showOk: true, showCancel: false });
            }
        }
        setUserProfilePic(file);
    }

    const uploadProfilePic = async () => {
        try{
            if(!UserProfilePic){
                return showPopup('Please select a file', () => {}, { showOk: true, showCancel: false });
            }
            const fData = new FormData()
            fData.append('profilePic', UserProfilePic)
            fData.append('userId', localStorage.getItem('userId'))
            console.log("this is after making form data")
            const APIcall = await fetch('http://localhost:1000/user/uploadProfilePic', {
                method: 'PUT',
                body: fData
            })
            console.log("this is after making api call")
            if (APIcall.status === 200) {
                fetchUserData();
                return showPopup('Profile picture updated successfully', () => {}, { showOk: true, showCancel: false });
            }
            else{
                showPopup('Server error', () => {}, { showOk: true, showCancel: false });
            }
        }catch(err){
            showPopup('Network error', () => {}, { showOk: true, showCancel: false });
        }
    }

    const deleteQuestion = async (quesId) => {
        try{
            const APIcall = await fetch('http://localhost:1000/question/deleteQuestion', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: localStorage.getItem('userId'), quesId: quesId })
            })
            if (APIcall.status === 200) {
                fetchUserData();
                return showPopup('Question deleted successfully', () => {}, { showOk: true, showCancel: false });
            }
            else{
                showPopup('Server error', () => {}, { showOk: true, showCancel: false });
            }
        }
        catch(err){
            showPopup('Network error', () => {}, { showOk: true, showCancel: false });
        }
    }

    const deleteAnswer = async (ansId) => {
        try{
            const APIcall = await fetch('http://localhost:1000/answer/deleteAnswer', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: localStorage.getItem('userId'), answerId: ansId })
            })
            if (APIcall.status === 200) {
                fetchUserData();
                return showPopup('Answer deleted successfully', () => {}, { showOk: true, showCancel: false });
            }
            else{
                showPopup('Server error', () => {}, { showOk: true, showCancel: false });
            }
        }
        catch(err){
            showPopup('Network error', () => {}, { showOk: true, showCancel: false });
        }
    }

    // const effectRan = useRef(false);

    useEffect(() => {
        if (!effectRan.current) {
            fetchUserData();
            effectRan.current = true;
        }
        return () => { effectRan.current = true; };
    });

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img
                        src={`http://localhost:1000${User.profileImage}`}
                        alt="User Profile"
                        className="profile-image"
                    />
                    <label htmlFor="profileUpload" className="edit-image-btn" title="Change Photo">
                        <img src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png" alt="Edit" />
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="profileUpload"
                        className="upload-input"
                        onChange={e => {handleFileChange(e)}}
                    />
                    {UserProfilePic && (
                        <p style={{ marginTop: "8px", color: "#555", fontSize: "13px" }}>
                            Selected: {UserProfilePic.name}
                        </p>
                    )}
                </div>

                {UserProfilePic && (
                    <button className="upload-btn" onClick={uploadProfilePic}>Upload</button>
                )}

                <div className="profile-info">
                    <h3 className="username-row">
                        <span className="username-text">@{User.username}</span>
                        {User.isVerified && (
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                                alt="Verified"
                                className="verified-badge"
                                title="Verified"
                                style={{ width: '20px', height: '20px', marginLeft: '6px', border:"none" }}
                            />
                        )}
                    </h3>
                    <p>{User.email}</p>
                    <p>Level: {getTitle(Reputation)}</p>
                </div>
                <button className="logout-button" onClick={logout}>Logout</button>
            </div>

            {/* === BIO SECTION === */}
            <div className="bio-section">
                <h2>Bio</h2>
                {!showBioEditor ? (
                    <div className="bio-display-row">
                        <p className="bio-text">{bioText || "No bio added yet."}</p>
                        <button className="edit-bio-btn" onClick={() => setShowBioEditor(true)}>Edit Bio</button>
                    </div>
                ) : (
                    <div className="bio-editor">
                    <textarea
                        className="bio-textarea"
                        rows="4"
                        value={bioText}
                        placeholder="Write something about yourself..."
                        onChange={(e) => setBioText(e.target.value)}
                    />
                        <div className="bio-buttons">
                            <button className="save-bio-btn" onClick={changeBio}>Save</button>
                            <button className="cancel-bio-btn" onClick={() => setShowBioEditor(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            {/* === STATS SECTION === */}
            <div className="profile-stats">
                <h2>Statistics</h2>
                <div className="stats-grid">
                    <div className="stat-box"><h2>Doubts</h2><h1>{UserAskedQuestion.length}</h1></div>
                    <div className="stat-box"><h2>Answers</h2><h1>{UserAnswers.length}</h1></div>
                    <div className="stat-box"><h2>Upvotes</h2><h1>{Upvotes}</h1></div>
                    <div className="stat-box"><h2>Reputation</h2><h1>{Reputation}</h1></div>
                </div>
            </div>

            {/* === QUESTIONS === */}
            <div className="profile-section">
                <h2>Questions Posted</h2>
                <div className="list-container">
                    {UserAskedQuestion.length === 0 ? <p>No question posted</p> :
                        UserAskedQuestion.map(ques => (
                            <div className="list-item" key={ques._id}>
                                <h3>{ques.title}</h3>
                                <div className="item-actions">
                                    <button><img src="https://img.icons8.com/ios-glyphs/30/delete-sign.png" alt="Delete" onClick={() => {deleteQuestion(ques._id)}}/></button>
                                    <button><img src="https://img.icons8.com/ios-glyphs/30/edit.png" alt="Edit" /></button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* === ANSWERS === */}
            <div className="profile-section">
                <h2>Answers Given</h2>
                <div className="list-container">
                    {UserAnswers.length === 0 ? <p>No answer given</p> :
                        UserAnswers.map(ans => (
                            <div className="list-item" key={ans._id}>
                                <h3>{(ans.answer).slice(0,100)}...</h3>
                                <div className="item-actions">
                                    <button><img src="https://img.icons8.com/ios-glyphs/30/delete-sign.png" alt="Delete" onClick={() => {deleteAnswer(ans._id)}}/></button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
