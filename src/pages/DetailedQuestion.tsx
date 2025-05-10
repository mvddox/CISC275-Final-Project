import React from 'react';
//import './BasicQuestionsPage.css';
import { Form } from 'react-bootstrap';
import { DetailedQuestionType , DetailedQuestionRecord} from "./DetailedQuestionsList"


function DetailedQuestion({question, allAnswers, setAnswers}:
    {question: DetailedQuestionType, allAnswers: DetailedQuestionRecord, setAnswers: (newAnswers: DetailedQuestionRecord) => void}){
        // To prevent state wrapping
        let answer = allAnswers[question.instruction] ? allAnswers[question.instruction] : ""
        let answerLength = allAnswers[question.instruction] ? allAnswers[question.instruction].length : 0;
        //const [answer, setAnswer] = useState<string>(test) 
    return <div data-testid={"question"}>
    <Form.Group className='form'>
        <Form.Label className='form-label-detailed'> Question {question.id+1}: {question.instruction}</Form.Label>
        <Form.Control className='Input-Box' placeholder="Input Stuff Here!"
        as="textarea"
        rows={3}
        value={answer} // bandaid as seen here
        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
            {
                if(event.target.value.length <= 250){
                    //setAnswer(event.target.value)
                        const newAllAnswers:DetailedQuestionRecord = {...allAnswers, [question.instruction]: event.target.value}
                    if(event.target.value.length !== 0){
                        setAnswers(newAllAnswers)
                    }
                    else{
                        delete newAllAnswers[question.instruction]
                        setAnswers(newAllAnswers)
                    }
                }
            }} />
        <Form.Text>{answerLength}/250 characters remaining</Form.Text>
        {(answerLength) < 10 && <div>Needs {10 - (answerLength)} more characters</div>}
    </Form.Group>
    </div>
}
export default DetailedQuestion