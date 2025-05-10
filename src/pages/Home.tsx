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
  
  const navigate = useNavigate();

  // for navigating between pages
  function NavigateToBasicButton() {
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
    return (
      <div>
        <Button onClick={() => navigate("/Detail")}>
          Detailed Question Page
        </Button>
      </div>
    );
  }

  function NavigateToLoginButton() {
    return (
      <div>
        <Button onClick={() => navigate("/Login")}>
          Login/Create Account
        </Button>
      </div>
    );
  }

  return (
  
    <div className="App-header">
      <div className="header-content"> 
        
      <h1>Discover Your Perfect Career Path: Take the Quiz! 
      {authContext.isLoggedIn && <div>Welcome {authContext.username}!</div>}

      </h1>
      
      <div className='LoginCreateButton'>
        {authContext.isLoggedIn && <Button onClick={authContext.logout}>Logout</Button>}
        {!authContext.isLoggedIn && <NavigateToLoginButton/>}
      </div>
      </div>
      <div className="PagesButtonsContainter"> 
        <div className="PagesButtons">
          <div className="PagesButtonsLabel">Basic Question</div>
          <div className="ButtonDescription">Takes you to the "Basic Question Page" - a quicker quiz with multiple-choice questions for more general responses.</div>
          <NavigateToBasicButton /> 
        </div>
        <div className="PagesButtons">
          <div className="PagesButtonsLabel">Detailed Question</div>
          <div className="ButtonDescription">Takes you to the "Detailed Question Page" – a longer quiz with open-ended questions for more precise responses.</div>
          <NavigationDetailedButton />
        </div>
      </div>
      {authContext.isLoggedIn && <div className="LoggedButtons">
        <div><Button onClick={() => navigate("/PreviousResults")}>Previous Results</Button></div>
        <div><Button onClick={() => navigate("/MyProfile")}>My Profile</Button></div>
      </div>}
    
    <footer>
  
  <Form className='API'>
  
  <Form.Label className={"PagesButtonsLabel"}>API Key:</Form.Label>
  
  <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey} />
  
  <br />
  
  <Button className="Submit-Button" onClick={handleSubmit}>
  
  Submit
  
  </Button>
  
  </Form>
 
 


  </footer>
  <div className='AuthorText'> <br></br>
  </div>  
  </div>)
  
  }
  
  
  
  export default HomePage;