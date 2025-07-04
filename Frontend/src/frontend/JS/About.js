import React from 'react';
import '../css/about.css';

export default function About() {
    return (
        <div className="about-container">
            <h1 id="mainHeading">About</h1>

            <h2 className="subHeading">Ask Fast. Answer Faster.</h2>
            <p className="description">
                Welcome to a community-powered platform designed for speed, simplicity, and focus.
                At <b>1-Line Doubt Sharing Forum</b>, you ask questions in a single line and get quick, clutter-free answers —
                because we believe learning should be fast and frictionless.
            </p>

            <h2 className="subHeading">Our Mission</h2>
            <p className="description">
                We aim to eliminate the delays and confusion often found in traditional Q&A platforms.
                Our mission is to create a space where doubts are posted in one line and answered with clarity — fast.
                Whether you’re preparing for an exam or exploring a new topic, we help you move forward, one answer at a time.
            </p>

            <h2 className="subHeading">How It Works</h2>
            <p className="description">
                1. Post your question in one line.<br />
                2. Get a quick, clutter-free answer in one line.<br />
                3. Share your answers with your friends and colleagues.<br />
                4. Get feedback on your answers.<br />
                5. Get rewarded for your answers.
            </p>

            {/* 🌟 Reputation System Section */}
            <h2 className="subHeading">Reputation & Titles</h2>
            <p className="description">
                You earn reputation points based on your activity on the platform:
                <ul style={{ marginLeft: "20px" }}>
                    <li>+5 points for every accepted (Best) answer you post</li>
                    <li>+4 points for each upvote your answer receives</li>
                    <li>+2 points for every answer you post</li>
                    <li>+0.5 points for every question you ask</li>
                    <li>-1 point for each downvote</li>
                </ul>
                The more helpful you are, the more you grow!
            </p>

            <p className="description">
                <b>Reputation Formula:</b><br />
                <code>
                    Reputation = (4 × upVotes) − (1 × downVotes) + (2 × noOfAnswers) + (0.5 × noOfQuestions) + (5 * isAcceptedAnswer)
                </code>
            </p>

            <p className="description">
                Your total reputation determines your title on the platform.
            </p>

            <table className="titleTable">
                <thead>
                <tr>
                    <th>Score Range</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                <tr><td>0 – 10</td><td>Tiny Doubter 🍼</td></tr>
                <tr><td>11 – 50</td><td>Question Kid 🤔</td></tr>
                <tr><td>51 – 100</td><td>Mini Helper 🧸</td></tr>
                <tr><td>101 – 250</td><td>Smart Cookie 🍪</td></tr>
                <tr><td>251 – 500</td><td>Clue Finder 🔍</td></tr>
                <tr><td>501 – 1000</td><td>Brainy Buddy 🧠</td></tr>
                <tr><td>1001 – 2000</td><td>Doubt Buster 💥</td></tr>
                <tr><td>2001 – 5000</td><td>Answer Champ 🏆</td></tr>
                <tr><td>5001 – 10000</td><td>Question Hero 🦸</td></tr>
                <tr><td>10000+</td><td>Wonder Wizard 🧙</td></tr>
                </tbody>
            </table>

            <h2 className="subHeading">Verified Badge</h2>
            <p className="description">
                On our platform, a <b>Verified Badge</b> <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                alt="Verified"
                style={{ width: '18px', verticalAlign: 'middle', marginLeft: '4px' }}
            /> is a mark of authenticity.
            </p>

            <p className="description">
                The badge is awarded to users who are either:
                <ul style={{ marginLeft: "20px" }}>
                    <li>🏅 Trusted contributors with consistently high-quality answers</li>
                    <li>🎓 Educators, subject experts, or professionals in their domain</li>
                    <li>🎯 Verified identity or affiliation with recognized institutions</li>
                </ul>
            </p>

            <p className="description">
                Verified users help maintain the platform's quality and reliability.
                Their answers are often highlighted to build trust in learning communities.
            </p>

            <p className="description">
                <b>How to get verified?</b><br />
                You can request verification by reaching out to us via email or through our feedback form.
                Every application is manually reviewed for quality and credibility.
            </p>

            <h2 className="subHeading">Best Answer ✅</h2>
            <p className="description">
                The person who asked a doubt can mark <b>one answer</b> as the <b>Best Answer</b>.
                This helps highlight the most accurate or helpful solution for future readers.
            </p>
            <p className="description">
                <ul style={{ marginLeft: "20px" }}>
                    <li>🏅 Only one best answer is allowed per question</li>
                    <li>✅ Marked answers show a <b>Best Answer</b> badge</li>
                    <li>📈 The answerer gets additional reputation of +5 points</li>
                </ul>
            </p>



            <h2 className="subHeading">Our Vision</h2>
            <p className="description">
                We believe doubt-solving should be accessible, fast, and empowering.
                Our vision is to build a global learning community that thrives on precision, respect, and collaboration —
                where anyone can ask, answer, and grow without noise or complexity.
            </p>

            <h2 className="subHeading">Meet the Creator</h2>
            <p className="description">
                Hi, I’m <b>Punit Kashyap</b> — a student from the Engineering Physics department at <b>IIT Dharwad</b> and a passionate developer.
                I created this platform to solve a problem I personally faced: the lack of fast and distraction-free doubt-solving tools.
                <br /><br />
                With <b>React</b>, <b>Express</b>, and <b>MongoDB</b>, I built this project to support learners who value clarity, speed, and simplicity.
                Feel free to reach out or contribute!
            </p>

            <h2 className="subHeading">Tech Stack</h2>
            <p className="description">
                We use the MERN stack and modern tools to power the platform:
                <br /><b>Frontend:</b> React.js
                <br /><b>Backend:</b> Node.js + Express.js
                <br /><b>Database:</b> MongoDB
                <br /><b>State Management:</b> React Context API
            </p>

            <h2 className="subHeading">Contribute & Collaborate</h2>

            <p className="description">
                We’re building a fast, focused, and helpful learning space — and you can help shape it.
                Whether you're a developer, student, or just someone with great ideas, your contribution matters.
            </p>

            <p className="description">
                <b>Ways you can contribute:</b>
                <ul style={{ marginLeft: "20px" }}>
                    <li>🛠 Suggest new features or improvements</li>
                    <li>🎨 Share UI/UX feedback</li>
                    <li>🐞 Report bugs or glitches</li>
                    <li>📚 Write or review content</li>
                    <li>🧠 Propose new title ideas or gamification features</li>
                    <li>📣 Help spread the word!</li>
                </ul>
            </p>

            <p className="description">
                💌 <b>Want to reach out?</b><br />
                Just send us an email at <a href="mailto:your-email@example.com">your-email@example.com</a> — we’d love to hear from you!
            </p>


            <h2 className="subHeading">Contact Us</h2>
            <p className="description">
                Have feedback, feature suggestions, or want to report a bug?
                <br />📧 Email: your-email@example.com
                <br />🐱 GitHub: github.com/yourusername/your-repo
                <br />📝 Feedback Form: [Submit your thoughts]
            </p>

            <h3>© 2025 1-Line Doubt Sharing Forum</h3>
            <p>Built with ❤️ by Punit Kashyap.</p>
        </div>
    );
}
