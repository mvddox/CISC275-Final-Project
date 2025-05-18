import React, { useState } from 'react';
import OpenAI from "openai";
import { DETAILED_QUESTIONS, DetailedQuestionRecord, DetailedQuestionType } from '../DetailedQuestionsList';
import { Button } from 'react-bootstrap';
import { keyData } from '../DetailedQuestionsPage';
import './DetailedOpenAiChatGPT.css';
import { useAIResults } from '../../AIResultsContext';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Auth';
import { Account } from '../LoginPage';
import { DetailedResultType, resultValues } from './PreviousResult';
import ValueBars from './valueBars';



function OpenAiComponent({DetailedResults, disabled}:
    {DetailedResults: DetailedQuestionRecord, disabled: boolean}){
    const [aiError, setAiError] = useState<string>("") // errors; when it catches an error, display error
    const [loading, setLoading] = useState<boolean>(false) //loading
    const [results, setResults] = useState<string[]>([]) // collection of all the results
    const [finalResult, setFinalResult] = useState<string>("") // used for final analysis
    const [finalSentence, setFinalSentence] = useState<string>("") // used for their final sentence
    const [finalDeclaredFuture, setFinalDeclaredFuture] = useState<string>("") // final phasse
    const [finalCareer, setFinalCareer] = useState<string>("") // final career
    const [progressMessage, setProgressMessage] = useState<string>("")
    const [colorVibe, setColorVibe] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [resultValues, setResultValues] = useState<resultValues>({empathy:50,workLifeBalance:50,ambition:50})
    const openai = new OpenAI({apiKey: keyData, dangerouslyAllowBrowser: true}) // because the user inputs in,
    const [salary, setSalary] = useState<string>("") // used for salary range of career
    const [description, setDescription] = useState<string>("") // used for description of career
    const [education, setEducation] = useState<string>("") // used for education needed for career
    const [getStarted, setGetStarted] = useState<string>("") // used to tell user how to start on that career path

    const result = useAIResults(); //IMPORTANT CONSIDER AND ASK IF THIS'S OOP AND NOT FUNCTIONAL PROGRAMMING
    const navigate = useNavigate();
    const authContext = useAuth();

    async function startAi(){
        setLoading(true)
        setProgressMessage("")
        setResults([]);
        setFinalResult("");
        setFinalSentence("");
        setAiError("");


        let finishedQuestions: number = 0;
        let userResponses: Promise<string>[] = Object.entries(DetailedResults).map(
            async ([instruction,answer]: [string ,string], index): Promise<string> => 
            {
                try{
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
                      setProgressMessage("Understanding individual questions:" + finishedQuestions +"/"+Object.keys(DetailedResults).length)
                      return (index + 1) + ": " + response.output_text
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
                setProgressMessage("Finding your future career...")
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
                        content: "Based on the results: in many sentences how would you define the person as a whole? "
                        + "In one sentence, how would you report their future? "
                        + "In one 'Touhou song name'-esque phrase, what is their future? Make sure to include the little note chararcters; no names."
                        + "In one simple phrase, what is their future job (give it in the form of a real job title)?"
                        + "what is the hexidecimal color based on vibes?"
                        + "Give me a range of salaries for this career (for example: '$2000-$5000')"
                        + "Provide a short description of this career. Give information on what the user will do in this position, tasks they would do, how flexible their schedule is, and where they could work in this position (at home, schools, etc.)."
                        + "Provide the user with information regarding what level of education they need (for example, if the job needs a master's degree, say so)."
                        + "Provide the user with a list of steps to get started on this career path where each item is delimited with a '|' character and each item starts with an incrementing number and period."
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
                            type: "string",
                            description: "the user summary in at least five sentences"
                          },
                          final_sentence: { 
                            type: "string" 
                          },
                          touhou_future_phrase: { 
                            type: "string", 
                            description: "English only"
                          },
                          future_career: { 
                            type: "string", 
                          },
                          color_vibe: { 
                            type: "string", 
                          },
                          salary_range: {
                            type: "string",
                          },
                          career_description: {
                            type: "string",
                          },
                          education_level: {
                            type: "string",
                          },
                          get_started: {
                            type: "string",
                          },
                          values: {
                            type: "object",
                            properties: {
                              empathy:{
                                type: "number",
                                description: "rating between 0 and 100. 0 as sociopath, 100 as paragon"
                              },
                              workLifeBalance: {
                                type: "number",
                                description: "rating between 0 and 100. 0 as only work, 100 as only life"
                              },
                              ambition:{
                                type: "number",
                                description: "rating between 0 and 100. 0 as none, 100 as everything"
                              }
                            },
                            additionalProperties: false,
                            required: ["empathy","workLifeBalance","ambition"]
                        
                          }
                        },
                        required: ["user_definition", "final_sentence", "touhou_future_phrase", "future_career", "color_vibe", "values", "salary_range", "career_description", "education_level", "get_started"],
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
                setResultValues(JSON.parse(response.output_text).values)
                setSalary(JSON.parse(response.output_text).salary_range)
                setDescription(JSON.parse(response.output_text).career_description)
                setEducation(JSON.parse(response.output_text).education_level)
                setGetStarted(JSON.parse(response.output_text).get_started)
                let currentDate = Date()
                setDate(currentDate)
                console.log(response.usage)
                let currentResult: DetailedResultType = {
                  finalResult: JSON.parse(response.output_text).user_definition,
                  finalSentence: JSON.parse(response.output_text).final_sentence,
                  results: [...userResponses],
                  finalCareer: JSON.parse(response.output_text).future_career, 
                  finalDeclaredFuture:JSON.parse(response.output_text).touhou_future_phrase,
                  colorVibe:JSON.parse(response.output_text).color_vibe,
                  date: currentDate,
                  values: (JSON.parse(response.output_text).values),
                  salary: (JSON.parse(response.output_text).salary_range),
                  description: (JSON.parse(response.output_text).career_description),
                  education: (JSON.parse(response.output_text).education_level),
                  getStarted: (JSON.parse(response.output_text).get_started)
                }
                result.setResult( currentResult)
                let storedAcount: Account = JSON.parse(localStorage.getItem(authContext.username) || "{}")
                if (storedAcount.prevResults){
                  storedAcount.prevResults = [...storedAcount.prevResults, { ...currentResult,}]
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
    return <div className="ai-container">
      
      {/* time of ai finish */}
      <div hidden={loading || !finalResult} >Generated at {date}</div >
      
      {/* Shows progress message if currently loading */}
      {loading && <div className="loading">{progressMessage || "Loading..."}</div>}

      {/* Shows a defined, simple, determined result */}
      <div className="final-career" style={{"color":colorVibe}}hidden={loading || !finalResult}>
        {finalDeclaredFuture +" ~~ "+ finalCareer}
      </div>

      {/* Shows the career's salary range */}
      <div className="salary" hidden={loading || !salary}>
        <strong>Salary Range: </strong>{salary}
      </div>

      {/* Shows a description of the career */}
      <div className="description" hidden={loading || !description}>
        <br /><h3>Career Description: </h3>{description}
      </div>

      {/* Shows the average education needed for career */}
      <div className="education" hidden={loading || !education}>
        <br /><h3>Education Requirement: </h3>{education}
      </div>

      {/* Shows the user how to get started on the career path */}
      <div className="gettingStarted" hidden={loading || !getStarted}>
        <br /><h3>Getting Started: </h3>
        <ul style={{listStyleType: "none"}}>{getStarted.split("|").map((res, i) => <li key={i}>{res}</li>)}</ul>
      </div>

      <div className="personalityAnalysis" hidden={loading || !getStarted}>
        <h2>Personality Analysis:</h2>
      </div>

      {/* Shows individual insights if finished loading */}
      <div className="results" hidden={!results.length || loading}>
        <h3>Individual Insights:</h3>
        <ul style={{listStyleType: "none"}}>{results.map((res, i) => <li key={i}>{res}</li>)}</ul>
      </div>

      {/* Shows character analysis */}
      <div className="final-result" hidden={!finalResult || loading}>
        <strong>Final Profile:</strong> {finalResult}
      </div>

      {/* Shows career prediction */}
      <div className="final-sentence" hidden={!finalSentence || loading}>
        <strong>Future Career Prediction:</strong> {finalSentence}
      </div>

      <div hidden={!finalSentence || loading}>
        <ValueBars values={resultValues}></ValueBars>
      </div>

      {/* Displays any errors that occurred */}
      {aiError && <div className="ai-error">{aiError}</div>}

      {/* Generate button; disabled until ready */}
      <Button className="ai-button" onClick={startAi} disabled={disabled || loading}>
        Generate Response
      </Button>

      
      {/*Makes user not do stupid stuff*/}
      <div className="ai-disclaimer" hidden={loading || !finalSentence}>
        <div>"I THINK THEREFORE I AM!" You think your own thoughts, not the AI, and therefore you act your own actions</div>
        <div>Generated by AI: All choices are yours, and the future is ultimately in your hands. Not responsible for any user damages.</div>
      </div>

      {/* Instructional message if the button is disabled */}
      {disabled && <p className="disabled-message">Please answer all detailed questions to enable a response.</p>}
      
      <Button className="ai-button" onClick={()=>navigate("/CurrentResultPage")} disabled={disabled || loading || finalCareer === ""}>
        Go to download page?  
      </Button>

    </div>
    
    }
export default OpenAiComponent;
