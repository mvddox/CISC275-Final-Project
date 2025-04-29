import { Button, Form } from "react-bootstrap";
import { BASIC_QUESTIONS, BasicAnswerRecord } from "../BasicQuestionsList";
import { useState } from "react";

function helperInstruction(user: BasicAnswerRecord){
    Object.entries(user).map(([key, value]: [string, string], index: number): number => 
        {   
            delete user[key]
            user[BASIC_QUESTIONS[index].instruction] = value
            return 0
        }) // so I don't have to copy the entire damn thing
}

const USER_STRONG: BasicAnswerRecord = {1: "Yes", 2: "Yes", 3: "Yes", 4: "Yes", 5: "Yes", 6: "Yes", 7: "Mayhaps", 8: "No", 9: "Years", 10: "My actions are utterly unclouded",  11: "I give the orders", 12: "PE", 13: "By action", 14: "There would be no reason otherwise", 15: "There needs to be a balance",  16: "So long it pays the bills", 17: "One could always achieve more", 18: "Contributing to large-scale projects in a team", 19: "Whenever work demands it", 20: "It is my duty to help in spite of the circumstances",  21: "To serve humanity"}

const CHOICES: Record<string,BasicAnswerRecord> = 
    {"STRONG": USER_STRONG}
Object.values(CHOICES).map((value)=>helperInstruction(value))

function DebugBasic({setAnswers}:{setAnswers: (newAnswers: BasicAnswerRecord)=> void}){
const [select, setSelect] = useState<string>("")
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>){
        setSelect(event.target.value)
        
    }
    return <div>
        <div><Form.Group controlId="debugDropDown">
            <Form.Label>DEBUG SELECT</Form.Label>
            <Form.Select value={select} onChange={handleChange}>
                <option></option>
                {Object.keys(CHOICES).map((key)=>(<option value={key} key={key}>{key}</option>))}
                </Form.Select>
                </Form.Group>
        </div>
    <Button disabled={!select} onClick={() => setAnswers(CHOICES[select])}>DEBUG</Button>
    {select}
    </div>
}
export default DebugBasic