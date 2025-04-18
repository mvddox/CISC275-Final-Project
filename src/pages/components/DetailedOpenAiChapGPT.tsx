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
    const [finalDeclaredFuture, setFinalDeclaredFuture] = useState<string>("") // final phasse
    const [finalCareer, setFinalCareer] = useState<string>("") // final career
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
        try{
            
            await Promise.all(userResponses).then(async (userResponses)=>    
                {
                setProgressMessage("Arbitrating your final judgment")
                console.log(userResponses)
                const response = await openai.responses.create({
                model: "gpt-4o",
                instructions: "use second tense",
                input: [
                    {   role: "developer",
                        content: "The questions are: " + DETAILED_QUESTIONS.map((value:DetailedQuestionType, index)=> ""+ index +": " + value.instruction)
                    },
                    {   role: "developer",
                        content: "The user gave answers to those questions which you determined a result based on each corresponding question; these results are:" + userResponses.map((val)=>val)
                    },
                    {   role: "developer",
                        content: "Based on the results: in a many sentences how would you define the person as a whole?"
                        + "In one sentence, how would you report their future?"
                        + "In one phrase, what is their future?"
                        + "what is their future job?"
                    },
                ],
                temperature: 1.40, //1.5 and above breaks it to random characters
                text: {
                    format: {
                      type: "json_schema",
                      name: "total_result_arbitration",
                      schema: {
                        type: "object",
                        properties: {
                          user_definition: { 
                            type: "string" 
                          },
                          final_sentence: { 
                            type: "string" 
                          },
                          future_phrase: { 
                            type: "string", 
                          },
                          future_career: { 
                            type: "string", 
                          },
                        },
                        required: ["user_definition", "final_sentence", "future_phrase", "future_career"],
                        additionalProperties: false,
                      },
                    }
                  }
                });
                setFinalResult(JSON.parse(response.output_text).user_definition)
                setFinalSentence(JSON.parse(response.output_text).final_sentence)
                setFinalDeclaredFuture(JSON.parse(response.output_text).future_phrase)
                setFinalCareer(JSON.parse(response.output_text).future_career)
                console.log(response.usage)
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
        <div className="final-career" hidden={loading || !finalResult}>
        {finalDeclaredFuture +"—"+ finalCareer}
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
        <div className="ai-disclaimer" hidden={loading || !finalSentence}>
        Generated by AI: All choices are yours, and the future is ultimately in your hands. Not responsible for any user damages.
        </div>
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
