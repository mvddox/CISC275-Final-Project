// this exists so that every else looks nice and slick

export interface BasicQuestionType {
    instruction: string;
    answers: string[];
    id: number
} 
//placeholder example
export const QUESTION_ZERO: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 0}

//list of all basic questions
export const QUESTIONS: BasicQuestionType[] = [QUESTION_ZERO]