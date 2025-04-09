
export interface DetailedQuestionType {
    instruction: string
    id: number
}


export type DetailedQuestionRecord = Record<string, string>

//plqholder example 
// const QUESTION_ZERO: DetailedQuestionType = {instruction: 
//     "Who would win in a fight, a man with everything on the line, or a man with nothing to lose?", id: 0}
// const QUESTION_NEGATIVEONE: DetailedQuestionType = {instruction: 
//     "Who would you turn the trolley?", id: 1}

// Question 1: Basic litmus test (how hopeful one is)
// justification: This question asks idealistic someone is. If they answer the who
// would win with a man with everything on the line, they tend to believe there
// are still things worth fighting and dying for ("honest" politicians, volonteers, philanthropists)
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
// justification: tells if they are cut out for high stress jobs
const QUESTION_3: DetailedQuestionType = {instruction:
    "A Zombie apocoplyse happens now where you are right now, what do you do?", id: 2}

// Question 4: Basic caretaking test
// justification: tests if they can take care of a worm (nurses, doctors, etc)
const QUESTION_4: DetailedQuestionType = {instruction:
    "If your partner (or anyone of significant value) became a worm, what would you do?", id: 3
}

// Question 5: obligatory work/life balance question
const QUESTION_5: DetailedQuestionType = {instruction:
    "Do you live for your career, or do you have career to work for your life?", id: 4
}

// Question 6:  obligatory work/life balance question
const QUESTION_6: DetailedQuestionType = {instruction:
    "Would you miss your child's recital to work on an important project?", id: 5
}


// Question 7: Basic operandi modus
// justification: A person, to fit the chieftest and defining critera of being human is to create a reason
// (or reason not to have or care) for their continued existance. A person must define themselves in order 
// to create their story. Ie. a person is both the marble and the chisle that carves it, and the chisel
// must have a reason to continue, whether it be for their own will or anothers or none


const QUESTION_7: DetailedQuestionType = {instruction:
    "Why do you exist?", id:6
}


    
export const DETAILED_QUESTIONS: DetailedQuestionType[] = [QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5, QUESTION_6, QUESTION_7]
