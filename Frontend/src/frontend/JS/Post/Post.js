import { React, useState, useEffect, useRef } from 'react';
import '../../css/post.css';
import QuesPreview from './QuesPreview';
import { NavLink } from 'react-router-dom';
import Loader from './../Loader.js';
import { usePopup } from "../../Contexts/PopupContext";

export default function Post() {
    const [SearchTxt, setSearchTxt] = useState('');
    const [Loading, setLoading] = useState(true);
    const [QuesData, setQuesData] = useState([]);
    const [SortingMethod, setSortingMethod] = useState('newest');
    const [SearchOption, setSearchOption] = useState('title');

    const { showPopup } = usePopup();

    const searchQues = (searchTxt) => {
        console.log(searchTxt)
        setSearchTxt(searchTxt)
        let QuesData = []
        if(SearchOption === 'title'){
            QuesData.forEach(ques => {
                if(ques.title.toLowerCase().includes(searchTxt.toLowerCase())){
                    ques.display = true;
                    QuesData.push(ques);
                }
                else{
                    ques.display = false;
                    QuesData.push(ques);
                }
            })
        }

        else if(SearchOption === 'body'){
            QuesData.forEach(ques => {
                if(ques.body.toLowerCase().includes(SearchTxt.toLowerCase())){
                    ques.display = true;
                    QuesData.push(ques);
                }
                else{
                    ques.display = false;
                    QuesData.push(ques);
                }
            })
        }
        else if(SearchOption === 'author'){
            QuesData.forEach(ques => {
                if(ques.author.username.toLowerCase().includes(SearchTxt.toLowerCase())){
                    ques.display = true;
                    QuesData.push(ques);
                }
                else{
                    ques.display = false
                    QuesData.push(ques);
                }
            })
        }
        else {
            QuesData.forEach(ques => {
                ques.display = true;
                QuesData.push(ques);
            })
            setQuesData(QuesData);

        }
    }

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:1000/question/getQuestion');
            const data = await response.json();

            if (data === null) {
                setLoading(false);
                return setQuesData([]);
            }
            setLoading(false);
            setQuesData(data);
            console.log(data)
            return handleSorting(SortingMethod);
        } catch (err) {
            setLoading(false);
            alert('Server error');
        }
    };

    const handleSorting = (method) => {
        setSortingMethod(method);

        if (QuesData.length === 0) return;

        if (method === 'newest') {
            setQuesData(QuesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else if (method === 'oldest') {
            setQuesData(QuesData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
        } else if (method === 'upvotes') {
            setQuesData(QuesData.sort((a, b) => b.upvotes.length - a.upvotes.length));
        } else {
            return showPopup('Server error', () => { }, { showOk: true, showCancel: false });
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
            <div className="search-bar-wrapper">
                <div className="search-bar-classic">
                    <select className="search-dropdown" value={SearchOption} onChange={e => setSearchOption(e.target.value
                    )}>
                        <option value="title">🔤 Title</option>
                        <option value="body">📄 Body</option>
                        <option value="author">👤 Author</option>
                    </select>

                    <input
                        type="text"
                        className="search-field"
                        placeholder="Search questions, topics or users..."
                        value={SearchTxt}
                        onChange={(e) => {searchQues(e.target.value)}}
                    />

                    <button className="search-classic-btn" onClick={searchQues}>🔍</button>
                </div>

                <NavLink to="/postEditor" className="classic-ask-btn">+ Ask Question</NavLink>
            </div>


            {/* Result Count and Sort */}
            <div className="results-bar">
                <p className="results-count">Total results: {QuesData.length}</p>

                <div className="sort-ui-container">
                    <label htmlFor="sortQuestions" className="sort-ui-label">Sort by:</label>
                    <select id="sortQuestions" className="sort-ui-dropdown" onChange={e => handleSorting(e.target.value)} value={SortingMethod}>
                        <option value="newest">🕒 Newest First</option>
                        <option value="oldest">📜 Oldest First</option>
                        <option value="upvotes">👍 Most Upvoted</option>
                    </select>
                </div>
            </div>

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
                            display={true}
                            isVerified={user.author.isVerified}

                        />
                    ))
                ) : (
                    <p>No data</p>
                )}
            </div>
        </div>
    );
}
