import React from 'react'
import '../../css/home.css'
import TrendingQues from './TrendingQues';

export default function Home() {
  return (
    <div>
        <div id="homeContainer">
            <div>
              <h1 style={{color: "white"}}>Place where all doubt will resolve..</h1>
              <div id="homeAlign">
                <button className="homeBtn">Login</button>
                <button className="homeBtn">Sign In</button>
              </div>
            </div>

        </div>
        <div>
          <TrendingQues />
        </div>
    </div>
  )
}
