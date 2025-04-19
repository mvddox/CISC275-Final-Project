import React, { useState } from 'react';
import OpenAI from "openai";
import { DetailedQuestionRecord } from '../DetailedQuestionsList';
import { Button } from 'react-bootstrap';
import { keyData } from '../DetailedQuestionsPage';
import './DetailedOpenAiChatGPT.css';

interface OpenAiComponentProps {
  DetailedResults: DetailedQuestionRecord;
  disabled?: boolean; // disables the button until all questions are answered
}

function OpenAiComponent({ DetailedResults, disabled }: OpenAiComponentProps) {
  const [aiError, setAiError] = useState<string>(""); // captures and displays any API or runtime errors
  const [loading, setLoading] = useState<boolean>(false); // controls loading spinner/text
  const [results, setResults] = useState<string[]>([]); // stores AI analysis per question
  const [finalResult, setFinalResult] = useState<string>(""); // stores the final character analysis
  const [finalSentence, setFinalSentence] = useState<string>(""); // stores career prediction
  const [progressMessage, setProgressMessage] = useState<string>(""); // real-time progress updates

  const openai = new OpenAI({ apiKey: keyData, dangerouslyAllowBrowser: true }); // API instance for use in browser

  /**
   * Gathers AI insights for each individual question-answer pair.
   * Each entry is mapped to a separate GPT prompt, and results are collected asynchronously.
   */
  async function accumResults(): Promise<string[]> {
    setProgressMessage("");
    let finishedQuestions = 0;

    const questionEntries = Object.entries(DetailedResults);

    const userResponses = questionEntries.map(async ([instruction, answer], index): Promise<string> => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: instruction },
            { role: "user", content: answer },
            {
              role: "user",
              content: "Based on the question and answer, how would you define the person in two or fewer sentences?"
            }
          ]
        });

        finishedQuestions++;
        setProgressMessage(`Understanding individual questions: ${finishedQuestions}/${questionEntries.length}`);
        return `${index}: ${response.choices[0]?.message?.content ?? ""}`;
      } catch (e) {
        console.error(e);
        setAiError("It seems that there was an error...");
        throw e;
      }
    });

    // Returns an array of resolved strings from all GPT completions
    return Promise.all(userResponses);
  }

  /**
   * Handles the complete workflow:
   * 1. Analyzes each question individually.
   * 2. Generates a final personality summary.
   * 3. Predicts the user’s future career.
   */
  async function startAI() {
    setResults([]);
    setFinalResult("");
    setFinalSentence("");
    setAiError("");
    setLoading(true);

    try {
      const userResponses = await accumResults(); // wait for all question-based analyses
      setResults(userResponses);

      // Now generate an overall character summary
      setProgressMessage("Analyzing full profile...");
      const summaryResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `The user gave answers to detailed questions, and we derived: ${userResponses.join(" ")}. Based on these, summarize the person's character in one paragraph.`
          }
        ],
        temperature: 1.3
      });

      const summaryText = summaryResponse.choices[0]?.message?.content ?? "";
      setFinalResult(summaryText);

      // Based on the summary, predict a future career path
      setProgressMessage("Predicting future...");
      const futureResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Based on this profile: "${summaryText}", what is their most likely future career? Respond in one sentence.`
          }
        ],
        temperature: 1.5
      });

      setFinalSentence(futureResponse.choices[0]?.message?.content ?? "");
    } catch (e) {
      console.error(e);
      setAiError("Something went wrong during generation.");
    } finally {
      setLoading(false);
      setProgressMessage("");
    }
  }

  return (
    <div className="ai-container">
      {/* Shows progress message if currently loading */}
      {loading && <div className="loading">{progressMessage || "Loading..."}</div>}

      {/* Shows individual insights if finished loading */}
      <div className="results" hidden={!results.length || loading}>
        <strong>Individual Insights:</strong>
        <ul>{results.map((res, i) => <li key={i}>{res}</li>)}</ul>
      </div>

      {/* Shows character analysis */}
      <div className="final-result" hidden={!finalResult || loading}>
        <strong>Final Profile:</strong> {finalResult}
      </div>

      {/* Shows career prediction */}
      <div className="final-sentence" hidden={!finalSentence || loading}>
        <strong>Future Career Prediction:</strong> {finalSentence}
      </div>

      {/* Displays any errors that occurred */}
      {aiError && <div className="ai-error">{aiError}</div>}

      {/* Generate button; disabled until ready */}
      <Button className="ai-button" onClick={startAI} disabled={disabled || loading}>
        Generate Response
      </Button>

      {/* Instructional message if the button is disabled */}
      {disabled && <p className="disabled-message">Please answer all detailed questions to enable a response.</p>}
    </div>
  );
}

export default OpenAiComponent;
