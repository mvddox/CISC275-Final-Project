import React, { useState } from 'react';
import './App.css';
import './pages/BasicQuestionsPage'
import './pages/DetailedQuestionsPage'
import './pages/Home'
import './pages/PreviousResultsPage'
//import { Button } from 'react-bootstrap';
import { HashRouter as Router, Route, Routes,  } from "react-router";
import HomePage from './pages/Home';
import BasicQuestionPage from './pages/BasicQuestionsPage';
import DetailedQuestionPage from './pages/DetailedQuestionsPage'
import AuthProvider from './Auth';
import PreviousResultsPage from './pages/PreviousResultsPage';
import MyProfilePage from './pages/MyProfilePage';
import LoginPage from './pages/LoginPage';
import { Dropdown } from 'react-bootstrap';
import { AIResultsProvider } from './AIResultsContext';
import BasicResultsPage from './pages/BasicResultsPage';
import DetailedResultsPage from './pages/DetailedResultsPage';
//NOTE COMMENTED SO WE CAN COPY PASTE LATER IF NEEDED

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
// let keyData = "";
// const saveKeyData = "MYKEY";
// const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
// if (prevKey !== null) {
//   keyData = JSON.parse(prevKey);
// }


function App() {
  // const [key, setKey] = useState<string>(keyData); //for api key input
  
  // //sets the local storage item to the api key the user inputed
  // function handleSubmit() {
  //   localStorage.setItem(saveKeyData, JSON.stringify(key));
  //   window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  // }

  // //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  // function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
  //   setKey(event.target.value);
  // }
  const [videoStates, setVideoStates] = useState({
    subway: false,
    family: false,  
    minecraft: false,
  }); 


  
  const toggleVideo = (videoKey: keyof typeof videoStates) => {
    setVideoStates(prev => ({ ...prev, [videoKey]: !prev[videoKey] }));
  };
  
  return (
    <>
            <Router>
                <AuthProvider>
                    <AIResultsProvider>
                
                {videoStates.subway && (
  <video
    src={'Subway_Surfers.mp4'}
    loop
    autoPlay
    muted
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "180px",
      zIndex: 9999,
    }}
  />
)}

{videoStates.family && (
  <video 
    src={"Family_Guy.mp4"}
    loop 
    autoPlay
    muted
    style={{
      position: "fixed",
      bottom: "20px",
      right: videoStates.subway && videoStates.minecraft ? "440px" : videoStates.minecraft || videoStates.subway ? "220px" :"20px", // shift left if both shown      
      width: "180px",
      zIndex: 9999,
    }}
  />
)}
{videoStates.minecraft && (
  <video 
    src={"Minecraft_Parkour.mp4"}
    loop 
    autoPlay
    muted
    style={{
      position: "fixed",
      bottom: "20px",
      right: videoStates.subway ? "220px" : "20px", // shift left if both shown      
      width: "180px",
      zIndex: 9999,
    }}
  />
)}
<Dropdown style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}>
  <Dropdown.Toggle variant="primary" id="dropdown-video">
    Select Videos
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item as="button" onClick={() => toggleVideo("subway")}>
      <input
        type="checkbox"
        checked={videoStates.subway}
        readOnly
        style={{ marginRight: "10px" }}
      />
      Subway Surfers
    </Dropdown.Item>
    <Dropdown.Item as="button" onClick={() => toggleVideo("family")}>
      <input
        type="checkbox"
        checked={videoStates.family}
        readOnly
        style={{ marginRight: "10px" }}
      />
      Family Guy
    </Dropdown.Item>
    <Dropdown.Item as="button" onClick={() => toggleVideo("minecraft")}>
      <input
        type="checkbox"
        checked={videoStates.minecraft}
        readOnly
        style={{ marginRight: "10px" }}
      />
      Minecraft Parkour
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
                      
                    <Routes>
                        <Route
                            path="/Home"
                        
                            element={<HomePage />}
                        />
                        <Route
                            path="/"
                        
                            element={<HomePage />}
                        />
                        <Route
                            path="/Basic"
                            element={<BasicQuestionPage />}
                        />
                        <Route
                            path="/Detail"
                            element={<DetailedQuestionPage />}
                        />
                        <Route
                            path="/PreviousResults"
                            element={<PreviousResultsPage />}
                        />
                        <Route
                            path="/MyProfile"
                            element={<MyProfilePage />}
                        />
                        <Route
                            path="/Login"
                            element={<LoginPage />}
                        />
                        <Route
                            path="/BasicResultsPage"
                            element={<BasicResultsPage />}
                        />
                        <Route
                            path="/DetailedResultsPage"
                            element={<DetailedResultsPage />} 
                        />
                    </Routes>
                    </AIResultsProvider>
                </AuthProvider>
            </Router>
        </>
  );
}

export default App;
