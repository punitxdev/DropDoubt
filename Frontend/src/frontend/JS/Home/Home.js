import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/home.css';
import TrendingQues from './TrendingQues';

export default function Home() {
    return (
        <div className="homepage-container">
            <header className="hero-section simple-hero">
                <h1 className="hero-title">1-Line Doubt Forum</h1>
                <p className="hero-subtitle">Ask smart. Answer fast. Learn together.</p>
                <div className="auth-buttons">
                    <NavLink to="/login" className="auth-btn login-btn">Login</NavLink>
                    <NavLink to="/signup" className="auth-btn signup-btn">Sign Up</NavLink>
                </div>
            </header>

            <main>
                <section className="info-section minimal">
                    <h2>About</h2>
                    <p>1-Line Doubt Sharing Forum is a minimal and focused platform where learners post questions and receive crisp, relevant answers.</p>

                    <h3>Why Join?</h3>
                    <ul>
                        <li>Post doubts in one line</li>
                        <li>Get helpful answers instantly</li>
                        <li>Upvote quality answers</li>
                        <li>Follow trending queries</li>
                        <li>Minimal design, maximum clarity</li>
                    </ul>
                </section>

                <section className="how-it-works">
                    <h2>How It Works</h2>
                    <div className="steps-container">
                        <div className="step">
                            <h4>1. Post Your Doubt</h4>
                            <p>Ask your question in one line – simple and direct.</p>
                        </div>
                        <div className="step">
                            <h4>2. Get Quick Replies</h4>
                            <p>Community members answer your doubt almost instantly.</p>
                        </div>
                        <div className="step">
                            <h4>3. Vote and Learn</h4>
                            <p>Upvote useful answers and learn from others’ queries.</p>
                        </div>
                    </div>
                </section>

                <section className="trending-section">
                    <h2>Trending Questions</h2>
                    <TrendingQues />
                </section>

                <section className="testimonials-section">
                    <h2>What Our Users Say</h2>
                    <div className="testimonial-card">
                        <p>"I cleared my doubts in seconds. Super useful!"</p>
                        <span>- Priya, B.Tech Student</span>
                    </div>
                    <div className="testimonial-card">
                        <p>"Minimal UI, maximum productivity."</p>
                        <span>- Aman, JEE Aspirant</span>
                    </div>
                </section>

                <footer className="cta-footer">
                    <h2>Ready to get started?</h2>
                    <NavLink to="/signup" className="cta-button">Join the Community</NavLink>
                </footer>
            </main>
        </div>
    );
}
