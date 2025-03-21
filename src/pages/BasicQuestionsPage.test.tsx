import React from 'react';
import { render, screen, within } from '@testing-library/react';

//import userEvent from '@testing-library/user-event'
import BasicQuestionsPage from './BasicQuestionsPage';
import "react-router";
import { HashRouter } from 'react-router';

describe('Header', () => {
    // beforeEach(() => render(<BasicQuestion/>))

    test('Header title of page', () => {
    render(<HashRouter> <BasicQuestionsPage /> </HashRouter>);
    const linkElement = screen.getByText(/Basic/i);
    expect(linkElement).toBeInTheDocument();
    });
    test('There is a return button', () => {
        render(<HashRouter> <BasicQuestionsPage /> </HashRouter>);
        const linkElement = screen.getByText(/Return Home?/i);
        expect(linkElement).toBeInTheDocument();
        });
})
describe('Questions', () => {
    // beforeEach(() => render(<BasicQuestion/>))
    // NOTE: Important that you have every child in a
    // list be accounted for by a unique key! (<Thing key=("key")><\Thing>)
    test('There IS a question', () => {
        render(<HashRouter> <BasicQuestionsPage /> </HashRouter>);
        const questions = screen.getAllByTestId("question");
        // for all getAlls or similiar, use a to be greater than or equal to
        // don't use expect(questions).toBeInTheDocument();
        expect(questions.length).toBeGreaterThanOrEqual(7);
    });
    test('Each question has at least one answer', () => {
        render(<HashRouter> <BasicQuestionsPage /> </HashRouter>);
        const questions = screen.getAllByTestId("question");
        questions.map((question: HTMLElement): HTMLElement =>{
            const answer = within(question).getAllByTestId("answer")
            expect(answer.length).toBeGreaterThanOrEqual(1)
            return question
        })
        });
})
// describe('Generated Report', () => {
//     // beforeEach(() => render(<BasicQuestion/>))

//     // TO DO!!!!!
// })