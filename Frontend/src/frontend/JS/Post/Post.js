import {React,useState, useEffect, useRef} from 'react';
import '../../css/post.css';
import QuesPreview from './QuesPreview';
import { NavLink } from 'react-router-dom';

export default function Post () {
  const [SearchTxt, setSearchTxt] = useState ('');
  const [QuesData, setQuesData] = useState ([]);

  const searchQues = () => {
    alert (SearchTxt);
  };

  const getData = async ()=> {
      try {
        const response = await fetch (
          'http://localhost:1000/question/getQuestion'
        );
        const data = await response.json ();
        

        if(data === null){
          return setQuesData([])
        }
        return setQuesData (data);

      } catch (err) {
        alert ('Server error');
      }
    }

    const effectRan = useRef(false)

    useEffect(() => {
      if(effectRan.current===false){
        getData()
        effectRan.current = true
      }
      return () => {
        effectRan.current = true
      };
    }, []);
  return (
    <div>
      <div id="searchBarContainer">
        <input
          type="text"
          placeholder="Ask your question"
          id="quesSearchBar"
          value={SearchTxt}
          onChange={e => {
            setSearchTxt (e.target.value);
          }}
        />
        <button className="formBtn round" onClick={searchQues}>Search</button>
        <NavLink to='/postEditor' className='formBtn round'> + Post Question </NavLink>
      </div>

      <p>Total results: {QuesData.length}</p>

      <div id="quesDisplayContainer">
        {Array.isArray(QuesData) && QuesData.length > 0 ?
        (QuesData.map (user => (
          <QuesPreview
            question={user.title}
            questionBody={user.body}
            questionId={user._id}
            likes={user.upvotes.length}
            author={user.author.username}
            answers={user.acceptedAnswers.length}
          />
        ))) : (<p>No data</p>)}
      </div>
    </div>
  );
}
