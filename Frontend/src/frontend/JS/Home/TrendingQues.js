import React from 'react';
import { motion } from 'framer-motion';
import QuesCard from './QuesCard';
import "../../css/Home_Style/TrendingQues.css";

export default function TrendingQues() {
    const questions = [
        {
            questionTitle: "What is the best way to start learning web development?",
            questionBrief: "I want to become a full stack developer. Should I start with HTML/CSS or jump into a framework like React?",
            like: 120,
            comment: 68,
            username: "tech_learner",
        },
        {
            questionTitle: "How to improve problem solving skills for coding interviews?",
            questionBrief: "I struggle with competitive programming. What resources or habits should I follow to get better?",
            like: 98,
            comment: 42,
            username: "code_master",
        },
        {
            questionTitle: "Why is React preferred over Vanilla JS in large projects?",
            questionBrief: "Many developers seem to prefer React. What makes it more maintainable than vanilla JavaScript?",
            like: 75,
            comment: 33,
            username: "frontend_dev",
        },
    ];

    return (
        <section className="trending-ques-section">
            <div className="trending-ques-header">
                <h1 className="trending-ques-title">Trending Questions</h1>
                <p className="trending-ques-subtitle">Most active topics in the community right now</p>
            </div>

            <div className="trending-ques-grid">
                {questions.map((q, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <QuesCard
                            questionTitle={q.questionTitle}
                            questionBrief={q.questionBrief}
                            like={q.like}
                            comment={q.comment}
                            username={q.username}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
