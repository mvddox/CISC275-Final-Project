import React, { useState } from 'react';
import OpenAI from "openai";
import { DetailedQuestionRecord } from '../DetailedQuestionsList';
import { Button } from 'react-bootstrap';
import { keyData } from '../DetailedQuestionsPage';

function OpenAiComponent({key, DetailedResults}:
    {key: string, DetailedResults: DetailedQuestionRecord}){
    const [result, setResult] = useState<string>("") 
    //const [openai, setOpenai] = useState("")
    const openai = new OpenAI({apiKey: keyData, dangerouslyAllowBrowser: true})
    if(key)
    {}

    async function startAI(){
        try{
            const response = await openai.responses.create({
                model: "gpt-4o",
                input: "Write me a short story about a tomato."
            });
            
            setResult(response.output_text)
            }
            catch (e){
                setResult("fails")
                console.error(e);
            }
        }
        
                

    return <div>
        this exists:
        {result}
        <Button onClick={startAI}>
            generate dummy
        </Button>
    </div>
}


export default OpenAiComponent

