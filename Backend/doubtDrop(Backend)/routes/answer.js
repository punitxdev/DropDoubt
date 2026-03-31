const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ans = require('../models/Answer.js');
const Ques = require('../models/Question.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/getAnswer', async(req, res) =>{
    try{
        if (!mongoose.Types.ObjectId.isValid(req.body.questionId)) {
            return res.status(400).send({message: "Invalid question ID"})
        }
        const data = await Ans.find({question: req.body.questionId}).populate('author', 'username _id isVerified profileImage')
        res.status(200).json(data)
    }catch(err){
        res.status(500).send({message: "server error", error: err.message})
    }
})

router.post('/postAnswer', async (req, res) =>{
    try{
        if (!mongoose.Types.ObjectId.isValid(req.body.question) || !mongoose.Types.ObjectId.isValid(req.body.author)) {
            return res.status(400).send({message: "Invalid IDs"})
        }
        
        // Ensure question exists
        const questionExists = await Ques.findById(req.body.question);
        if (!questionExists) {
            return res.status(404).send({message: "Parent question does not exist"})
        }
        
        const postAnswer = await Ans.create(req.body)
        res.status(201).send({message: 'Answer posted'})
    }catch(err){
        if (err.name === 'ValidationError') return res.status(400).send({message: 'Validation Error', errors: err.errors});
        res.status(500).send({message: 'Internal server error', error: err.message})
    }
})

router.delete('/deleteAnswer', async(req, res)=>{
        try{
            const {answerId, userId} = req.body;
             if (!mongoose.Types.ObjectId.isValid(answerId) || !mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).send({message: "Invalid IDs"})
            }
            
            let deletingAns = await Ans.findById(answerId)
            if (!deletingAns) return res.status(404).send({message: "Answer not found"});
            
            if(userId !== (deletingAns.author).toString()){
                return res.status(403).send({message: 'Unauthorized action'})
            }
            const deleteAnswer = await Ans.findByIdAndDelete(answerId)
            res.status(200).send({message: "Answer deleted"})
        }catch(err){
            res.status(500).send({message: 'Internal server error', error: err.message})
        }
})

router.put('/updateAnswer', async (req, res)=>{
    try{
        const {answerId, updateAnswerBody} = req.body;
         if (!mongoose.Types.ObjectId.isValid(answerId)) {
            return res.status(400).send({message: "Invalid ID"})
        }
        if (!updateAnswerBody) return res.status(400).send({message: "Update body is required"});
        
        const updateAnswer = await Ans.findByIdAndUpdate(answerId,{
            $set: {
                body: updateAnswerBody
            }
        })
        if (!updateAnswer) return res.status(404).send({message: "Answer not found"});
        res.status(200).send({message: 'updated successfully'})
    }catch(err){
        res.status(500).send({message: "Internal server error", error: err.message})
    }
})

router.put('/likeAnswer', async (req, res)=>{
    try{
        const {answerId, userId} = req.body;
        if (!mongoose.Types.ObjectId.isValid(answerId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({message: "Invalid IDs"})
        }
        
        const data = await Ans.findById(answerId)
        if (!data) return res.status(404).send({message: "Answer not found"});
        
        if((data.upvotes).includes(userId)){
            return res.status(400).send({message: "Already liked"})
        }
        await Ans.findByIdAndUpdate(answerId,
            { $push: { upvotes: userId } },
            { new: true }
        );
        res.status(200).send({message: 'liked successfully'})
    }catch(err){
        res.status(500).send({message: 'Internal server error', error: err.message})
    }
})

router.put('/dislikeAnswer', async (req, res)=>{
    try{
        const {answerId, userId} = req.body;
        if (!mongoose.Types.ObjectId.isValid(answerId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({message: "Invalid IDs"})
        }
        
        const data = await Ans.findById(answerId)
        if (!data) return res.status(404).send({message: "Answer not found"});
        
        if((data.downvotes).includes(userId)){
            return res.status(400).send({message: "Already disliked"})
        }
        await Ans.findByIdAndUpdate(answerId,
            {$push: { downvotes: userId }},
            {new: true}
        );
        res.status(200).send({message: 'disliked successfully'})
    }catch (err){
        res.status(500).send({message: 'Internal server error', error: err.message})
    }
})

router.put('/setAsBestAnswer', async (req, res) =>{
    try {
        const answerId = req.body.answerId;
        if (!mongoose.Types.ObjectId.isValid(answerId)) {
            return res.status(400).send({message: "Invalid ID"})
        }
        
        const selectedAnswer = await Ans.findById(answerId);
        if (!selectedAnswer) return res.status(404).send({message: "Answer not found"});

        const question = selectedAnswer.question;

        await Ans.updateMany(
            { question: question, isAccepted: true },
            { $set: { isAccepted: false } }
        );

        await Ans.findByIdAndUpdate(answerId, {
            $set: { isAccepted: true }
        }, { new: true });

        res.status(200).send({message: "updated successfully"});
    } catch (err) {
        res.status(500).send({message: "Internal server error", error: err.message});
    }
})

module.exports = router;