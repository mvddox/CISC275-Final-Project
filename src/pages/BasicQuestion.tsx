import React, { useState } from 'react';
import './BasicQuestionsPage.css';
import { Form } from 'react-bootstrap';
import { BasicQuestionType } from './BasicQuestionsList';



function BasicQuestion(question: BasicQuestionType) {
    const [chosenAnswer, setChosenAnswer] = useState<string>("");
  return (
    <Form className="">
        <Form.Label>{question.instruction}</Form.Label>
        {question.answers.map( ()=>
        (<Form.Check
                type="radio"
                name="answers"
                onChange={()=>setChosenAnswer}
                id={"Basic_" + question.id}
                label={question.answers}
                value={question.answers}
                checked={chosenAnswer === "happy"}
            />))
            }
    </Form>
  );
}

export default BasicQuestion;
