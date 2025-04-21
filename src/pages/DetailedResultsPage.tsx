import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./DetailedResultsPage.css";
import { useAIResults } from '../AIResultsContext';

export let keyData = "";

const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function NavigationButton() {
  const navigate = useNavigate();
  return (
    <div>
      <Button className="Button" onClick={() => navigate("/Home")}>
        Home Page
      </Button>
    </div>
  );
}

function DetailedResultsPage() {
  const [key, setKey] = useState<string>(keyData);
  const { results, finalResult,finalSentence } = useAIResults();

  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div className="Results">
      <div className="header-content">
        <h1>Results</h1>
        <NavigationButton />
      </div>

      <div className="results-list">
        <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
          {results.map((res, i) => (
            <li key={i}>{res}</li>
          ))}
        </ul>
      </div>
      <div className="final-results">
        <h3>Character Analysis:</h3>
        <p>{finalResult}</p>
      </div>
      <div className="final-sentence">
        <h3>Overall Suggestion:</h3>
        <p>{finalSentence}</p>
      </div>

      <footer>
        <Form>
          <Form.Label htmlFor="api-key-input">API Key:</Form.Label>
          <Form.Control
            id="api-key-input"
            type="password"
            placeholder="Insert API Key Here"
            value={key}
            onChange={changeKey}
          />
          <br />
          <Button className="Submit-Button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        <p>Authors: Ethan Rigor, John Shaw, Elijah Jeudy, Maddox Florez</p>
      </footer>
    </div>
  );
}

export default DetailedResultsPage;
