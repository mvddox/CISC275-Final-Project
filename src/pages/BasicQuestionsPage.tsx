import React, { useState, useEffect } from 'react';
// note change to respective comps
// import logo from './logo.svg';
import './BasicQuestionsPage.css';
import { Button, Col, Container, Form, Row, } from 'react-bootstrap';
import { useNavigate } from "react-router";
import BasicQuestion from './BasicQuestion';
import { BasicQuestionType, BasicAnswerRecord, BASIC_QUESTIONS } from './BasicQuestionsList'
import QuestionProgressBar from './components/ProgressBar';
import OpenAiComponentB from './components/BasicOpenAiChapGPT';
import DebugBasic from './components/debugBasic';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
export let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}


const splitQuestions = (questions: BasicQuestionType[], max: number): BasicQuestionType[][] => {
  const fullQuestions: BasicQuestionType[] = [...questions]
  let currentSubQuestions: BasicQuestionType[] = []
  let splitQuestions: BasicQuestionType[][] = []
  splitQuestions = fullQuestions.reduce((total:BasicQuestionType[][], value:BasicQuestionType,
      index: number):BasicQuestionType[][]=>{
        if((index) % (fullQuestions.length/(fullQuestions.length/max)) < 1){
          if(index){total = [...total, [...currentSubQuestions]]}
          currentSubQuestions = []
        }
        currentSubQuestions = [...currentSubQuestions, value]
        if(index === fullQuestions.length -1){
          total = [...total, [...currentSubQuestions]]
        }
      return total
    }, [])
  return splitQuestions;
}

function BasicQuestionsPage() {
  const [answers, setAnswers] = useState<BasicAnswerRecord>({}) //for the answers of all questions collected
  const viewableQuestions: BasicQuestionType[][] = splitQuestions(BASIC_QUESTIONS, 8)
  const [viewedQuestionsCount, setViewedQuestionsCount] = useState<number>(0)
  const [viewedQuestions, setViewedQuestions] = useState<BasicQuestionType[]>([...viewableQuestions[viewedQuestionsCount]])
  const [key, setKey] = useState<string>(keyData); //for api key input
  const answeredQuestionCount : number = Object.keys(answers).length;  // question the user answered
  const progress: number = (answeredQuestionCount / BASIC_QUESTIONS.length) * 100;  //percent completed
  const [canGenerate, setCanGenerate] = useState<boolean>(false);

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

  // for navigating from the basic question page to the detailed question page
  function NavigateToDetailedButton(){
    const navigate = useNavigate();
    return (<div >
       {" "}
      <Button className="Button" onClick={() => navigate("/Detail")}>
          Detailed Question Page
      </Button>
    </div>)
  }

  // for navigating from the basic question page to the home page
function NavigateToHomeButton(){
    const navigate = useNavigate();
    return (<div >
       {" "}
      <Button  className="Button" onClick={() => navigate("/Home")}>
          Home Page
      </Button>
    </div>)
  }
/** to slice the big list of questions into many columns
 *@param {BasicQuestionType[]} questions : the BasicQuestionType array to be split up
 *@param {number} n: the height of each column
 *@returns an array of array of questions, that is the collection of split arrays
 */
  const questionCol = (questions: BasicQuestionType[], n: number) => {
    const col: BasicQuestionType[] = [...questions]
    let currCol: BasicQuestionType[] = []
    let cols: BasicQuestionType[][] = []
    cols = col.reduce((total:BasicQuestionType[][], value:BasicQuestionType,
        index: number):BasicQuestionType[][]=>{
          if((index) % (col.length/n) < 1){
            if(index){total = [...total, [...currCol]]}
            currCol = []
          }
          currCol = [...currCol, value]
          if(index === col.length -1){
            total = [...total, [...currCol]]
          }
        return total
      }, [])
    return cols;
  }; return (
    <div className="Basic">
      <header className="Basic-header">
        <div className="Basic-header-title">Basic Questions</div>
        <div className="Header-Buttons-Basic">
          <NavigateToDetailedButton />
          <NavigateToHomeButton />
        </div>
      </header>
  
      <div className="Basic-Body">
        {/* Questions grid */}
        <Container>
          {questionCol([...BASIC_QUESTIONS], BASIC_QUESTIONS.length / 2).map((row, i) => (
            <Row key={i} className='Basic-Question-Row'>
              {row.map((col, j) => (
                <Col
                  key={j}
                  hidden={!viewedQuestions.find((x) => x.id === col.id)}
                  className="Basic-Question"
                >
                  <BasicQuestion
                    question={{ ...col }}
                    allAnswers={answers}
                    setAnswers={setAnswers}
                    key={col.id}
                  />
                </Col>
              ))}
            </Row>
          ))}
        </Container>
  {/* Pagination buttons */}
  <div className="button-row">
          <Button
            className="Header-Buttons-Basic-button"
            disabled={viewedQuestionsCount === 0}
            onClick={() => {
              setViewedQuestions([...viewableQuestions[viewedQuestionsCount - 1]]);
              setViewedQuestionsCount(viewedQuestionsCount - 1);
            }}
          >
            Previous
          </Button>
  
          <Button
            className="Header-Buttons-Basic-button"
            disabled={viewedQuestionsCount === viewableQuestions.length - 1}
            onClick={() => {
              setViewedQuestions([...viewableQuestions[viewedQuestionsCount + 1]]);
              setViewedQuestionsCount(viewedQuestionsCount + 1);
            }}
          >
            Next
          </Button>
        </div>
        {/* Group progress bar and generate button together below questions */}
        <div className="progress-button-wrapper">
        <QuestionProgressBar progress={progress}  />

          {(keyData) && <OpenAiComponentB BasicResults={answers} disabled={!canGenerate} />}
        </div>
  
         
  
        <DebugBasic setAnswers={setAnswers} />
  
        <footer className="api-key-form-container" >
          <Form>
            <Form.Label>API Key:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Insert API Key Here"
              onChange={changeKey}
              value={key}
            />
            <br />
            <Button className="Submit-Button" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
          Authors: Ethan Rigor, John Shaw, Elijah Jeudy, Maddox Florez
        </footer>
      </div>
    </div>
  );
  
} export default BasicQuestionsPage;