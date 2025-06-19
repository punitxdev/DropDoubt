import React from 'react'
import '../../css/answerDisplayCard.css'
import clock from "../../pics/clock.png"
import like from "../../pics/like.png"
import dislike from "../../pics/dislike.png"
import report from "../../pics/report.png"
import deleteIcon from "../../pics/delete.png"
import reply from "../../pics/reply.png"
import edit from "../../pics/edit.png"


export default function AnswerDisplayCard(props) {
    console.log(`this is ansId ${props.answerId}`);
    console.log(`this is userId ${props.userId}`);

    const isDisplay = ()=>{
        if (props.userId === localStorage.getItem("userId")){
            return 'block'
        }
        return 'none'
    }

    const deleteAnswer = async ()=>{
        const APIcall = await fetch('http://localhost:1000/answer/deleteAnswer', {
            method: 'DELETE',
            mode:'cors',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                answerId: props.answerId,
                userId: props.userId
            })
        })

        let reponse = await APIcall
        if (reponse.status === 200){
            props.fetchAnswersFunction()
            alert('Answer deleted successfully')
        }else{
            alert('Error occured')
        }
    }

    const likeAnswer = async (likedAnswerId)=>{
        try{
            let data = {
                answerId: likedAnswerId,
                userId: localStorage.getItem("userId")
            }
            console.log(data)
            const APIcall = await fetch('http://localhost:1000/answer/likeAnswer', {
                method: 'PUT',
                mode:'cors',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(data)
            })
            let response = await APIcall
            if (response.status === 200) {
                props.fetchAnswersFunction()
                alert('Answer liked successfully')
            }
            else if (response.status === 401){
                alert('You have already liked this answer')
            }
            else{
                alert('Server error occured')
            }
        }catch (err){
            alert('Error occured')
        }
    }

    const dislikeAnswer = async (dislikedAnswerId)=>{
        try{
            let data = {
                answerId: dislikedAnswerId,
                userId: localStorage.getItem("userId")
            }
            const APIcall = await fetch('http://localhost:1000/answer/dislikeAnswer', {
                method: 'PUT',
                mode:'cors',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(data)
            })
            let response = await APIcall
            if (response.status === 200) {
                props.fetchAnswersFunction()
                alert('Answer disliked successfully')
            }
            else if (response.status === 401){
                alert('You have already disliked this answer')
            }
            else{
                alert('Server error occured')
            }
        }catch (err){
            alert('Error occured')
        }
    }
    
  return (
    <div>
        <div className='answerDisplayCard'>
            <div className='authorDisplay'>
               <div className="userProfile">
                    <img src="" alt="" className="username"/>
                    <span>{props.username}</span>
               </div>
                <div className="ansTimeStamp">
                    <img src={clock} alt="timeStamp" className='icon invert'/>
                    <span>{props.createdAt}</span>
                </div>
            </div>
            <div className='ansBodyDisplay'>
                <p>{props.answer}</p>
            </div>
            <div className='ansOptions'>
                <button className='formBtn round' onClick={() => {likeAnswer(props.answerId)}}>
                    <img src={like} alt="" className='icon invert'/>
                    <span>{(props.upvotes).length}</span>
                </button>
                <button className='formBtn round' onClick={ () => {dislikeAnswer(props.answerId)}}>
                    <img src={dislike} alt="" className='icon invert'/>
                    <span>{(props.downvotes).length}</span>
                </button>

                 <button className='formBtn round' style={{display: isDisplay()}}>
                    <img src={edit} alt="" className='icon invert'/>
                     <span>Edit</span>
                 </button>

                {<button className='formBtn round' style={{display: isDisplay()}} onClick={deleteAnswer}>
                    <img src={deleteIcon} alt="" className='icon invert'/>
                    <span>Delete</span>
                </button>}

                <button className='formBtn round'>
                    <img src={reply} alt="" className='icon invert'/>
                    <span>Reply</span>
                </button>
                <button className='formBtn round'>
                    <img src={report} alt="" className='icon invert'/>
                    <span>Report</span>
                </button>
            </div>
        </div>
    </div>
  )
}
