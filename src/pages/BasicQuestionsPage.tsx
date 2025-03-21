import React, { useState } from 'react';
// note change to respective comps
// import logo from './logo.svg';
import './BasicQuestionsPage.css';
import { Button, Form, } from 'react-bootstrap';
import { useNavigate } from "react-router";
import BasicQuestion from './BasicQuestion';
import { BasicQuestionType, QUESTIONS } from './BasicQuestionsList'

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}


function BasicQuestionsPage() {
  const [answers, setAnswers] = useState<string[]>([])
  const [clickedResults, setClickedResults] = useState<boolean>(false)
  const [key, setKey] = useState<string>(keyData); //for api key input

  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }


  // for navigating between pages
function NavigationButton(){
    const navigate = useNavigate();
    return (<div>
      Return home? {" "}
      <Button onClick={() => navigate("/Home")}>
          Click Here
      </Button>
    </div>)
  }


  return (
    <div className="Basic">
      <header className="Basic-header">
        Basic 
        <NavigationButton/>
      </header>
      <div className="Basic-Body">
      {QUESTIONS.map((x: BasicQuestionType, i: number)=>
        (<span> Question {i+1}: <BasicQuestion question={{...x}} allAnswers={answers} setAnswers={setAnswers}></BasicQuestion></span>))}
      </div>
      <div><Button onClick={()=>{setClickedResults(!clickedResults)}}>
        Show results</Button>{clickedResults && <span>Your results are 
          {answers.map((x: string)=> x + ", ")}</span>}</div>
      <footer>
      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
      Authors: Ethan Rigor, John Shaw, Elijah Jeudy, Maddox Florez </footer>
    </div>
  );
}

export default BasicQuestionsPage;
