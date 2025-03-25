import React, { useState } from 'react';
//import './BasicQuestionsPage.css';
import { Form } from 'react-bootstrap';
import { DetailedQuestionType , DetailedQuestionRecord} from "./DetailedQuestionsList"


function DetailedQuestion({question, allAnswers, setAnswers}:
    {question: DetailedQuestionType, allAnswers: DetailedQuestionRecord, setAnswers: (newAnswers: DetailedQuestionRecord) => void}){
    const [answer, setAnswer] = useState<string>("")
    return <div>
    <Form.Group>
        <Form.Label> Question {question.id}: {question.instruction}</Form.Label>
        <Form.Control placeholder="Input Stuff Here!"
        as="textarea"
        rows={3}
        value={answer}
        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
            {
                if(event.target.value.length <= 500){
                    setAnswer(event.target.value)
                    const newAllAnswers:DetailedQuestionRecord = {...allAnswers, [question.id]: event.target.value}
                    setAnswers(newAllAnswers)
                }
            }} />
        <Form.Text>{answer.length}/500 characters remaining</Form.Text>
    </Form.Group>
    </div>
}
export default DetailedQuestion