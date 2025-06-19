import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import Header from '../Header';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header component', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render address', () => {
    render(<Header address="Rua Teste, 123" />);

    const address = screen.getByText('Rua Teste, 123');
    expect(address).toBeInTheDocument();
  });

  it('should redirect to Home when logo is clicked', async () => {
    render(<Header address="Rua Teste, 123" />);

    const logoButton = screen.getByRole('button', { name: /logo/i });
    await userEvent.click(logoButton);

    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('should render the fixed text', () => {
    render(<Header address="Rua Teste, 123" />);

    const deliveringText = screen.getByText(/entregando em/i);
    expect(deliveringText).toBeInTheDocument();
  });

  it('should render profile button', () => {
    render(<Header address="Rua Teste, 123" />);

    const profileButton = screen.getAllByRole('button');
    expect(profileButton.length).toBeGreaterThanOrEqual(2);
  });
});
