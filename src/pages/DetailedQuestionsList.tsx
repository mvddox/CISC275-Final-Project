
export interface DetailedQuestionType {
    instruction: string
    id: number
}


export type DetailedQuestionRecord = Record<number, string>

//plqholder example 
// const QUESTION_ZERO: DetailedQuestionType = {instruction: 
//     "Who would win in a fight, a man with everything on the line, or a man with nothing to lose?", id: 0}
// const QUESTION_NEGATIVEONE: DetailedQuestionType = {instruction: 
//     "Who would you turn the trolley?", id: 1}

// Question 1: Basic litmus test (how hopeful one is)
const QUESTION_1: DetailedQuestionType = {instruction: 
    "Who would win in a fight, a man with everything on the line, or a man with nothing to lose?", id: 0}

// Question 2: Basic empathy test (self sacrifice)
const QUESTION_2: DetailedQuestionType = {instruction: 
    "Who would you turn the trolley?", id: 1}

// Question 3: Basic compentency test 
const QUESTION_3: DetailedQuestionType = {instruction:
    "A Zombie apocoplyse happens now where you are right now, what do you do?", id: 2}



    
export const DETAILED_QUESTIONS: DetailedQuestionType[] = [QUESTION_1, QUESTION_2, QUESTION_3]
