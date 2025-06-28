const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.js')
const Ans = require('../models/Answer.js')
const Ques = require('../models/Question.js')
const multer = require('multer')
const path = require('path');
router.use(express.urlencoded({ extended: true }));


router.use('/profilePicUploads', express.static(path.join(__dirname, '../profilePicUploads')));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../profilePicUploads')); // ✅ use relative path
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
});

const uploadProfilePic = multer({ storage, limits: { fileSize: 5*1024*1024 }, })



router.put('/uploadProfilePic',uploadProfilePic.single('profilePic'), async (req, res) =>{
    const userId = req.body.userId
    if(!req.file){
        return res.status(400).send({message: "Please select a file"})
    }

    try{
        const user = await User.findByIdAndUpdate(userId, {
            profileImage: `/profilePicUploads/${req.file.filename}`

        })

        if(!user){
            return res.status(404).send({message: "User not found"})
        }
        res.status(200).send({message: "Profile pic uploaded successfully"})
    }catch(err){
        res.status(500).send({message: "Internal server error"})
    }
})

router.post('/createAccount', async (req, res) =>{
    try{
        const newUser = await User.create(req.body)
        const registerUser = await User.findOne({username: req.body.username})
        res.json(registerUser)


    }catch(err){
        if (err.message.includes("duplicate key")){
            res.status(409).send({message: "account already exists"});
        }
        else{
            res.status(500).send({message: 'Internal server error'})
        }

    }

})

router.post('/login', async (req, res) =>{
    try{
        const {username, email, password} = req.body

        const user = await User.findOne({
            $or: [{username}, {email}]
        }).select('+password');

        if(!user){
            return res.status(404).send({message: 'No user found'})
        }

        const isPassCorrect = await bcrypt.compare(password, user.password)

        if(!isPassCorrect){
            return res.status(401).send({message: "Invalid password"})
        }

        res.status(200).send({message: "Login successfull", id: user._id})
    }catch(err){
        res.status(500).send({message: 'Internal server error'})
    }
})

// delete user account on request
router.delete('/deleteAccount', async(req, res) =>{

    try{
        const deleteAccount = await User.findByIdAndDelete(req.body.accountDeletionId)
        res.status(200).send("account deleted")
    }catch(err){

        res.status(500).send("Internal server error")
    }
})

router.put('/updateBio', async (req, res)=>{
    try{
        const updateBio = await User.findByIdAndUpdate(req.body.userId, {
            bio: req.body.bio
        })
        res.status(200).send("Bio updated")
    }catch (err){
        res.status(500).send("Internal server error")
    }
})

router.get('/search', async (req, res)=>{
    try {
        const query = req.query.q;
        if (!query || query.length < 2) return res.json([]);

        const regex = new RegExp('^' + query, 'i'); // starts with
        const users = await User.find({ username: { $regex: regex } })
            .limit(5)
            .select('-_id ');

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
})

router.get('/getUser', async (req, res)=>{
    try{
        let fetchUserId = req.query
        const userData = await User.findById(fetchUserId.userId).select('-_id')
        const questionData = await Ques.find({author: fetchUserId.userId}).select('title upvotes downvotes')
        const answerData = await Ans.find({author: fetchUserId.userId})
        let finalData = {
            user: userData,
            questions: questionData,
            answers: answerData,
        }
        res.json(finalData)
    }catch(err){
        res.status(500).send({message: "Server error in fetching user"})
    }
})


module.exports = router;

