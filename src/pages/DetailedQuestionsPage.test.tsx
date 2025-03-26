import React from 'react';
import { act, render, screen } from '@testing-library/react';

//import userEvent from '@testing-library/user-event'
import DetailedQuestionsPage from './DetailedQuestionsPage';
import "react-router";
import { HashRouter } from 'react-router';

describe('Header', () => {
    // beforeEach(() => render(<BasicQuestion/>))

    test('Header title of page', () => {
    render(<HashRouter> <DetailedQuestionsPage /> </HashRouter>);
    const linkElement = screen.getByText(/Detailed/i);
    expect(linkElement).toBeInTheDocument();
    });
    test('There is a return button', () => {
        render(<HashRouter> <DetailedQuestionsPage /> </HashRouter>);
        const linkElement = screen.getByText(/Return Home?/i);
        expect(linkElement).toBeInTheDocument();
        });
})
describe('Questions', () => {
    // beforeEach(() => render(<BasicQuestion/>))
    // NOTE: Important that you have every child in a
    // list be accounted for by a unique key! (<Thing key=("key")><\Thing>)
    test('There IS a question', () => {
        render(<HashRouter> <DetailedQuestionsPage /> </HashRouter>);
        const questions = screen.getAllByTestId("question");
        const question = screen.getByText(/Question 1:/i)
        // for all getAlls or similiar, use a to be greater than or equal to
        // don't use expect(questions).toBeInTheDocument();
        expect(questions.length).toBeGreaterThanOrEqual(1);
        expect(question).toBeInTheDocument();
    });
    test('Clicking next makes it the next question', async () => {
        render(<HashRouter> <DetailedQuestionsPage /> </HashRouter>);
        const questions = screen.getAllByTestId("question");
        const firstQuestion = screen.getByText(/Question 1:/i)
        const secondQuestion = screen.getByText(/Question 2:/i)
        const nextButton = screen.getByText(/next/i)
        // for all getAlls or similiar, use a to be greater than or equal to
        // don't use expect(questions).toBeInTheDocument();
        expect(questions.length).toBeGreaterThanOrEqual(2);
        await act(async () => {
            nextButton.click();
        });
        expect(firstQuestion).not.toBeVisible();
        expect(secondQuestion).toBeVisible();
    });
})
// describe('Generated Report', () => {
//     // beforeEach(() => render(<BasicQuestion/>))

//     // TO DO!!!!!
// })