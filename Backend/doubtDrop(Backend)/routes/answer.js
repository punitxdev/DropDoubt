const express = require('express');
const router = express.Router();
const Ans = require('../models/Answer.js')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post('/getAnswer', async(req, res) =>{
    console.log('fetching answer');

    try{
        const data = await Ans.find({question: req.body.questionId}).populate('author', 'username _id isVerified profileImage')
        res.status(200).json(data)
    }catch(err){
        res.json({message: "server error"})
    }
})

router.post('/postAnswer', async (req, res) =>{
    try{
        const postAnswer = await Ans.create(req.body)
        res.status(200).send('Answer post')
    }catch(err){
        res.status(500).send('Internal server error')
        console.log(err.message);

    }
})

router.delete('/deleteAnswer', async(req, res)=>{
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

router.put('/updateAnswer', async (req, res)=>{
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

router.put('/likeAnswer', async (req, res)=>{
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

router.put('/dislikeAnswer', async (req, res)=>{
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


module.exports = router;