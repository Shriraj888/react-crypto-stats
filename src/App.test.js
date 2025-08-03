import { render, screen } from '@testing-library/react';
import App from './App';

test('renders crypto tracker heading', () => {
  render(<App />);
  const heading = screen.getByText(/Track Your/i);
  expect(heading).toBeInTheDocument();
});
