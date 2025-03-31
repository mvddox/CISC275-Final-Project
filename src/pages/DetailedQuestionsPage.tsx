import React, { useState } from 'react';
import { Button, Form, } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { DETAILED_QUESTIONS, DetailedQuestionRecord, DetailedQuestionType} from './DetailedQuestionsList';
import DetailedQuestion from './DetailedQuestion';
import "./DetailedQuestionsPage.css"

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}


function DetailedQuestionsPage() {
  const [viewedQuestion, setViewedQuestion] = useState<number>(0) //index of which question to view
  const [answers, setAnswers] = useState<DetailedQuestionRecord>({}) //collects all the user inputed answers into a record based on id
  const givenAnswers: string = 
      Object.entries(answers).map(([id,answer]: [string ,string]) => ("["+id+", "+answer+"]")).join(", ") //converts record to string for debugging
  const [clickedResults, setClickedResults] = useState<boolean>(false) //tracks if user clicked on results
  const [key, setKey] = useState<string>(keyData); //for api key input

  const answeredQuestionsCount = Object.keys(answers).length; // count amount of answer user inputed
  const progress: number = (answeredQuestionsCount / DETAILED_QUESTIONS.length) * 100; // progress out of11

      // outside red bar
      const containerStyle = {
        width: "100%",
        backgroundColor: "red",
        borderRadius: "20px",
        height: "5vh"
      };
      //green bar that covers up red bar
      const progressBarStyles = {
        width: `${progress}%`,
        backgroundColor: "green",
        height: "5vh",
        borderRadius: "20px",
        justifyContent: "flex-end",
        fontWeight: 'bold',
        alignItems: 'center',
        display: 'flex',
        
      };
      // function that created the progess bar
      function ProgressBar({ progress }: { progress: number }) {
        return (
          <div style={containerStyle}>
            <div style={progressBarStyles}>{Math.round(progress)}% &nbsp;</div>
          </div>
        );
      }

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }


  // Navigates to the basic questions page
  function NavigationToBasic(){
    const navigate = useNavigate();
    return (<div>
      Go to Basic Question Page: {" "}
      <Button className='Header-Buttons-Detailed-button' onClick={() => navigate("/Basic")}>
          Basic Question Page
      </Button>
    </div>)
  }

  // Navigates Back to Home Page
function NavigationButton(){
    const navigate = useNavigate();
    return (<div>
      Return home: {" "}
      <Button className='Header-Buttons-Detailed-button' onClick={() => navigate("/Home")}>
          Home Page
      </Button>
    </div>)
  }

  
  return (
    <div className="Detail">
      <header className="Detailed-header">

        <div className='Detailed-header-title'>Detailed Questions</div>
        <div className="Header-Buttons-Detailed">
          <NavigationToBasic/>
          <NavigationButton/>
        </div>
      </header>
      <div className='Detailed-Body'>
        {/* maps every question into the document but hides the undesirable ones */}
        {DETAILED_QUESTIONS.map((question: DetailedQuestionType)=>
          <div hidden={question.id !== viewedQuestion} key={question.id}>
            {/* NOTE: cannot pass anything in between the html elements or it gives an error */}
            <DetailedQuestion question={{...question}} allAnswers={answers} setAnswers={setAnswers}></DetailedQuestion></div>)}
      </div>
      <div className='button-row'>
        <Button className='Header-Buttons-Detailed-button' disabled={viewedQuestion === 0} onClick={()=> (setViewedQuestion(viewedQuestion-1))}>
        Previous</Button>
        <Button className='Header-Buttons-Detailed-button' disabled={DETAILED_QUESTIONS.length - 1 === 
          viewedQuestion}onClick={()=> (setViewedQuestion(viewedQuestion+1))}>
        Next</Button>
        <Button className='Header-Buttons-Detailed-button' onClick={()=>setClickedResults(!clickedResults)}>Show Results</Button> {clickedResults && <span>Your results are 
          {" " + givenAnswers}</span>}
      </div>
      <div className ='Detailed-Body'> 
      <ProgressBar progress={progress} />
      </div>
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

export default DetailedQuestionsPage