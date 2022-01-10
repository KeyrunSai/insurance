import { render, screen } from '@testing-library/react';
import Login from '../components/Login';

test('Render signin button', () => {
  render(<Login />);
  const linkElement = screen.getAllByText(/Sign in to your account/i)[0] //getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
