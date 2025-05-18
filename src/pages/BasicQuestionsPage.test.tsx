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

describe('BasicQuestionsPage', () => {
    test('renders the API key input', () => {
      render(
        <HashRouter>
          <BasicQuestionsPage />
        </HashRouter>
      );
      expect(screen.getByPlaceholderText('Insert API Key Here')).toBeInTheDocument();
    });
    test('renders the progress bar', () => {
        render(
          <HashRouter>
            <BasicQuestionsPage />
          </HashRouter>
        );
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toBeInTheDocument();
    
  
});
test('renders the header title', () => {
    render(
      <HashRouter>
        <BasicQuestionsPage />
      </HashRouter>
    );
    const headerTitle = screen.getByText(/Basic Questions/i);
    expect(headerTitle).toBeInTheDocument();
  });
  test('renders the return home button', () => {
    render(
      <HashRouter>
        <BasicQuestionsPage />
      </HashRouter>
    );
    const returnButton = screen.getByText(/Return Home?/i);
    expect(returnButton).toBeInTheDocument();
});
test('renders the go to detailed page button', () => {
    render(
      <HashRouter>
        <BasicQuestionsPage />
      </HashRouter>
    );
    const detailedButton = screen.getByText(/Go to Detailed Question Page/i);
    expect(detailedButton).toBeInTheDocument();
  });
  test('renders the footer with author information', () => {
    render(
      <HashRouter>
        <BasicQuestionsPage />
      </HashRouter>
    );
    const footerText = screen.getByText(/Authors: Ethan Rigor, John Shaw, Elijah Jeudy, Maddox Florez/i);
    expect(footerText).toBeInTheDocument();
  });
  test('renders the "Previous" and "Next" buttons initially', () => {
    render(
      <HashRouter>
        <BasicQuestionsPage />
      </HashRouter>
    );
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });
});
  
   

