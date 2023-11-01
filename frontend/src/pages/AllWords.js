import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpeechSynthesis } from 'react-speech-kit';
import {Word} from "../components/Word"
export const AllWords = () => {
  // State variable to store the list of words
  const [words, setWords] = useState([]);

  const [linkedWords, setLinkedWords] = useState([]);
  // State variable to control the visibility of the "All Words" section
  const [showAllWords, setShowAllWords] = useState(false);

  // Fetch words from the server when the component mounts
  useEffect(() => {
    async function fetchWords() {
      try {
        const response = await axios.get('http://localhost:5000/word/savedWords');
        
        // Sort the words based on the date string
        const sortedWords = response.data.words.sort((a, b) => {
          // Convert date strings to Date objects for comparison
          const dateA = new Date(
            parseInt(a.date.split('/')[2]),   // Year
            parseInt(a.date.split('/')[1]), // Month (0-based)
            parseInt(a.date.split('/')[0])    // Day
          );
          const dateB = new Date(
            parseInt(b.date.split('/')[2]),   // Year
            parseInt(b.date.split('/')[1]), // Month (0-based)
            parseInt(b.date.split('/')[0])    // Day
          );
          
          // Compare the Date objects
          return dateB - dateA;
        });
        
        setWords(sortedWords);
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    }

    fetchWords();
  }, []); // Empty dependency array to run the effect only once on component mount

  // Create an object to group words by date
  const groupedWords = {};
  words.forEach((word) => {
    if (!groupedWords[word.date]) {
      groupedWords[word.date] = [];
    }
    groupedWords[word.date].push(word);
  });

  

  const handleDelete = async (wordId) => {
    try {
      await axios.delete(`http://localhost:5000/word/deleteword/${wordId}`);
      setWords((prevWords) => prevWords.filter((word) => word._id !== wordId));
    } catch (error) {
      console.log(error);
    }
  };

  const updateLinkedWords = async (wordId) => {
    try {
      console.log(wordId, linkedWords);
      await axios.put(`http://localhost:5000/word/link/${wordId}`, { linkedWords });
      // Handle success (e.g., display a success message)
    } catch (error) {
      console.error('Error updating linked words:', error);
      // Handle error (e.g., display an error message)
    }
  };
  const showWordsLinked=(arr)=>{
    console.log(arr)
  }
  const handleLinkWords = async () => {
    try {
      // Iterate over the selected words and call updateLinkedWords for each
      linkedWords.forEach(async (wordId) => {
        await updateLinkedWords(wordId);
      });

      // Toggle the visibility of the "All Words" section
      setShowAllWords(true);

      // You can add a success message or any other logic here
    } catch (error) {
      console.error('Error linking words:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const handleWordSelect = (event) => {
    const wordId = event.target.value;
    if (event.target.checked) {
      // Add the selected word's ID to the linkedWords array
      setLinkedWords((prevLinkedWords) => [...prevLinkedWords, wordId]);
    } else {
      // Remove the selected word's ID from the linkedWords array
      setLinkedWords((prevLinkedWords) =>
        prevLinkedWords.filter((id) => id !== wordId)
      );
    }
  };

  return (
    <>
      <div>
        {/* Show the "Link Selected Words" button only if no words are linked yet */}
        {linkedWords.length === 0 && (
          <button onClick={handleLinkWords}>Link Selected Words</button>
        )}
      </div>

      {/* Conditionally render the "All Words" section */}
      {showAllWords && (
        <div>
          <h2>Select Words to Link:</h2>
          {words.map((word) => (
            <div key={word._id}>
              <label>
                <input
                  type="checkbox"
                  value={word._id}
                  checked={linkedWords.includes(word._id)}
                  onChange={handleWordSelect}
                />
                {word.word}
              </label>
            </div>
          ))}
          <button onClick={handleLinkWords}>Link Selected Words</button>
        </div>
      )}

      <div>
        {Object.keys(groupedWords).map((date) => (
          <div key={date}>
            <h3 className="date">{date}</h3>
            <div className="datecon">
              {groupedWords[date].map((word) => (
                <Word word={word} setWords={setWords} showWordsLinked={showWordsLinked} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllWords;
