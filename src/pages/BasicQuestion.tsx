import React, { useState } from 'react';
import './BasicQuestionsPage.css';
import { Form } from 'react-bootstrap';
import { BasicQuestionType } from './BasicQuestionsList';

function BasicQuestion(question: BasicQuestionType) {
    const [chosenAnswer, setChosenAnswer] = useState<string>("");
  return (
    <Form className="">
        <Form.Check
                type="radio"
                name="emotions"
                onChange={()=>setChosenAnswer}
                id={"Basic_" + question.id}
                label="Happy"
                value="happy"
                checked={chosenAnswer === "happy"}
            />
    </Form>
  );
}

export default BasicQuestion;
