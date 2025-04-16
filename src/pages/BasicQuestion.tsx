import React, { useState } from 'react';
import './BasicQuestionsPage.css';
import { Form } from 'react-bootstrap';
import { BasicQuestionType, BasicAnswerRecord } from './BasicQuestionsList';


function BasicQuestion({question, allAnswers, setAnswers}: 
    { question : BasicQuestionType, allAnswers:BasicAnswerRecord, setAnswers: (newAnswers: BasicAnswerRecord)=> void}) {
    const [chosenAnswer, setChosenAnswer] = useState<string>("");
  return (
    <Form className="" data-testid={"question"}>
      Question {question.id+1}: {" "}
        <Form.Label>{question.instruction}</Form.Label>
        {question.answers.map( (answer: string, index: number)=>
        (<Form.Check
                type="radio"
                name="answers"
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                    {setChosenAnswer(event.target.value)
                     const newAllAnswers:BasicAnswerRecord = {...allAnswers, [question.instruction]: event.target.value}
                     setAnswers(newAllAnswers)
                    }}
                id={"Basic_" + question.id + "_" + index}
                label={answer}
                value={answer}
                key={"Basic_" + question.id + "_" + index}
                data-testid={"answer"}
                checked={chosenAnswer === answer}
            />))
            }
    </Form>
  );
}

export default BasicQuestion;
