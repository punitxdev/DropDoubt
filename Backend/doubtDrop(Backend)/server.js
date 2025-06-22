const express = require("express")
const app = express()
const port = 1000
const connectToDatabase = require('./db.js')
const User = require('./models/User.js')
const Ques = require('./models/Question.js')
const multer = require('multer')
const upload = multer()
const Ans = require('./models/Answer.js')
const cors = require('cors')
const bcrypt = require('bcryptjs');

// Middleware to parse JSON bodies
app.use(express.json()); // Built-in in Express 4.16+
app.use('/profilePicUploads', express.static('profilePicUploads'));

app.use(cors({origin: "http://localhost:3000"}))

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// get user data
app.get('/user/getUser', async (req, res)=>{
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

const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'profilePicUploads')); // ✅ use relative path
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
});

const uploadProfilePic = multer({ storage, limits: { fileSize: 5*1024*1024 }, })



app.put('/user/uploadProfilePic',uploadProfilePic.single('profilePic'), async (req, res) =>{
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

// create user account on request
app.post('/user/createAccount', async (req, res) =>{
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

app.post('/user/login', async (req, res) =>{
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
app.delete('/user/deleteAccount', async(req, res) =>{

    try{
        const deleteAccount = await User.findByIdAndDelete(req.body.accountDeletionId)
        res.status(200).send("account deleted")
    }catch(err){

        res.status(500).send("Internal server error")
    }
})

app.put('/user/updateBio', async (req, res)=>{
    try{
        const updateBio = await User.findByIdAndUpdate(req.body.userId, {
            bio: req.body.bio
        })
        res.status(200).send("Bio updated")
    }catch (err){
        res.status(500).send("Internal server error")
    }
})

// ---------------------------------------- question Api ----------------------------------------------------

// get all question data
app.get('/question/getQuestion', async(req, res) =>{
    console.log('fetching question');
    
    try{
        const data = await Ques.find().populate('author', 'username isVerified')
        // console.log(data)
        res.status(200).json(data)
    }catch(err){
        res.status(500).send({message: "Server error in fetching question"})
    }
    
})

// Post question from user input
app.post('/question/postQuestion', async(req, res) =>{
    try{
        const data = await Ques.create(req.body)
        res.status(200).send('question posted successfully');
    }catch(err){
        console.log(req.body);
        
        console.log(err);
        
        res.status(500).send('Internal server error')
    }

})

// Delete question posted by user
app.delete('/question/deleteQuestion', async(req, res) =>{
    
   try{
    const deletionQues = await Ques.findByIdAndDelete(req.body.quesId)
     res.status(200).send('Question deleted')
   }catch(err){
    res.status(500).send('Internal server error')
    // console.log(err);
   } 
 

})

app.put('/question/upvoteQuestion', async (req, res)=>{
    try{
        const data = await Ques.findById(req.body.questionId)
        if((data.upvotes).includes(req.body.userId)){
            return res.status(401).send(true)
        }

        await Ques.findByIdAndUpdate(req.body.questionId,
            {$push: {upvotes: req.body.userId}},
            {new: true}
        );
        res.status(200).send('Question upvoted successfully')
    }catch(err){
        res.status(500).send('Internal server error')
    }
})

// ------------------------------------- answer api ---------------------------------------------------------

app.post('/answer/getAnswer', async(req, res) =>{
    console.log('fetching answer');
    
    try{
        const data = await Ans.find({question: req.body.questionId}).populate('author', 'username _id isVerified profileImage')
        res.status(200).json(data) 
    }catch(err){
        res.json({message: "server error"})
    }
})

app.post('/answer/postAnswer', async (req, res) =>{
    try{
        const postAnswer = await Ans.create(req.body)
        res.status(200).send('Answer post')
    }catch(err){
        res.status(500).send('Internal server error')
        console.log(err.message);
        
    }
}), 

app.delete('/answer/deleteAnswer', async(req, res)=>{
    try{
        let deletingAns = await Ans.findById(req.body.answerId)
        // console.log((deletingAns.author).toString())
        if(req.body.userId !== (deletingAns.author).toString()){
            return res.status(401).send('Unauthorized')
        }
        const deleteAnswer = await Ans.findByIdAndDelete(req.body.answerId)
        res.status(200).send("Deleted")
    }catch(err){
        res.status(500).send('Internal server error')
    }
})

app.put('/answer/updateAnswer', async (req, res)=>{
    try{
        // console.log(req.body);
        
        const updateAnswer = await Ans.findByIdAndUpdate(req.body.answerId,{ 
        $set: { 
          body: req.body.updateAnswerBody
        } 
      },)
        res.status(200).send('updated successfully')
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error")
    }
})

app.put('/answer/likeAnswer', async (req, res)=>{
    try{
        const data = await Ans.findById(req.body.answerId)
        if((data.upvotes).includes(req.body.userId)){
            return res.status(401).send(true)
        }
        await Ans.findByIdAndUpdate(req.body.answerId,
            { $push: { upvotes: req.body.userId } }, // adds new hobby
            { new: true }
        );
        res.status(200).send('liked successfully')
    }catch(err){
        res.status(500).send('Internal server error')
    }
})

app.put('/answer/dislikeAnswer', async (req, res)=>{
    try{
        const data = await Ans.findById(req.body.answerId)
        if((data.downvotes).includes(req.body.userId)){
            return res.status(401).send(true)
        }
        await Ans.findByIdAndUpdate(req.body.answerId,
            {$push: { downvotes: req.body.userId }},
            {new: true}
        );
        res.status(200).send('disliked successfully')
    }catch (err){
        res.status(500).send('Internal server error')
    }
})

// port listening on 1000
app.listen(port, ()=>{
    console.log(`Server listen on ${port}`)
})  