import React, { useState } from 'react';
import '../../css/postEditor.css';
import { usePopup } from '../../Contexts/PopupContext';

export default function PostEditor() {
  const { showPopup } = usePopup();
  const [QuesTxt, setQuesTxt] = useState('');
  const [BodyTxt, setBodyTxt] = useState('');

  const cleanUp = () => {
    setQuesTxt('');
    setBodyTxt('');
  };

  const postQuestion = async () => {
    try {
      if (QuesTxt.length === 0 || BodyTxt.length === 0) {
        return showPopup('Question and description are required', () => { }, { showOk: true, showCancel: false });
      }
      if (!localStorage.getItem("userId")) {
        return showPopup('Login or Sign up for posting the question', () => { }, { showOk: true, showCancel: false });
      }

      const body = {
        title: QuesTxt,
        body: BodyTxt,
        author: localStorage.getItem("userId")
      };

      const response = await fetch('http://localhost:1000/question/postQuestion', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (response.status === 200) {
        cleanUp();
        return showPopup('Question posted successfully', () => { }, { showOk: true, showCancel: false });
      } else {
        return showPopup('Server error occurred', () => { }, { showOk: true, showCancel: false });
      }
    } catch (err) {
      showPopup('Frontend error occurred', () => { }, { showOk: true, showCancel: false });
    }
  };

  return (
      <div className="post-container">
        <h1 className="post-heading">Post a Doubt</h1>
        <div className="post-editor-wrapper">
          <div className="post-input-section">
            <h2>Input Fields</h2>
            <input type="text" placeholder="Enter your question" value={QuesTxt} onChange={e => setQuesTxt(e.target.value)} style={{"margin-bottom": "20px"}}/>
            <textarea placeholder="Enter your description" value={BodyTxt} onChange={e => setBodyTxt(e.target.value)}></textarea>
            <div className="btn-group">
              <button className="form-btn" onClick={cleanUp}>Clear All</button>
              <button className="form-btn" onClick={postQuestion}>Post Question</button>
            </div>
          </div>

          <div className="post-preview-section">
            <h2>Live Preview</h2>
            <div className="preview-box scrollable">
              <h3>{QuesTxt || 'Your question will appear here'}</h3>
              <p>{BodyTxt || 'Your question body/description will appear here'}</p>
            </div>
          </div>
        </div>
      </div>
  );
}
