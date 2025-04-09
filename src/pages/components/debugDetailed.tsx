import { Button, Form } from "react-bootstrap";
import { DetailedQuestionRecord } from "../DetailedQuestionsList";
import { useState } from "react";
import { DETAILED_QUESTIONS } from "../DetailedQuestionsList";

const USER_STRONG: DetailedQuestionRecord = {1: "I would win because I would beat both up them up because I am cooler and stronger and quicker than them and they kneel to me and stop fighting eachother.", 2: "I would break out because I am strong and then I would stop the trolley from hitting anyone because I'm quick and then everyone celebrates.", 3: "I wouldn't even go grab a weapon I'll use my fists and then I'll fight all the zombies and then I'll beat them all up and win against them and everyone will be safe.", 4: "", 5: "", 6: "", 7: ""};
Object.entries(USER_STRONG).map(([key, value]: [string, string], index: number): number => 
    {   
        delete USER_STRONG[key]
        USER_STRONG[DETAILED_QUESTIONS[index].instruction] = value

        return 0
    }) // so I don't have to copy the entire damn thing
const CHOICES: Record<string,DetailedQuestionRecord> = {"STRONG": USER_STRONG}


function DebugDetailed({setAnswers}:{setAnswers: (newAnswers: DetailedQuestionRecord) => void}){
    const [select, setSelect] = useState<string>("")
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>){
        setSelect(event.target.value)
        
    }
    

    return <div>
        <div><Form.Group controlId="debugDropDown">
            <Form.Label>How do you feel?</Form.Label>
            <Form.Select value={select} onChange={handleChange}>
                <option></option>
                <option value="STRONG">STRONG</option>
                    {/* <option value="EMPATHETIC">EMPATHETIC</option>
                    <option value="SOCIOPATH">SOCIOPATH</option> */}
                </Form.Select>
                </Form.Group>
        </div>
    <Button disabled={!select} onClick={() => setAnswers(CHOICES[select])}>DEBUG</Button>
    </div>
}
export default DebugDetailed 