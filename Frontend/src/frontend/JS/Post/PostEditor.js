import React from 'react'
import '../../css/postEditor.css'
import {useState} from 'react'

export default function PostEditor() {
  const [QuesTxt, setQuesTxt] = useState('');
  const [BodyTxt, setBodyTxt] = useState();

  const cleanUp = ()=>{
    setQuesTxt('')
    setBodyTxt('')
  }

  const postQuestion = async ()=>{
    try{

      if (QuesTxt.length === 0 || BodyTxt.length === 0){
        return alert('Input field are empty')
      }

      if(localStorage.getItem("userId") === null){
        return alert('Login or SignUp to post question..')
      }

      console.log(localStorage.getItem("userId"));
      

      let body = {
        title: QuesTxt,
        body: BodyTxt,
        author:localStorage.getItem("userId")
      }

      console.log(body);
      

      const response = await fetch('http://localhost:1000/question/postQuestion', {
        method: 'POST',
        mode: 'cors',
        headers:{
          'Content-Type':'application/json',
            },
          body: JSON.stringify(body)
        });

      const data = await response

      if (data.status === 200){
        setBodyTxt('')
        setQuesTxt('')
        return alert('Question posted successfully')
      }else{
        return alert("Error Occured")
      }

    }catch(err){
      console.log(err);
      
      alert("can't post question due to internal error")
    }
  }
  return (
    <div id='postMainContainer'>
      <h1>Text editor</h1>
        <div id='postInfoContainer'>

            <div id='postInputContainer'>
              <h1>Input Fields</h1>
              <input type="text" placeholder='Enter your question' value={QuesTxt} onChange={e => {setQuesTxt(e.target.value)}}/>
              <input type="text" placeholder='Enter your body' value={BodyTxt} onChange={e => {setBodyTxt(e.target.value)}}/>

              <button className='formBtn' onClick={cleanUp}>Clear All</button>
              <button className='formBtn' onClick={postQuestion}>Post question</button>
            </div>
            <div id="postPreviewContainer">
              <h1 style={{"text-align" : "center"}}>Preview</h1>
              <h2>{QuesTxt}</h2>
              <p>{BodyTxt}</p>
            </div>
        </div>
    </div>

  )
}
