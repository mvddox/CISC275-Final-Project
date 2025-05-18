// this file exists so that every else looks nice and slick

export interface BasicQuestionType {
    instruction: string;
    answers: string[];
    id: number
} 

// note: every key is a string, apparently even if defined otherwise
export type BasicAnswerRecord = Record<string, string>
export type actualMeaning = Record<number, string>

//QUESTIONS
const QUESTION_1: BasicQuestionType = {instruction: "Are you an extroverted person?", answers:["Yes", "Mayhaps", "No"], id: 0}
const QUESTION_2: BasicQuestionType = {instruction: "Are people of any value to you?", answers:["Yes", "Mayhaps", "No"], id: 1}
const QUESTION_3: BasicQuestionType = {instruction: "Do you want to make the world a better place?", answers:["Yes", "Mayhaps", "No"], id: 2}
const QUESTION_4: BasicQuestionType = {instruction: "Can you work in a team?", answers:["Yes", "Mayhaps", "No"], id: 3}
const QUESTION_5: BasicQuestionType = {instruction: "Are you your own boss?", answers:["Yes", "Mayhaps", "No"], id: 4}
const QUESTION_6: BasicQuestionType = {instruction: "Do you want to fix and make the world more perfect?", answers:["Yes", "Mayhaps", "No"], id: 5}
const QUESTION_7: BasicQuestionType = {instruction: "Are you good with technology?", answers:["Yes", "Mayhaps", "No"], id: 6}
const QUESTION_8: BasicQuestionType = {instruction: "Is there no cost too great?", answers:["Yes", "Mayhaps", "No"], id: 7}
const QUESTION_9: BasicQuestionType = {instruction: "How much work experience do you have?", answers:["None", "A few months", "A year", "Years"], id: 8}
const QUESTION_10: BasicQuestionType = {instruction: "Do you know what you are doing?", answers:["No clue", "A grasp", "Somewhat", "My actions are utterly unclouded"], id: 9}
const QUESTION_11: BasicQuestionType = {instruction: "How much autonomy do you desire?", answers:["Give me orders and I follow", "Some guidance" ,"I'll do my own thing", "I give the orders"], id: 10}
const QUESTION_12: BasicQuestionType = {instruction: "What is your favorite subject?", answers:["Math", "Science", "English", "PE"], id: 11}
const QUESTION_13: BasicQuestionType = {instruction: "How do you like learning?", answers:["By reading", "By image", "By action", "By listening"], id: 12}
const QUESTION_14: BasicQuestionType = {instruction: "Is it important to have fun at work?", answers:["Work exists for money only", "So long as it isn't boring", "It's important to have fun" ,"There would be no reason otherwise"], id: 13}
const QUESTION_15: BasicQuestionType = {instruction: "Is free time from work an incentive?", answers:["I need time to live my life", "There needs to be a balance", "Work is more important", "Life is only proven by work"], id: 14}
const QUESTION_16: BasicQuestionType = {instruction: "Does it matter if your career holds prestige?", answers:["So long it pays the bills", "There are things I'd rather not be seen as", "Something I would flex", "The most"], id: 15}
const QUESTION_17: BasicQuestionType = {instruction: "Is there always a mountain to climb higher, a peak to reach?", answers:["Nah, I'm content", "There are limits", "One could always achieve more", "Among the hierarchy, I alone will take precedence"], id: 16}
const QUESTION_18: BasicQuestionType = {instruction: "How do you want to spend your workday?", answers:["Contributing to large-scale projects in a team","Helping clients on the phone", "Finishing tasks with a partner", "Working busy work remotely"], id: 17}
const QUESTION_19: BasicQuestionType = {instruction: "How should work be scheduled?", answers:["Whenever work demands it", "However the client schedules it", "Every week is scheduled by me", "Only during a routine schedule"], id: 18}
const QUESTION_20: BasicQuestionType = {instruction: "How flexible are you in emergencies?", answers:["It does not matter if an emergency happens, not my problem", "My safety takes priority", "It has to be really dire", "It is my duty to help in spite of the circumstances"], id: 19}
const QUESTION_21: BasicQuestionType = {instruction: "Why do you exist?", answers:["To live life as I see it", "To create value for the world", "To serve humanity", "I don't need a reason"], id: 20}



//list of all basic questions
export const BASIC_QUESTIONS: BasicQuestionType[] = 
[QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5, QUESTION_6, QUESTION_7, QUESTION_8,
    QUESTION_9, QUESTION_10, QUESTION_11, QUESTION_12, QUESTION_13, QUESTION_14, QUESTION_15, QUESTION_16,
    QUESTION_17, QUESTION_18, QUESTION_19, QUESTION_20, QUESTION_21, 
    // QUESTION_6, QUESTION_7, QUESTION_8,
    // QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5, QUESTION_6, QUESTION_7, QUESTION_8,
]
