import React, { useState } from 'react';
//import './BasicQuestionsPage.css';
import { Form } from 'react-bootstrap';
import { DetailedQuestionType , DetailedQuestionRecord} from "./DetailedQuestionsList"


function DetailedQuestion({question, allAnswers, setAnswers}:
    {question: DetailedQuestionType, allAnswers: DetailedQuestionRecord, setAnswers: (newAnswers: DetailedQuestionRecord) => void}){
    const [answer, setAnswer] = useState<string>("")
    return <div data-testid={"question"}>
    <Form.Group className='form'>
        <Form.Label> Question {question.id+1}: {question.instruction}</Form.Label>
        <Form.Control className='Input-Box' placeholder="Input Stuff Here!"
        as="textarea"
        rows={3}
        value={answer}
        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
            {
                if(event.target.value.length <= 250){
                    setAnswer(event.target.value)
                    const newAllAnswers:DetailedQuestionRecord = {...allAnswers, [question.id]: event.target.value}
                    setAnswers(newAllAnswers)
                }
            }} />
        <Form.Text>{answer.length}/250 characters remaining</Form.Text>
    </Form.Group>
    </div>
}
export default DetailedQuestion