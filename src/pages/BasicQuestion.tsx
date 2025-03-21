import React, { useState } from 'react';
import './BasicQuestionsPage.css';
import { Form } from 'react-bootstrap';
import { BasicQuestionType } from './BasicQuestionsList';

function BasicQuestion({question, allAnswers, setAnswers}: 
    { question : BasicQuestionType, allAnswers:string[], setAnswers: (newAnswers: string[])=> void}) {
    const [chosenAnswer, setChosenAnswer] = useState<string>("");
  return (
    <Form className="">
      Question {question.id+1}:
        <Form.Label>{question.instruction}</Form.Label>
        {question.answers.map( (answer: string, index: number)=>
        (<Form.Check
                type="radio"
                name="answers"
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                    {setChosenAnswer(event.target.value)
                    /* Collects selected answer to a list of all the answers
                     tracks each question by adding a label to the first part*/
                     setAnswers([...allAnswers.filter((answer: string): boolean => 
                        (question.id.toString() !== answer.slice(0,  question.id.toString().length))), question.id + "_" + event.target.value])
                    }}
                id={"Basic_" + question.id + "_" + index}
                label={answer}
                value={answer}
                checked={chosenAnswer === answer}
            />))
            }
    </Form>
  );
}

export default BasicQuestion;
