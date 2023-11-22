import React, { useState,useEffect } from 'react';
import axios from 'axios';

export const AddWord = () => {
  const [word, changeWord] = useState('');
  const [meaning, changeMeaning] = useState('');
  const [example, changeExample] = useState('');
  const currentDate = new Date();
  const month = currentDate.getMonth()+1;
  const clearFields = () => {
    changeWord('');
    changeMeaning('');
    changeExample('');
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/word/",
        {
          word: word,
          meaning: meaning,
          example: example,
          date:currentDate.getDate()+"/"+month+"/"+currentDate.getFullYear(),
        }
      );
      alert("WORD ADDED");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // You can call save() here if needed, based on your component's logic.
    // Remember to clean up any resources when the component unmounts if necessary.
  }, []);   

  return (
    <div className='mainCon'>
    <img src='./images/dictionary.svg' style={{width:'30%'}}/>
    <div className="form">
      <input type="text" value={word} onChange={(e) => changeWord(e.target.value)} placeholder='word' className='wordInput'/>
      <textarea value={meaning} onChange={(e) => changeMeaning(e.target.value)} placeholder='word meaning' className='meaningInput'/>
      <textarea value={example} onChange={(e) => changeExample(e.target.value)} placeholder='example' className='meaningInput'/>
      <button onClick={(e) => { clearFields(); save(e); }} className='addButton'>ADD</button>
    </div>
    </div>
  );
};
