import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

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

describe('DetailedQuestionsPage', () => {
    test('renders the API key input on detailed page', () => {
        render(
          <HashRouter>
            <DetailedQuestionsPage />
          </HashRouter>
        );
        expect(screen.getByLabelText(/API Key:/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Insert API Key Here')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
      });
  
    test('renders the progress bar on detailed page', () => {
      render(
        <HashRouter>
          <DetailedQuestionsPage />
        </HashRouter>
      );
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
    });
  
    test('renders the header title on detailed page', () => {
      render(
        <HashRouter>
          <DetailedQuestionsPage />
        </HashRouter>
      );
      const headerTitle = screen.getByText(/Detailed Questions/i);
      expect(headerTitle).toBeInTheDocument();
    });
  
    test('renders the "Go to Basic Question Page" button', () => {
      render(
        <HashRouter>
          <DetailedQuestionsPage />
        </HashRouter>
      );
      const basicButton = screen.getByText(/Go to Basic Question Page/i);
      expect(basicButton).toBeInTheDocument();
    });
  
    test('renders the "Return home" button on detailed page', () => {
      render(
        <HashRouter>
          <DetailedQuestionsPage />
        </HashRouter>
      );
      const returnButton = screen.getByText(/Return home/i);
      expect(returnButton).toBeInTheDocument();
    });
  
    test('renders the footer with author information on detailed page', () => {
      render(
        <HashRouter>
          <DetailedQuestionsPage />
        </HashRouter>
      );
      const footerText = screen.getByText(/Authors: Ethan Rigor, John Shaw, Elijah Jeudy, Maddox Florez/i);
      expect(footerText).toBeInTheDocument();
    });
  
    test('renders the "Previous" and "Next" buttons initially on detailed page', () => {
      render(
        <HashRouter>
          <DetailedQuestionsPage />
        </HashRouter>
      );
      expect(screen.getByText(/Previous/i)).toBeInTheDocument();
      expect(screen.getByText(/Next/i)).toBeInTheDocument();
    });
  
    test('"Previous" button is disabled on the first detailed question', () => {
      render(
        <HashRouter>
          <DetailedQuestionsPage />
        </HashRouter>
      );
      const previousButton = screen.getByText(/Previous/i);
      expect(previousButton).toBeDisabled();
    });
  
    
  
    
  
    test('renders the "Show Results" button on detailed page', () => {
      render(
        <HashRouter>
          <DetailedQuestionsPage />
        </HashRouter>
      );
      expect(screen.getByText(/Show Results/i)).toBeInTheDocument();
    });
  
    test('clicking "Show Results" displays the results text on detailed page', () => {
      render(
        <HashRouter>
          <DetailedQuestionsPage />
        </HashRouter>
      );
      const showResultsButton = screen.getByText(/Show Results/i);
      fireEvent.click(showResultsButton);
      expect(screen.getByText(/Your results are/i)).toBeInTheDocument();
    });
  
    
  });