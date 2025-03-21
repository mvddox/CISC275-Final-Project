// this exists so that every else looks nice and slick

export interface BasicQuestionType {
    instruction: string;
    answers: string[];
    id: number
} 
//placeholder example
//const QUESTION_ZERO: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 0}


//QUESTIONS
const QUESTION_ONE: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 0}
const QUESTION_TWO: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 1}
const QUESTION_THREE: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 2}
const QUESTION_FOUR: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 3}
const QUESTION_FIVE: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 4}
const QUESTION_SIX: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 5}
const QUESTION_SEVEN: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 6}

//list of all basic questions
export const QUESTIONS: BasicQuestionType[] = [QUESTION_ONE, QUESTION_TWO, QUESTION_THREE, QUESTION_FOUR, QUESTION_FIVE, QUESTION_SIX, QUESTION_SEVEN,]