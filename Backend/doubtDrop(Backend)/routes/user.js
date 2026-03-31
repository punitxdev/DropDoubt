const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User.js')
const Ans = require('../models/Answer.js')
const Ques = require('../models/Question.js')
const multer = require('multer')
const path = require('path');
router.use(express.urlencoded({ extended: true }));

router.use('/profilePicUploads', express.static(path.join(__dirname, '../profilePicUploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../profilePicUploads'));
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
});

const uploadProfilePic = multer({ storage, limits: { fileSize: 5*1024*1024 }, })

router.put('/uploadProfilePic',uploadProfilePic.single('profilePic'), async (req, res) =>{
    try{
        const userId = req.body.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({message: "Invalid user ID"})
        }
        if(!req.file){
            return res.status(400).send({message: "Please select a file"})
        }
        const user = await User.findByIdAndUpdate(userId, {
            profileImage: `/profilePicUploads/${req.file.filename}`
        })
        if(!user){
            return res.status(404).send({message: "User not found"})
        }
        res.status(200).send({message: "Profile pic uploaded successfully"})
    }catch(err){
        res.status(500).send({message: "Internal server error", error: err.message})
    }
})

router.post('/createAccount', async (req, res) =>{
    try{
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).send({message: "Please provide all required fields."});
        }
        const newUser = await User.create(req.body)
        const registerUser = await User.findOne({username: req.body.username})
        res.status(201).json(registerUser)
    }catch(err){
        if (err.message && err.message.includes("duplicate key")){
            res.status(409).send({message: "Account already exists"});
        } else if (err.name === 'ValidationError') {
            res.status(400).send({message: "Validation Error", details: err.errors});
        } else{
            res.status(500).send({message: 'Internal server error', error: err.message})
        }
    }
})

router.post('/login', async (req, res) =>{
    try{
        const {username, email, password} = req.body
        if ((!username && !email) || !password) {
             return res.status(400).send({message: "Please provide credentials."});
        }
        const user = await User.findOne({
            $or: [{username: username || ''}, {email: email || ''}]
        }).select('+password');

        if(!user){
            return res.status(404).send({message: 'Invalid credentials'})
        }

        const isPassCorrect = await bcrypt.compare(password, user.password)

        if(!isPassCorrect){
            return res.status(401).send({message: "Invalid credentials"})
        }

        res.status(200).send({message: "Login successful", id: user._id})
    }catch(err){
        res.status(500).send({message: 'Internal server error', error: err.message})
    }
})

router.delete('/deleteAccount', async(req, res) =>{
    try{
        const accountId = req.body.accountDeletionId;
        if (!mongoose.Types.ObjectId.isValid(accountId)) {
            return res.status(400).send({message: "Invalid account ID"})
        }
        const deleteAccount = await User.findByIdAndDelete(accountId)
        if (!deleteAccount) return res.status(404).send({message: "Account not found"});
        // Cascade delete or anonymize related questions, answers? (skip for now to keep safe, just DB consistency)
        res.status(200).send({message: "Account deleted"})
    }catch(err){
        res.status(500).send({message: "Internal server error", error: err.message})
    }
})

router.put('/updateBio', async (req, res)=>{
    try{
        const {userId, bio} = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({message: "Invalid user ID"})
        }
        const updateBio = await User.findByIdAndUpdate(userId, { bio })
        if (!updateBio) return res.status(404).send({message: "User not found"});
        res.status(200).send({message: "Bio updated"})
    }catch (err){
        res.status(500).send({message: "Internal server error", error: err.message})
    }
})

router.get('/search', async (req, res)=>{
    try {
        const query = req.query.q;
        if (!query || query.length < 2) return res.json([]);
        const regex = new RegExp('^' + query, 'i');
        const users = await User.find({ username: { $regex: regex } })
            .limit(5)
            .select('-_id ');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
})

router.get('/getUser', async (req, res)=>{
    try{
        let fetchUserId = req.query.userId;
        if (!mongoose.Types.ObjectId.isValid(fetchUserId)) {
            return res.status(400).send({message: "Invalid user ID"})
        }
        const userData = await User.findById(fetchUserId).select('-_id')
        if (!userData) return res.status(404).send({message: "User not found"});
        const questionData = await Ques.find({author: fetchUserId}).select('title upvotes downvotes')
        const answerData = await Ans.find({author: fetchUserId})
        let finalData = {
            user: userData,
            questions: questionData,
            answers: answerData,
        }
        res.status(200).json(finalData)
    }catch(err){
        res.status(500).send({message: "Server error in fetching user", error: err.message})
    }
})

module.exports = router;
