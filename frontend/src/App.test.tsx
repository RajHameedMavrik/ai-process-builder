import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Generate Diagram button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Generate Diagram/i);
  expect(buttonElement).toBeInTheDocument();
});
