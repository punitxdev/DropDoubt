import { React, useState, useEffect, useRef } from 'react';
import '../../css/post.css';
import QuesPreview from './QuesPreview';
import { NavLink } from 'react-router-dom';
import Loader from './../Loader.js';

export default function Post() {
    const [SearchTxt, setSearchTxt] = useState('');
    const [Loading, setLoading] = useState(true);
    const [QuesData, setQuesData] = useState([]);

    const searchQues = () => {
        alert(SearchTxt);
    };

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:1000/question/getQuestion');
            const data = await response.json();

            if (data === null) {
                setLoading(false);
                return setQuesData([]);
            }
            setLoading(false);
            return setQuesData(data);
        } catch (err) {
            setLoading(false);
            alert('Server error');
        }
    };

    const effectRan = useRef(false);

    useEffect(() => {
        if (!effectRan.current) {
            getData();
            effectRan.current = true;
        }
        return () => {
            effectRan.current = true;
        };
    }, []);

    return (
        <div className="post-wrapper">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Ask your question"
                    className="search-input"
                    value={SearchTxt}
                    onChange={(e) => setSearchTxt(e.target.value)}
                />
                <button className="form-btn" onClick={searchQues}>Search</button>
                <NavLink to='/postEditor' className='form-btn secondary'>+ Post Question</NavLink>
            </div>

            <p className="results-count">Total results: {QuesData.length}</p>

            <Loader isLoading={Loading} message={'Please wait'} />

            <div className="question-list">
                {Array.isArray(QuesData) && QuesData.length > 0 ? (
                    QuesData.map(user => (
                        <QuesPreview
                            key={user._id}
                            question={user.title}
                            questionBody={user.body}
                            questionId={user._id}
                            upvotes={user.upvotes.length}
                            author={user.author.username}
                        />
                    ))
                ) : (
                    <p>No data</p>
                )}
            </div>
        </div>
    );
}