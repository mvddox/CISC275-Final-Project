import React, { useState } from 'react';
import OpenAI from "openai";
import { DetailedQuestionRecord } from '../DetailedQuestionsList';
import { Button } from 'react-bootstrap';
import { keyData } from '../DetailedQuestionsPage';
import './DetailedOpenAiChatGPT.css';


interface OpenAiComponentProps {
    DetailedResults: DetailedQuestionRecord;
    disabled?: boolean; // Receive the disabled prop
}

function OpenAiComponent({ DetailedResults, disabled }: OpenAiComponentProps) {
    const [aiError, setAiError] = useState<string>("") // errors; when it catches an error, display error
    const [loading, setLoading] = useState<boolean>(false) //loading
    const [results, setResults] = useState<string[]>([]) // collection of all the results
    const [finalResult, setFinalResult] = useState<string>("") // used for final determination of future
    const openai = new OpenAI({ apiKey: keyData, dangerouslyAllowBrowser: true }) // because the user inputs in,


    /**
     *
     * @returns a string of promises based on the result of the openai api
     * Note: when maping a list of promises to an array, you have to wait for all of them with Promise.all
     */
    async function accumResults(): Promise<string[]> {
        setLoading(true)
        let newResults: string[] = []
        // maps every question with every user answer to a gpt input
        let resultPromises: Promise<string>[] = Object.entries(DetailedResults).map(
            async ([instruction, answer]: [string, string]): Promise<string> => {
                try {
                    const response = await openai.chat.completions.create({
                        model: "gpt-4o",
                        messages: [{ role: "user", content: `Based on the question: '${instruction}' How would you define a person who said "${answer}"? Answer in one sentence.` }]
                    });
                    const content = response.choices[0]?.message?.content || "";
                    newResults = [...newResults, content];
                    setResults([...newResults]);
                    return content;
                } catch (e: any) {
                    setAiError("It seems that there was an error.....");
                    console.error(e);
                    throw (e);
                }
            }
        )
        return Promise.all(resultPromises) // holy crap took me an hour to understand this promise stuff
    }


    async function startAI() {
        setResults([])
        setFinalResult("") // clean ups display
        setAiError(""); // Clear any previous errors
        const newResults: string[] = await accumResults() // the entire thing has to wait for the results to be accumulated

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "user", content: `Based on the results: "${newResults.join('. ')}" How would you define the person as a whole? Answer in one sentence.` }]
            });
            setFinalResult(response.choices[0]?.message?.content || "");
        } catch (e: any) {
            setAiError("It seems that there was an error.....");
            console.error(e);
        }
        // final sentence for the final arbitration of the person's future
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "user", content: `Based on the results: "${newResults.join('. ')}" In one sentence what would their future career be?` }]
            });
            setFinalResult(response.choices[0]?.message?.content || "");
        } catch (e: any) {
            setAiError("It seems that there was an error.....");
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
          <Button className="ai-button" onClick={startAI} disabled={disabled}>
            Generate Response
          </Button>
          {disabled && <p className="disabled-message">Please answer all detailed questions to enable a response.</p>}
        </div>
      );
    }
//sample for copy paste
//A man with everything on the line would win because a man with nothing to lose already lost their will to fight.
//I would not pull the switch, but not in spite of myself. Although I would never know the strangers' lives, from one to a hundred, nor understand how they feel or experience their life stories, my life would be more fulfilled should I let them live.


export default OpenAiComponent;