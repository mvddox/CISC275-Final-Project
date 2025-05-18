import React from 'react';
import { render, screen } from '@testing-library/react';

//import userEvent from '@testing-library/user-event'
import App from './App';
import "react-router";

test('renders learn react link', () => {
  render(<App />);
  //const user = userEvent.setup()
  // at homepage
  expect(screen.getByText(/Basic Question/i)).toBeInTheDocument()
});