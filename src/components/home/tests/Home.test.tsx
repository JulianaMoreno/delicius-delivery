import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as storesApi from '@/lib/stores';

import Home from '../Home';

//Router do Next
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/lib/stores', () => ({
  fetchStores: jest.fn(),
}));

describe('Home Component', () => {
  const mockStores = [
    { id: '1', name: 'Pizzaria', deliveryFee: 2.99, isOpen: true },
    { id: '2', name: 'Lanchonete', deliveryFee: 5.99, isOpen: false },
  ];

  beforeEach(() => {
    (storesApi.fetchStores as jest.Mock).mockResolvedValue(mockStores);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    render(<Home />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  })

  it('should fetch and display stores after loading', async () => {
    render(<Home />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    expect(screen.getByAltText(/banner/i)).toBeInTheDocument();
    expect(screen.getByText(/pizzaria/i)).toBeInTheDocument();
    expect(screen.getByText(/lanchonete/i)).toBeInTheDocument();
    expect(screen.getByText(/delicius delivery LTDA/i)).toBeInTheDocument();
  });

  it('should filter by search text', async () => {
    render(<Home />);

    const input = await screen.findByLabelText('search-store');

    await userEvent.type(input, 'Pizza');

    expect(screen.getByText(/pizzaria/i)).toBeInTheDocument();
    expect(screen.queryByText(/lanchonete/i)).not.toBeInTheDocument();
  });
});
