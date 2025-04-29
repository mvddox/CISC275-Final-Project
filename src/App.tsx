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
import CurrentResultPage from './pages/CurrentResultPage';

function App() {
  
  const [videoStates, setVideoStates] = useState({
    subway: false,
    family: false,  
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
                            path="/CurrentResultPage"
                            element={<CurrentResultPage />}
                        />
                    </Routes>
                    </AIResultsProvider>
                </AuthProvider>
            </Router>
        </>
  );
}

export default App;
