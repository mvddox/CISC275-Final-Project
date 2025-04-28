import React, { useState } from 'react';
import OpenAI from "openai";
import { BASIC_QUESTIONS, BasicAnswerRecord, BasicQuestionType } from '../BasicQuestionsList';
import { Button } from 'react-bootstrap';
import { keyData } from '../BasicQuestionsPage';
import './BasicOpenAiChatGPT.css';
import { useNavigate } from "react-router-dom";
import { useAIResults } from '../../AIResultsContext';
import { Account } from '../LoginPage';
import { useAuth } from '../../Auth';
interface OpenAiComponentBProps {
    BasicResults: BasicAnswerRecord;
    disabled?: boolean; // Add the disabled prop here (optional)
}

function OpenAiComponentB({ BasicResults, disabled }: OpenAiComponentBProps) {
    const [aiError, setAiError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState<string[]>([]);
    const [finalResult, setFinalResult] = useState<string>("");
    const [progressMessage, setProgressMessage] = useState<string>("");
    const [finalSentence, setFinalSentence] = useState<string>("") // used for their final sentence
    const [finalDeclaredFuture, setFinalDeclaredFuture] = useState<string>("") // final phasse
    const [finalCareer, setFinalCareer] = useState<string>("") // final career
    const [colorVibe, setColorVibe] = useState<string>("")

    const openai = new OpenAI({ apiKey: keyData, dangerouslyAllowBrowser: true });
    
    const navigate = useNavigate();

    const result = useAIResults();
    const authContext = useAuth();

    async function startAi(){
            setLoading(true)
            setProgressMessage("")
            setResults([]);
            setFinalResult("");
            setFinalSentence("");
            setAiError("");
    
    
            let finishedQuestions: number = 0;
            let userResponses: Promise<string>[] = Object.entries(BasicResults).map(
                async ([instruction,answer]: [string ,string], index): Promise<string> => 
                {
                    try{
                        if (index === 0){
                            const response = await openai.responses.create({
                                model: "gpt-4o",
                                instructions: "use second tense",
                                input: [
                                    {role: "system", content: instruction},
                                    {role: "user", content: answer},
                                    {role: "developer", content: "Based on the question, in two sentences how would you define the user who answered?"}
                                ]
                            });
                            finishedQuestions += 1
                            setProgressMessage("Understanding individual questions:" + finishedQuestions +"/"+Object.keys(BasicResults).length)
                            return (index +1)+ ": " + response.output_text
                            }
                        else{
                            const response = await openai.responses.create({
                                model: "gpt-4o",
                                instructions: "use second tense",
                                input: [
                                    {role: "system", content: instruction},
                                    {role: "user", content: answer},
                                    {role: "developer", content: "Based on the question, in two or less sentences how would you define the user who answered?"}
                                ]
                            });
                            finishedQuestions += 1
                            setProgressMessage("Understanding individual questions:" + finishedQuestions +"/"+Object.keys(BasicResults).length)
                            return (index + 1) + ": " + response.output_text
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
                    setProgressMessage("Arbitrating your final judgment...")
                    const response = await openai.responses.create({
                    model: "gpt-4o",
                    instructions: "use second tense",
                    input: [
                        {   role: "developer",
                            content: "The questions are: " + BASIC_QUESTIONS.map((value:BasicQuestionType, index)=> ""+ index +": " + value.instruction)
                        },
                        {   role: "developer",
                            content: "The user gave answers to those questions which you determined a result based on each corresponding question; these results are:" + userResponses.map((val)=>val)
                        },
                        {   role: "developer",
                            content: "Based on the results: in a many sentences how would you define the person as a whole? "
                            + "In one sentence, how would you report their future? "
                            + "In one 'Touhou song name'-esque phrase, what is their future? Make sure to include the little note chararcters; no names."
                            + "In one simple phrase, what is their future job?"
                            + "what is the hexidecimal color based on vibes?"
                        },
                    ],
                    temperature: 1.2, //1.5 and above breaks it to random characters
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
                              touhou_future_phrase: { 
                                type: "string", 
                              },
                              future_career: { 
                                type: "string", 
                              },
                              color_vibe: { 
                                type: "string", 
                              },
                            },
                            required: ["user_definition", "final_sentence", "touhou_future_phrase", "future_career", "color_vibe"],
                            additionalProperties: false,
                          },
                        }
                      }
                    });
                    setFinalResult(JSON.parse(response.output_text).user_definition)
                    setFinalSentence(JSON.parse(response.output_text).final_sentence)
                    setFinalDeclaredFuture(JSON.parse(response.output_text).touhou_future_phrase)
                    setFinalCareer(JSON.parse(response.output_text).future_career)
                    setColorVibe(JSON.parse(response.output_text).color_vibe)
                    console.log(response.usage)
    
                    result.setFinalResult(JSON.parse(response.output_text).user_definition);
                    result.setFinalSentence(JSON.parse(response.output_text).final_sentence);
                    result.setResults(userResponses)
                    result.setFinalDeclaredFuture(JSON.parse(response.output_text).touhou_future_phrase)
                    result.setFinalCareer(JSON.parse(response.output_text).future_career)
                    result.setColorVibe(JSON.parse(response.output_text).color_vibe)
                    let newResult = {...result};
                    let storedAcount: Account = JSON.parse(localStorage.getItem(authContext.username) || "{}")
                    if (storedAcount.prevResults){
                      storedAcount.prevResults = [...storedAcount.prevResults, { ...newResult,
                        finalResult: JSON.parse(response.output_text).user_definition,
                        finalSentence: JSON.parse(response.output_text).final_sentence,
                        results: [...userResponses],
                        finalCareer: JSON.parse(response.output_text).future_career, 
                        finalDeclaredFuture:JSON.parse(response.output_text).touhou_future_phrase,
                        colorVibe:JSON.parse(response.output_text).color_vibe,}]
                      localStorage.setItem(authContext.username, JSON.stringify(storedAcount));
                    }
                })
            }
            catch (e){
                setAiError("It seems that there was an error.....")
                console.error(e);
                }
            setLoading(false)
        }
    

    return (
        <div className="ai-container">
            <div className={loading ? "loading" : ""}>
                {loading && "Loading..."}
            </div>
            <div className="results" hidden={loading || !results.length}>
                {results.join(", ")}
            </div>
            <div className="final-result" hidden={loading || !finalResult}>
                {finalResult}
            </div>
            {aiError && <div className="ai-error">{aiError}</div>}
            <Button className="ai-button" onClick={startAi} disabled={disabled}>
                Generate Response
            </Button>
            {disabled && <p className="disabled-message">Please answer all basic questions to enable a response.</p>}
        </div>
    );
}

export default OpenAiComponentB;