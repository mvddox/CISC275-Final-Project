import React, { useState } from 'react';
import '../App.css';
import './Home.css';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { useAuth } from '../Auth';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}


function HomePage() {

  const [key, setKey] = useState<string>(keyData); //for api key input

  //sets the local storage item to the api key the user inputed
  
  function handleSubmit() {
  
  localStorage.setItem(saveKeyData, JSON.stringify(key));
  
  window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  
  }
  
  const authContext = useAuth();
  
  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
  
  setKey(event.target.value);
  
  }
  
  // for navigating between pages
  function NavigationButton() {
    const navigate = useNavigate();
    return (
      <div>
        <Button onClick={() => navigate("/Basic")}>
          Basic Question Page
        </Button>
      </div>
    );
  }
  //navigates to the detailed page button
  function NavigationDetailedButton() {
    const navigate = useNavigate();
    return (
      <div>
        <Button onClick={() => navigate("/Detail")}>
          Detailed Question Page
        </Button>
      </div>
    );
  }
  
  return (
  
    <div className="App-header">
      <div className="header-content"> 
      <h1>Discover Your Perfect Career Path: Take the Quiz!</h1>
      {authContext.isLoggedIn && <Button onClick={authContext.logout}>Logout</Button>}
      {!authContext.isLoggedIn && <Button onClick={authContext.login}>Login</Button>}
      </div>
      <div className="PagesButtons"> 
        <div><NavigationButton /> 
          <div className="ButtonDescription">Takes you to the "Basic Question Page" that includes multiple choice questions. Quicker than the "Detailed Question Page" but gives more general responses.</div>
        </div>
        <div><NavigationDetailedButton />
          <div className="ButtonDescription">Takes you to the "Detailed Question Page" that includes open-ended questions. Longer than the "Basic Question Page" but allows you to get more precise responses. </div>
        </div>
      </div>
      {authContext.isLoggedIn && <div className="LoggedButtons">
        <div><Button>Previous Results</Button></div>
        <div><Button>My Profile</Button></div>
      </div>} {/* Makes buttons disappear when not logged in */}
    
    <footer>
  
  <Form className='API'>
  
  <Form.Label>API Key:</Form.Label>
  
  <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey} />
  
  <br />
  
  <Button className="Submit-Button" onClick={handleSubmit}>
  
  Submit
  
  </Button>
  
  </Form>
  <div className='AuthorText'>Authors: Ethan Rigor, John Shaw, Elijah Jeudy, Maddox Florez
  </div>
  
  </footer>
  
  </div>)
  
  }
  
  
  
  export default HomePage;