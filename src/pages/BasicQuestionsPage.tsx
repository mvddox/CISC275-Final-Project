import React, { useState } from 'react';
// note change to respective comps
// import logo from './logo.svg';
import './BasicQuestionsPage.css';
import { Button, Col, Container, Form, Row, } from 'react-bootstrap';
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
  const [answers, setAnswers] = useState<string[]>([]) //for the answers of all questions collected
  const givenAnswers: string = answers.join(", ") 
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
  };
  console.log(questionCol(QUESTIONS,2))
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
              <Col key={j}>
                <BasicQuestion question={{...col}} allAnswers={answers} setAnswers={setAnswers }
                  key={col.id}></BasicQuestion>
              </Col>
          ))}
        </Row>
      ))}
      </Container>
      </div>
      <div><Button onClick={()=>{setClickedResults(!clickedResults)}}>
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
