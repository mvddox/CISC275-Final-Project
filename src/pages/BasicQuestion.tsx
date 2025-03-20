import React, { useState } from 'react';
import './BasicQuestions.css';
import { Button } from 'react-bootstrap';
function BasicQuestion() {
    const [chosenAnswer, setChosenAnswer] = useState<string>("");
  return (
    <div className="Basic">
        <Button onClick={()=> setChosenAnswer(chosenAnswer + "1")}>
            placeholder
        </Button>
    </div>
  );
}

export default BasicQuestion;
