import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {AddWord} from "./pages/AddWord"
import {AllWords} from "./pages/AllWords"
import {AddSentence} from "./pages/AddSentence"
import {AllSentence} from "./pages/AllSentence"
import {Navbar} from "./components/Navbar"
function App() {
  return (
    <div className="App">
     
      <Router>
        <Navbar/>
        <div id="background"></div>
        <Routes>
          <Route path="/saveWord" element={<AddWord/>}/>
          <Route path="/savedWords" element={<AllWords/>}/>
          <Route path="/saveSentence" element={ <AddSentence/>}/>
          <Route path="/savedSentence" element={<AllSentence/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
