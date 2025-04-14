import React, { useState } from 'react';
import OpenAI from "openai";
import { DETAILED_QUESTIONS, DetailedQuestionRecord, DetailedQuestionType } from '../DetailedQuestionsList';
import { Button } from 'react-bootstrap';
import { keyData } from '../DetailedQuestionsPage';


function OpenAiComponent({DetailedResults}:
    {DetailedResults: DetailedQuestionRecord}){
    const [aiError, setAiError] = useState<string>("") // errors; when it catches an error, display error
    const [loading, setLoading] = useState<boolean>(false) //loading
    const [progress, setProgress] = useState<number>(0) //loading
    const [results, setResults] = useState<string[]>([]) // collection of all the results
    const [finalResult, setFinalResult] = useState<string>("") // used for final analysis
    const [finalSentence, setFinalSentence] = useState<string>("") // used for their final sentence
    const openai = new OpenAI({apiKey: keyData, dangerouslyAllowBrowser: true}) // because the user inputs in,

    async function startAi(){
        setLoading(true)
        let progress: number = 0;
        let responses: Promise<string>[] = Object.entries(DetailedResults).map(
            async ([instruction,answer]: [string ,string], index): Promise<string> => 
            {
                try{
                    if (index === 0){
                        const response = await openai.responses.create({
                            model: "gpt-4o",
                            input: [
                                {role: "system", content: instruction},
                                {role: "user", content: answer},
                                {role: "developer", content: "Based on the question, how would you define the user who answered?"}
                            ]
                        });
                        progress += 1
                        setProgress(progress)
                        return index + ": " + response.output_text
                        }
                    else{
                        const response = await openai.responses.create({
                            model: "gpt-4o",
                            input: [
                                {role: "system", content: instruction},
                                {role: "user", content: answer},
                                {role: "developer", content: "Based on the question, how would you define the user who answered?"}
                            ]
                        });
                        progress += 1
                        setProgress(progress)
                        return index + ": " + response.output_text
                    }
            }
                catch (e){
                    setAiError("It seems that there was an error.....")
                    console.error(e);
                    throw(e)
                }
            }
        )
        setResults([...await Promise.all(responses)]) 
        
        let finalResult:    Promise<string> = new Promise<string>((resolve, reject) => {
        });
        try{
            
                
                const response = await openai.responses.create({
                model: "gpt-4o",
                instructions: "refer to the person in the second tense",
                input: [
                    {   role: "developer",
                        content: "The questions are: " + Object.entries(DETAILED_QUESTIONS).map(([key,value]:[string,DetailedQuestionType], index)=> ""+ index +": " + value.instruction)
                    },
                    {   role: "developer",
                        content: "The user gave answers to those questions which you determined a result based on each respective question; these responses are:" + await responses.map((value)=>value)
                    },
                    {   role: "developer",
                        content: "Based on the results: How would you define the person as a whole?"
                    },
                ],
                temperature: 1.4 //1.5 and above breaks it to random characters
                });
                setFinalResult(response.output_text)
                finalResult = Promise.resolve(response.output_text)
            
        }
        catch (e){
            setAiError("It seems that there was an error.....")
            console.error(e);
            }
        // final sentence for the ultimate arbitration of the person's future
        try{
            const response = await openai.responses.create({
                model: "gpt-4o",
                store: true,
                input: [{role: "developer", content: "Based on the results' "+ await finalResult + " 'in one sentence what would their future career be?"}],
                temperature: 1.65
            });
            setFinalSentence(response.output_text)
            }
        catch (e){
            setAiError("It seems that there was an error.....")
            console.error(e);
        }
        setLoading(false)
    }
    return <div>
        <div hidden={!loading}>loading {progress}/{DETAILED_QUESTIONS.length}</div>
        {(!loading)  && (!aiError ? (<div ><div>results: {results.map((val)=><div>{val}</div>)}</div>
        <div>final results: {finalResult}</div>
        <div>final sentencing: {finalSentence}</div>
        </div>) : <div>{aiError}</div>)}
        <Button onClick={startAi}>
            generate response
        </Button>
    </div>
}
export default OpenAiComponent

