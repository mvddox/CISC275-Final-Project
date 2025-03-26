import React from 'react';
import { render, screen } from '@testing-library/react';

//import userEvent from '@testing-library/user-event'
import App from './App';
import "react-router";

// USE FOR HOME.TSX
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// useful link https://testing-library.com/docs/example-react-router/

test('renders learn react link', () => {
  render(<App />);
  //const user = userEvent.setup()
  // at homepage
  expect(screen.getByText(/Basic Question/i)).toBeInTheDocument()
});