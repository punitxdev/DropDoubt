import {React, useState, useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'



export default function Answers() {
  const [Answers, setAnswers] = useState([]);
  const location = useLocation();
  const { question, questionBody, questionId, author} = location.state || {};

  const fetchAnswers = async ()=>{
    try{
        console.log('start');
        
        let response = await fetch('http://localhost:1000/answer/getAnswer', {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({questionId: questionId})
            
        })
        console.log('wait');
        
        let data = await response
        let answersData = await data.json()
        console.log(answersData);
        
        setAnswers([])
        
    }catch(err){
        console.log(err);
        
        // alert('Server error')
    }

  }
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      console.log('Effect ran');
      fetchAnswers()
      effectRan.current = true;
    }

    return () => {
      effectRan.current = true;
    };
  });
  return (
    <div>
        <h1>{question}</h1>
        <p>{questionBody}</p>
        <p>{questionId}</p>
        <p>{author}</p>
        {Answers.length === 0 ? (<p>No data to show</p>) : (Answers.map(data => {
            return (
                <p>{data}</p>
            )
        }))}
    </div>
  )
}
