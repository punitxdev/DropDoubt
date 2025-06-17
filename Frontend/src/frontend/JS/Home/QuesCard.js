import React from 'react'
import "../../css/Home_Style/QuesCard.css"

export default function QuesCard(props) {
  return (
   <button className="quesCard" onClick={() =>{alert('you click this')}}>
        <div>
            <h1>{props.questionTitle}</h1>
            <p>{props.questionBrief}</p>
            <div style={{display: "flex", overflow:"auto"}}>
                <h4 className="tagH3">#CSS</h4>
                <h4 className="tagH3">#PYTHON</h4>
            </div>
            <div id="QuesCardStats">
                <div>
                    <img src="https://imgs.search.brave.com/HuIhX2a4WjVpCoZMJEkdQ2XMBpeTP5TFzCyqoE0_D38/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbGlw/YXJ0LWxpYnJhcnku/Y29tL2ltYWdlc19r/L2xpa2UtdHJhbnNw/YXJlbnQtYmFja2dy/b3VuZC9saWtlLXRy/YW5zcGFyZW50LWJh/Y2tncm91bmQtMTEu/anBn" alt="p" />
                    <p>{props.like}</p>
                </div>
                <div>
                    <img src="https://imgs.search.brave.com/t1mQ3qh29IqgTa7y0u1Hw2qq2LhT37y9XgAoPRoN-6U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vR256R2cv/TUFEVm9zR256R2cv/Mi90bC9jYW52YS1t/ZXNzYWdlLWljb24t/TUFEVm9zR256R2cu/cG5n" alt="p" />
                    <p>{props.comment}</p>
                </div>
            </div>
            <div id="userQuesInfo">
                <div>
                    <img src="https://images.icon-icons.com/3065/PNG/512/profile_user_account_icon_190938.png" alt="p" />
                </div>
                <div>
                    <a href="/">@{props.username}</a>
                </div>

            </div>
        </div>
    </button>
  )
}
