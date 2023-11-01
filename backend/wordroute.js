import express from "express";
import mongoose from "mongoose";
import { wordModel } from "./Word.js";
const router =  express.Router()
router.post("/",async(req,res)=>{
    const word = new wordModel({
        _id: new mongoose.Types.ObjectId(),
        word:req.body.word,
        meaning:req.body.meaning,
        example:req.body.example,
        date:req.body.date,
    })
    console.log(word)
    try {
        const result = await word.save()
        res.status(201).json({
            createdWord:{
                word:result.word,
                meaning:result.meaning,
                example:result.example,
                date:result.date,
                _id:result._id,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
router.get("/savedWords",async(req,res)=>{
    try {
        const words = await wordModel.find()
        res.status(201).json({words})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
router.delete("/deleteword/:id", async (req, res) => {
    try {
        const wordId = req.params.id;
        const deletedWord = await wordModel.findByIdAndRemove(wordId);
        if (deletedWord) {
            res.json({ message: "Deleted successfully" });
        } else {
            res.status(404).json({ message: "Word not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.put("/link/:id", async (req, res) => {
  try {
    const wordId = req.params.id;
    const { linkedWords } = req.body;
    const updatedWord = await wordModel.findByIdAndUpdate(wordId, { linkedWords }, { new: true });

    res.json({  updatedWord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/partword/:id",async(req,res)=>{
    try{

        const wordId = req.params.id;
        console.log(wordId)
        const wordfound = await wordModel.findById(wordId)
        console.log(wordfound)
        res.json({wordfound})
    }catch (error){
        console.log(error)
        res.status(500).json({message:"sorry"})
    }
})

export { router as wordRouter };