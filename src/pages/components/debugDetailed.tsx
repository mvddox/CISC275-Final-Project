import { Button, Form } from "react-bootstrap";
import { DetailedQuestionRecord } from "../DetailedQuestionsList";
import { useState } from "react";
import { DETAILED_QUESTIONS } from "../DetailedQuestionsList";

function helperInstruction(user: DetailedQuestionRecord){
    Object.entries(user).map(([key, value]: [string, string], index: number): number => 
        {   
            delete user[key]
            user[DETAILED_QUESTIONS[index].instruction] = value
            return 0
        }) // so I don't have to copy the entire damn thing
}


const USER_STRONG: DetailedQuestionRecord = {1: "I would win because I would beat both up them up because I am cooler and stronger and quicker than them and they kneel to me and stop fighting eachother.", 2: "I would break out because I am strong and then I would stop the trolley from hitting anyone because I'm quick and then everyone celebrates.", 3: "I wouldn't even go grab a weapon I'll use my fists and then I'll fight all the zombies and then I'll beat them all up and win against them and everyone will be safe.", 4: "I would put them in the front pocket of my shirt so they could see the world with me and they would be safe and protected by me and I would build them a shelter for them to sleep in with many stuffies for them to play with ", 5: "I live even without a career because I think that living is more important than a career", 6: "I would not because I love my child and I wish them the best and I would support them and I would give them all the attention they need so they don't feel lonely and they feel appreciated instead.", 7: "I don't know but I like to keep existing so that I could help and protect others and make them all happy and so that we would all live in a world where we can sit and eat dinner together"};
const USER_SOCIOPATH: DetailedQuestionRecord = {1: "A man with everything on the line is more likely to be desperate and thus fight dirty to get whatever they want.", 2: "No matter what, I will never be able to have the true experience of them. I will never feel what they feel, or know what they know. From one to an infite amount, I would pull the lever.", 3: "I will become the law, as the law is only as strong as the force that stands behind it. With a zombie apocolypse, I will become a savior of my own creation, for my own will.", 4: "That worm is not my partner anymore; it is a worm. It is better of dead, and that's what my chosen partner would do, any way.",5: "Both my life and career are servants to me.", 6: "My parents missed my recital. So should I.", 7: "I see the universe as I see it. All acts belong to me, all existance depends on me, so long that I am alive. Therefore, I do as I please, because what pleases me is what fufills me."}
const USER_REPEATED: DetailedQuestionRecord = {1: "I AM GOD HERE", 2: "I AM GOD HERE", 3: "I AM GOD HERE", 4: "I AM GOD HERE",5: "I AM GOD HERE", 6: "I AM GOD HERE", 7: "I AM GOD HERE"}



const CHOICES: Record<string,DetailedQuestionRecord> = 
    {"STRONG": USER_STRONG, "SOCIOPATH": USER_SOCIOPATH, "REPEATED": USER_REPEATED}
Object.values(CHOICES).map((value)=>helperInstruction(value))

function DebugDetailed({setAnswers}:{setAnswers: (newAnswers: DetailedQuestionRecord) => void}){
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
export default DebugDetailed 