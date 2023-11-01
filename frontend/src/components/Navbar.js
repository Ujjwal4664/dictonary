import React from 'react'
import {NavLink} from 'react-router-dom'
export const Navbar=()=>{
    return(
        <div className="navbar">
            <h3 id="logo">Dictonary</h3>
            <NavLink className="link" to='/saveWord'>
                Save Words
            </NavLink>
            <NavLink className="link" to='/savedWords'>
               Saved Words
            </NavLink>
            <NavLink className="link" to='/saveSentence'>
                Save Sentence
            </NavLink>
            <NavLink className="link" to='/savedSentence'>
                Saved Sentence
            </NavLink>
        </div>
    )
}