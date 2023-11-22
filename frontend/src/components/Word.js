import React,{useEffect,useState} from 'react'
import {useSpeechSynthesis} from 'react-speech-kit'
import axios from 'axios'
export const Word=({ word, setWords, showWordsLinked })=>{
    const { speak } = useSpeechSynthesis();
    const [simmilar,setSimmilar]=useState([])
    const [selected,setSelected]=useState("")
    const handleSpeak = (text) => {
        speak({ text });
    }
    const handleDelete = async (wordId) => {
        try {
             axios.delete(`http://localhost:5000/word/deleteword/${wordId}`);
            setWords((prevWords) => prevWords.filter((word) => word._id !== wordId));
        } catch (error) {
            console.log(error);
        }
    };
    const handleAllSearch = (linkedWords)=>{
            for( const wordId of linkedWords){
                handleSearch(wordId)
            }
        
    }
    const show=async(linkedWords,id)=>{
        try{
            await handleAllSearch(linkedWords)
            setSelected(id)
        }catch(error){
            console.log(error)
        }
        console.log(simmilar)
        console.log(selected)
        setSimmilar([])
    }
    const handleSearch=async(wordId)=>{
        console.log(wordId)
        try{
            const res = await axios.get(`http://localhost:5000/word/partword/${wordId}`)
            const resdata = res.data
            setSimmilar((prev)=>[...prev,resdata.wordfound])
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div className="word" key={word._id}>
            <div className="header">
               
                <button  className="wordFunc" onClick={() => handleSpeak(word.word)}>
                    speak
                </button>
                <button className="wordFunc" onClick={() => handleDelete(word._id)}>
                    delete
                </button>
                    
                {/* <button className="link" onClick={() => setShowAllWords(true)}>
                    Link
                </button> */}
                <button onClick={()=>show(word.linkedWords,word._id)} className='wordFunc'>
                    linkedWords
                </button>
                <h2 className="wordheading">{word.word}</h2>
            </div>
            <h2 className="wordMeaning">{word.meaning}</h2>
<h2 className='exH'>Example</h2>
            <h2 className="wordExapmle">{word.example}</h2>

            {word._id === selected && (
                <ul>
                {simmilar.map((similarWord, index) => (
                    <li key={index}>{similarWord.word}</li>
                ))}
                </ul>
            )}
        </div>
    )
}