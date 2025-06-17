import React from 'react'
import QuesCard from './QuesCard';
import "../../css/Home_Style/TrendingQues.css"



export default function TrendingQues() {
  return (
    <div>
        <div className="flex">
            <h1 id="trendingQuesHeading">Our Trending Questions</h1>
        </div>
        <div id="trendingQuesContainer">
            <QuesCard 
                questionTitle={"This is a sample question ?"} 
                questionBrief = {"This is a sample breifing of my question"}
                like = {45}
                comment ={50}
                username ={"punit2007"}
            />
            <QuesCard 
                questionTitle={"How to learn touch typing..."} 
                questionBrief = {"This is a sample breifing of my question"}
                like = {45}
                comment ={50}
                username ={"nidhimishra09"}
            />
            
        </div>
    </div>
  )
}
