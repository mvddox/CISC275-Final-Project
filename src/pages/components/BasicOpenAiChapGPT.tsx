import React, { useState } from 'react';
import OpenAI from "openai";
import { BasicAnswerRecord } from '../BasicQuestionsList';
import { Button } from 'react-bootstrap';
import { keyData } from '../BasicQuestionsPage';
import './BasicOpenAiChatGPT.css';
import { useNavigate } from "react-router-dom";
import { useAIResults } from '../../AIResultsContext';
interface OpenAiComponentBProps {
    BasicResults: BasicAnswerRecord;
    disabled?: boolean; // Add the disabled prop here (optional)
}

function OpenAiComponentB({ BasicResults, disabled }: OpenAiComponentBProps) {
    const [aiError, setAiError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState<string[]>([]);
    const [finalResult, setFinalResult] = useState<string>("");
    const openai = new OpenAI({ apiKey: keyData, dangerouslyAllowBrowser: true });
    const navigate = useNavigate();
    const { setResults: setContexResults, setFinalResult: setContexFinalResult } = useAIResults();
    async function accumResults(): Promise<string[]> {
        setLoading(true);
        let newResults: string[] = [];
        let resultPromises: Promise<string>[] = Object.entries(BasicResults).map(
            async ([instruction, answer]: [string, string]): Promise<string> => {
                try {
                    const response = await openai.chat.completions.create({
                        model: "gpt-4o",
                        messages: [{ role: "user", content: `Based on the question: '${instruction}' What job do you think a person would be best suited for based on their answer "${answer}"? Answer in one sentence.` }]
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
        );
        return Promise.all(resultPromises);
    }

    async function startAI() {
        setResults([]);
        setFinalResult("");
        setAiError(""); // Clear any previous errors
        setLoading(true);
        const newResults: string[] = await accumResults();
        setContexResults(newResults);
    
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{
                    role: "user",
                    content: `Based on these individual insights: "${newResults.join('. ')}" What job do you think this person would be best suited for overall? Answer in one sentence.`
                }]
            });
            const final = response.choices[0]?.message?.content || "";
            setFinalResult(final);
            setContexFinalResult(final);        
    
            // Navigate AFTER setting context results
            navigate("/BasicResultsPage");
    
        } catch (e: any) {
            setAiError("It seems that there was an error generating the final result.");
            console.error(e);
        }
    
        setLoading(false);
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
            {disabled && <p className="disabled-message">Please answer all basic questions to enable a response.</p>}
        </div>
    );
}

export default OpenAiComponentB;