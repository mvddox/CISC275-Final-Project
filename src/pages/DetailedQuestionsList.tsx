
export interface DetailedQuestionType {
    instruction: string
    id: number
}


export type DetailedQuestionRecord = Record<number, string>

//plqholder example 
const QUESTION_ZERO: DetailedQuestionType = {instruction: 
    "Who would win in a fight, a man with everything on the line, or a man with nothing to lose?", id: 0}
const QUESTION_NEGATIVEONE: DetailedQuestionType = {instruction: 
    "Who would you turn the trolley?", id: 1}

export const DETAILED_QUESTIONS: DetailedQuestionType[] = [QUESTION_ZERO, QUESTION_NEGATIVEONE]
