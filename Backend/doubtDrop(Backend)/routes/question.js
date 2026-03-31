const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ques = require('../models/Question.js')
const Ans = require('../models/Answer.js')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/getQuestion', async(req, res) =>{
    try{
        const data = await Ques.find().populate('author', 'username isVerified profileImage')
        res.status(200).json(data)
    }catch(err){
        res.status(500).send({message: "Server error in fetching question", error: err.message})
    }
})

router.post('/postQuestion', async(req, res) =>{
    try{
        if (!req.body.author || !mongoose.Types.ObjectId.isValid(req.body.author)) {
            return res.status(400).send({message: "Invalid author ID"});
        }
        if (!req.body.question || !req.body.questionBody) {
             return res.status(400).send({message: "Missing question details"});
        }
        const data = await Ques.create(req.body)
        res.status(201).send({message: 'Question posted successfully', data});
    }catch(err){
        if (err.name === 'ValidationError') return res.status(400).send({message: 'Validation Error', errors: err.errors});
        res.status(500).send({message: 'Internal server error', error: err.message})
    }
})

router.delete('/deleteQuestion', async(req, res) =>{
    try{
        const quesId = req.body.quesId;
        if (!mongoose.Types.ObjectId.isValid(quesId)) {
            return res.status(400).send({message: "Invalid question ID"})
        }
        const deletionQues = await Ques.findByIdAndDelete(quesId)
        if (!deletionQues) return res.status(404).send({message: 'Question not found'});
        
        // Cascade delete answers
        await Ans.deleteMany({ question: quesId });
        
        res.status(200).send({message: 'Question and associated answers deleted'})
    }catch(err){
        res.status(500).send({message: 'Internal server error', error: err.message})
    }
})

router.put('/upvoteQuestion', async (req, res)=>{
    try{
        const {questionId, userId} = req.body;
        if (!mongoose.Types.ObjectId.isValid(questionId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({message: "Invalid IDs"})
        }
        const data = await Ques.findById(questionId)
        if (!data) return res.status(404).send({message: "Question not found"});
        
        if((data.upvotes).includes(userId)){
            return res.status(400).send({message: "Already upvoted"})
        }

        await Ques.findByIdAndUpdate(questionId,
            {$push: {upvotes: userId}},
            {new: true}
        );
        res.status(200).send({message: 'Question upvoted successfully'})
    }catch(err){
        res.status(500).send({message: 'Internal server error', error: err.message})
    }
})

router.put('/downvoteQuestion', async(req, res)=>{
    try{
        const {questionId, userId} = req.body;
         if (!mongoose.Types.ObjectId.isValid(questionId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({message: "Invalid IDs"})
        }
        const questionData = await Ques.findById(questionId)
        if (!questionData) return res.status(404).send({message: "Question not found"});
        
        if(questionData.downvotes.includes(userId)){
            return res.status(400).send({message: "Already downvoted"})
        }
        
        await Ques.findByIdAndUpdate(questionId, {
            $push: {downvotes: userId}
        }, {new: true})
        res.status(200).send({message: 'Question downvoted successfully'})
    }catch(err){
        res.status(500).send({message: 'Internal server error', error: err.message})
    }
})

module.exports = router;