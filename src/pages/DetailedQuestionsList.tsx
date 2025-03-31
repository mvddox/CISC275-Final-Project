
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
// justification: This question asks 
const QUESTION_1: DetailedQuestionType = {instruction: 
    "Who would win in a fight, a man with everything on the line, or a man with nothing to lose?", id: 0}

// Question 2: Basic empathy test (self sacrifice)
// justification: The question asks if the user is willing to sacrifice their life. If they are
// then they would fufill the duties of those who serve a fellow man (fireman, frontline medic, etc.)
const QUESTION_2: DetailedQuestionType = {instruction: 
    "You are tied to a track. A speeding trolly comes towards you but there is a fork before with a switch."
    + " One the other set of tracks is a set of a dozen strangers."
    + " Would you turn the trolley?", id: 1}

// Question 3: Basic compentency test 
// justification:
const QUESTION_3: DetailedQuestionType = {instruction:
    "A Zombie apocoplyse happens now where you are right now, what do you do?", id: 2}



    
export const DETAILED_QUESTIONS: DetailedQuestionType[] = [QUESTION_1, QUESTION_2, QUESTION_3]
