import React, { useState } from 'react';
// note change to respective comps
// import logo from './logo.svg';
import './BasicQuestionsPage.css';
import { Button, Col, Container, Form, Row, } from 'react-bootstrap';
import { useNavigate } from "react-router";
import BasicQuestion from './BasicQuestion';
import { BasicQuestionType, AnswerRecord, QUESTIONS } from './BasicQuestionsList'

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
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
  const [answers, setAnswers] = useState<AnswerRecord>({}) //for the answers of all questions collected
  const givenAnswers: string = 
      Object.entries(answers).map(([id,answer]: [string ,string]) => ("["+id+", "+answer+"]")).join(", ")
      const viewableQuestions: BasicQuestionType[][] = splitQuestions(QUESTIONS, 8)
  const [viewedQuestionsCount, setViewedQuestionsCount] = useState<number>(0)
  const [viewedQuestions, setViewedQuestions] = useState<BasicQuestionType[]>([...viewableQuestions[viewedQuestionsCount]])
  const [clickedResults, setClickedResults] = useState<boolean>(false) //for seeing the results after button click
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
  };

  


  return (
    <div className="Basic">
      <header className="Basic-header">
        Basic 
        <NavigationButton/>
      </header>
      <div className="Basic-Body">
        <Container>
          {/*Important to make a grid structure of the questions.
          Second argument of questionCol gives height of each col*/}
      {questionCol([...QUESTIONS], QUESTIONS.length / 2).map((row:BasicQuestionType[], i:number) => (
        <Row key={i}>
          {row.map((col, j) => (
            /** All the questions ARE rendered so that they remain 
             * persistant between movement between visibility */
              <Col key={j} hidden={ !viewedQuestions.find((x):boolean=> x.id===col.id)}>
                <BasicQuestion question={{...col}} allAnswers={answers} setAnswers={setAnswers }
                  key={col.id}></BasicQuestion>
              </Col>
          ))}
        </Row>
      ))}
      </Container>
      </div>
      {/* <div>test: {viewedQuestionsCount+" " +  viewedQuestions.map((x)=>{return x.id}) + ""
      //viewableQuestions.map((x)=>{return "["+x.map((y)=>{return y.id})+"]"})
      }
      </div> */}
      <div><Button disabled={viewedQuestionsCount === 0} onClick={()=>
        {
          // IMPORTANT NOTE: setViewedQuestionsCount has to be AFTER setViewedQuestions to be rendered
          // properly. This is because everything renders AFTER the entire function has finished
          setViewedQuestions([...viewableQuestions[viewedQuestionsCount-1]])
          setViewedQuestionsCount(viewedQuestionsCount-1)
        }}>
      prev</Button> 
      <Button disabled={viewedQuestionsCount === viewableQuestions.length-1} onClick={()=>
      {
        setViewedQuestions([...viewableQuestions[viewedQuestionsCount+1]])
        setViewedQuestionsCount(viewedQuestionsCount+1)
      }}>
      next</Button> 
      <Button onClick={()=>{setClickedResults(!clickedResults)}}>
        Show results</Button>{clickedResults && <span>Your results are 
          {" " +givenAnswers}</span>}</div>
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
