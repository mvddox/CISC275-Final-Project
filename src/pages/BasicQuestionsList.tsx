// this file exists so that every else looks nice and slick

export interface BasicQuestionType {
    instruction: string;
    answers: string[];
    id: number
} 

// note: every key is a string, apparently even if defined otherwise
export type AnswerRecord = Record<number, string>
export type actualMeaning = Record<number, string>


//placeholder example
//const QUESTION_ZERO: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 0}

//QUESTIONS
const QUESTION_1: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 0}
const QUESTION_2: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 1}
const QUESTION_3: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2", "placeholder 3"], id: 2}
const QUESTION_4: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 3}
const QUESTION_5: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 4}
const QUESTION_6: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 5}
const QUESTION_7: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 6}
const QUESTION_8: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 7}
const QUESTION_9: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 8}
const QUESTION_10: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 9}
const QUESTION_11: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 10}
const QUESTION_12: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 11}
const QUESTION_13: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 12}
const QUESTION_14: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 13}
const QUESTION_15: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 14}
const QUESTION_16: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 15}
const QUESTION_17: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 16}
const QUESTION_18: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 17}
const QUESTION_19: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 18}
const QUESTION_20: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 19}
const QUESTION_21: BasicQuestionType = {instruction: "This is a plaeholder", answers:["placeholder 1", "placeholder 2"], id: 20}



//list of all basic questions
export const QUESTIONS: BasicQuestionType[] = 
[QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5, QUESTION_6, QUESTION_7, QUESTION_8,
    QUESTION_9, QUESTION_10, QUESTION_11, QUESTION_12, QUESTION_13, QUESTION_14, QUESTION_15, QUESTION_16,
    QUESTION_17, QUESTION_18, QUESTION_19, QUESTION_20, QUESTION_21, 
    // QUESTION_6, QUESTION_7, QUESTION_8,
    // QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5, QUESTION_6, QUESTION_7, QUESTION_8,
]