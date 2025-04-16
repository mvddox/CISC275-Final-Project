//import React, { useState } from 'react';
import './App.css';
import './pages/BasicQuestionsPage'
import './pages/DetailedQuestionsPage'
import './pages/Home'
import './pages/PreviousResultsPage'
import { HashRouter as Router, Route, Routes,  } from "react-router";
import HomePage from './pages/Home';
import BasicQuestionPage from './pages/BasicQuestionsPage';
import DetailedQuestionPage from './pages/DetailedQuestionsPage'
import AuthProvider from './Auth';
import PreviousResultsPage from './pages/PreviousResultsPage';
import MyProfilePage from './pages/MyProfilePage';

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

  return (
    <>
            <Router>
                <AuthProvider>
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
                    </Routes>
                </AuthProvider>
            </Router>
        </>
  );
}

export default App;
