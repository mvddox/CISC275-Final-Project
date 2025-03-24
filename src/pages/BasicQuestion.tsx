import React, { useState } from 'react';
import './BasicQuestionsPage.css';
import { Form } from 'react-bootstrap';
import { BasicQuestionType, AnswerRecord } from './BasicQuestionsList';


function BasicQuestion({question, allAnswers, setAnswers}: 
    {      question : BasicQuestionType, allAnswers:AnswerRecord, setAnswers: (newAnswers: AnswerRecord)=> void}) {
    const [chosenAnswer, setChosenAnswer] = useState<string>("");
  return (
    <Form className="" data-testid={"question"}>
      Question {question.id+1}:
        <Form.Label>{question.instruction}</Form.Label>
        {question.answers.map( (answer: string, index: number)=>
        (<Form.Check
                type="radio"
                name="answers"
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                    {setChosenAnswer(event.target.value)
                    /* Collects selected answer to a list of all the answers
                     tracks each question by adding a label to the first part
                     example 0_PlaceholderAnswer1*/
                     const newAllAnswers:AnswerRecord = {...allAnswers, [question.id]: event.target.value}
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
