import React, { useState } from 'react';
import OpenAI from "openai";
import { DetailedQuestionRecord } from '../DetailedQuestionsList';
import { Button } from 'react-bootstrap';
import { keyData } from '../DetailedQuestionsPage';

function OpenAiComponent({DetailedResults}:
    {DetailedResults: DetailedQuestionRecord}){
    const [result, setResult] = useState<string>("") 
    const openai = new OpenAI({apiKey: keyData, dangerouslyAllowBrowser: true}) // because the user inputs in,
    
    async function startAI(){
        Object.entries(DetailedResults).map(async ([instruction,answer]: [string ,string]) => 
        {try{
            const response = await openai.responses.create({
                model: "gpt-4o",
                input: "Based on the question: '" + instruction +  "' How would you define a person who said " + answer +"?"
            });
            
            setResult(response.output_text)
            }
            catch (e){
                setResult("fails")
                console.error(e);
            }
        })
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

