import React from 'react';
import { render, screen } from '@testing-library/react';
import BaseApp from '../components/layout/base.jsx';
import Hello from "./hello";
//import path from 'path';
//path.resolve(__dirname, '..', 'constants')
//jest.mock('constants', () => require('../constants/'));




test('renders learn react link', () => {
  render(<BaseApp />);
  const htmlElement = screen.getByText(/login/i);
  expect(htmlElement).toBeInTheDocument();
});
