import './App.css';
import Navbar from './frontend/JS/Navbar';
import Home from './frontend/JS/Home/Home';
import Footer from './frontend/JS/Footer';
import SignUp from './frontend/JS/Authentication/SignUp.js'
import Login from './frontend/JS/Authentication/Login.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Post from './frontend/JS/Post/Post';
import PostEditor from './frontend/JS/Post/PostEditor';
import Answers from './frontend/JS/Answers/Answers';
import Profile from './frontend/JS/Profile/Profile';
import About from './frontend/JS/About';

    


function App() {
  return (
    <div>
      
      <Router>
        <Navbar />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post/>} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postEditor" element={<PostEditor />} />
          <Route path="/answers" element={<Answers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          
          
          
        </Routes>
        <Footer />
      </Router>
      
    </div>
    
    
  );
}

export default App;
