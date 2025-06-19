import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

import StoresList from '../StoresList';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('StoresList Component', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockStores = [
    { 
      id: '1', 
      name: 'Pizzaria do Centro', 
      deliveryFee: 5, 
      rating: 4.5, 
      image: '/img/pizza.png', 
      isOpen: true 
    },
    { 
      id: '2', 
      name: 'Bolo da Esquina', 
      deliveryFee: 10, 
      rating: 4.8, 
      isOpen: true 
    },
  ];

  it('should render title and stores', () => {
    render(<StoresList title="Abertos" storesItems={mockStores} />);

    expect(screen.getByText(/abertos/i)).toBeInTheDocument();
    expect(screen.getByText(/pizzaria do centro/i)).toBeInTheDocument();
    expect(screen.getByText(/bolo da esquina/i)).toBeInTheDocument();
  });

  it('should render empty text', () => {
    render(<StoresList title="Fechados" storesItems={[]} />);

    expect(screen.getByText(/nenhum item disponível/i)).toBeInTheDocument();
  });

  it('should redirect when clicked in the store card', async () => {
    render(<StoresList title="Abertos" storesItems={mockStores} />);

    const card = screen.getByText(/pizzaria do centro/i);
    await userEvent.click(card);

    expect(pushMock).toHaveBeenCalledWith('/store/1');
  });

  it('should be disabled when store is close', async () => {
    render(<StoresList title="Fechados" storesItems={mockStores} disabled />);

    const card = screen.getByText(/pizzaria do centro/i);

    expect(card.closest('button')).toHaveAttribute('disabled');
  });
});
