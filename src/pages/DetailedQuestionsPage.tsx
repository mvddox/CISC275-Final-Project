import React, { useState, useEffect } from 'react';
import { Button, Form, } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { DETAILED_QUESTIONS, DetailedQuestionRecord, DetailedQuestionType} from './DetailedQuestionsList';
import DetailedQuestion from './DetailedQuestion';
import "./DetailedQuestionsPage.css"
import QuestionProgressBar from './components/ProgressBar';
import OpenAiComponent from './components/DetailedOpenAiChapGPT';
import DebugDetailed from "./components/debugDetailed";
//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
export let keyData = "";
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

  const [debugMode, setDebugMode] = useState<boolean>(false) // for debug mode

  const [canGenerate, setCanGenerate] = useState<boolean>(false);


  const answeredQuestionsCount = Object.values(answers).reduce(
        (total: number, current: string): number=>{
          total += current.length < 10 ? current.length / 10 : 1
          return total;
        }, 0
      ); // count amount of complete answers based of the length of the answer. Maxes each amount of progress a question
      // could give by the fraction of the question against all questions
  const progress: number = (answeredQuestionsCount / DETAILED_QUESTIONS.length) * 100; // progress out of11

  useEffect(() => {
    if (progress === 100) {
      setCanGenerate(true);
    } else {
      setCanGenerate(false);
    }
  }, [progress]);

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
function NavigateToHomeButton(){
    const navigate = useNavigate();
    return (<div>
      Return home: {" "}
      <Button className='Header-Buttons-Detailed-button' onClick={() => navigate("/Home")}>
          Home Page
      </Button>
    </div>)
  }


  return (
    <div className="Detailed">
      <header className="Detailed-header">

        <div className='Detailed-header-title'>Detailed Questions</div>
        <div className="Header-Buttons-Detailed">
          <NavigationToBasic/>
          <NavigateToHomeButton/>
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
        <QuestionProgressBar progress={progress} />
        <Form.Check
          id="is-debug-check"
          label="DEBUG MODE?"
          checked={debugMode}
          onChange={(e)=>{setDebugMode(e.target.checked)}}
        />
        {debugMode && <DebugDetailed setAnswers={setAnswers}></DebugDetailed>}

        {(keyData) && <OpenAiComponent DetailedResults={answers} disabled={!canGenerate}></OpenAiComponent>}
      </div>
      

      <footer>
      <Form>
        <Form.Label htmlFor="api-key-input">API Key: </Form.Label>
        <Form.Control
         id="api-key-input" type="password" placeholder="Insert API Key Here" onChange={changeKey} ></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
      Authors: Ethan Rigor, John Shaw, Elijah Jeudy, Maddox Florez </footer>

    </div>
  );
}

export default DetailedQuestionsPage;