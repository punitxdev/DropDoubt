const express = require('express');
const router = express.Router();
const Ques = require('../models/Question.js')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// get all question data
router.get('/getQuestion', async(req, res) =>{
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
router.post('/postQuestion', async(req, res) =>{
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
router.delete('/deleteQuestion', async(req, res) =>{

    try{
        const deletionQues = await Ques.findByIdAndDelete(req.body.quesId)
        res.status(200).send('Question deleted')
    }catch(err){
        res.status(500).send('Internal server error')
        // console.log(err);
    }


})

router.put('/upvoteQuestion', async (req, res)=>{
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

router.put('/downvoteQuestion', async(req, res)=>{
    try{
        const questionData = await Ques.findById(req.body.questionId)
        if(questionData.downvotes.includes(req.body.userId)){
            return res.status(401).send(true)
        }
        else{
            const question = await Ques.findByIdAndUpdate(req.body.questionId, {
                $push: {downvotes: req.body.userId}
            }, {new: true})
            res.status(200).send('Question downvoted successfully')
        }
    }catch(err){
        res.status(500).send('Internal server error')
    }
})

module.exports = router;