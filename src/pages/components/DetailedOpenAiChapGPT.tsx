import React, { useState } from 'react';
import OpenAI from "openai";
import { DETAILED_QUESTIONS, DetailedQuestionRecord, DetailedQuestionType } from '../DetailedQuestionsList';
import { Button } from 'react-bootstrap';
import { keyData } from '../DetailedQuestionsPage';
import './DetailedOpenAiChatGPT.css';


function OpenAiComponent({DetailedResults}:
    {DetailedResults: DetailedQuestionRecord}){
    const [aiError, setAiError] = useState<string>("") // errors; when it catches an error, display error
    const [loading, setLoading] = useState<boolean>(false) //loading
    const [results, setResults] = useState<string[]>([]) // collection of all the results
    const [finalResult, setFinalResult] = useState<string>("") // used for final analysis
    const [finalSentence, setFinalSentence] = useState<string>("") // used for their final sentence
    const [progressMessage, setProgressMessage] = useState<string>("")
    const openai = new OpenAI({apiKey: keyData, dangerouslyAllowBrowser: true}) // because the user inputs in,

    async function startAi(){
        setLoading(true)
        setProgressMessage("")
        let finishedQuestions: number = 0;
        let userResponses: Promise<string>[] = Object.entries(DetailedResults).map(
            async ([instruction,answer]: [string ,string], index): Promise<string> => 
            {
                try{
                    if (index === 0){
                        const response = await openai.responses.create({
                            model: "gpt-4o",
                            input: [
                                {role: "system", content: instruction},
                                {role: "user", content: answer},
                                {role: "developer", content: "Based on the question, in two sentences how would you define the user who answered?"}
                            ]
                        });
                        finishedQuestions += 1
                        setProgressMessage("Understanding individual questions:" + finishedQuestions +"/"+Object.keys(DetailedResults).length)
                        return index + ": " + response.output_text
                        }
                    else{
                        const response = await openai.responses.create({
                            model: "gpt-4o",
                            input: [
                                {role: "system", content: instruction},
                                {role: "user", content: answer},
                                {role: "developer", content: "Based on the question, in two or less sentences how would you define the user who answered?"}
                            ]
                        });
                        finishedQuestions += 1
                        setProgressMessage("Understanding individual questions:" + finishedQuestions +"/"+Object.keys(DetailedResults).length)
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
        setResults([...await Promise.all(userResponses)]) 
        
        let finalResult:    Promise<string> = new Promise<string>(() => {
        });
        try{
            
            await Promise.all(userResponses).then(async (userResponses)=>    
                {
                setProgressMessage("Judging character")
                console.log(userResponses)
                const response = await openai.responses.create({
                model: "gpt-4o",
                instructions: "use second tense",
                input: [
                    {   role: "developer",
                        content: "The questions are: " + Object.entries(DETAILED_QUESTIONS).map(([key,value]:[string,DetailedQuestionType], index)=> ""+ index +": " + value.instruction)
                    },
                    {   role: "developer",
                        content: "The user gave answers to those questions which you determined a result based on each corresponding question; these results are:" + userResponses.map((val)=>val)
                    },
                    {   role: "developer",
                        content: "Based on the results: How would you define the person as a whole?"
                    },
                ],
                temperature: 1.45 //1.5 and above breaks it to random characters
                });
                setFinalResult(response.output_text)
                finalResult = Promise.resolve(response.output_text)
                setProgressMessage("Arbitrating your final judgment")
            })
        }
        catch (e){
            setAiError("It seems that there was an error.....")
            console.error(e);
            }
        // final sentence for the ultimate arbitration of the person's future
        try{
            await finalResult.then(async (finalResult)=>{
                const response = await openai.responses.create({
                    model: "gpt-4o",
                    instructions: "",
                    input: [{role: "developer", content: "Based on the results' "+ finalResult + " 'in one sentence what would their future career be?"}],
                    temperature: 1.5
                });
                setFinalSentence(response.output_text)
            })
            }
        catch (e){
            setAiError("It seems that there was an error.....")
            console.error(e);
        }
        setLoading(false)
    }
    return <div className="ai-container">
        {loading && <span className={loading ? "loading" : ""}>Loading: {progressMessage}</span>}        
        <div className="results" hidden={true}>
        {results.join(", ")}
        </div>  
        <div className="final-result" hidden={loading || !finalResult}>
        {finalResult}
        </div>
        <div className="final-sentence" hidden={loading || !finalSentence}>
        {finalSentence}
        </div>
        {aiError && <div className="ai-error">{aiError}</div>}
        <div><Button className="ai-button" onClick={startAi}>
        Generate Response
        </Button></div>
    </div>
}
export default OpenAiComponent

/* 
<div className="results" hidden={loading || !results.length}>
        {results.join(", ")}
        </div> 
        TO UNHIDE RESULTS
        But we already have the final reuslt and Final sentence so I though it should be hidden.
*/
