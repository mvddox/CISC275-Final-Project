import React from 'react';
import { render, screen } from '@testing-library/react';

//import userEvent from '@testing-library/user-event'
import BasicQuestion from './BasicQuestionsPage';
import "react-router";
import { HashRouter } from 'react-router';

describe('Header', () => {
    // beforeEach(() => render(<BasicQuestion/>))

    test('Header title of page', () => {
    render(<HashRouter> <BasicQuestion /> </HashRouter>);
    const linkElement = screen.getByText(/Basic/i);
    expect(linkElement).toBeInTheDocument();
    });
    test('There is a return button', () => {
        render(<HashRouter> <BasicQuestion /> </HashRouter>);
        const linkElement = screen.getByText(/Basic/i);
        expect(linkElement).toBeInTheDocument();
        });
})
describe('Questions', () => {
    // beforeEach(() => render(<BasicQuestion/>))

    test('There are seven questions', () => {
    render(<HashRouter> <BasicQuestion /> </HashRouter>);
    const linkElement = screen.getByText(/Basic/i);
    expect(linkElement).toBeInTheDocument();
    });
    test('Each question has at least four answers', () => {
        render(<HashRouter> <BasicQuestion /> </HashRouter>);
        const linkElement = screen.getByText(/Basic/i);
        expect(linkElement).toBeInTheDocument();
        });
})
describe('Generated Report', () => {
    // beforeEach(() => render(<BasicQuestion/>))

    // TO DO!!!!!
})