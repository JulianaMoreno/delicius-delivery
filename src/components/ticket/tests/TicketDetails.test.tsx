import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import * as storesApi from '@/lib/stores';

import TicketDetails from '../TicketDetails';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/stores', () => ({
  fetchStoreById: jest.fn(),
}));

const push = jest.fn();

const mockStore = {
  id: '1',
  name: 'Casa da sopa',
  image: '/images/test.png',
};

const mockOrder = {
  id: 'timestamp1',
  storeId: '1',
  itemId: 'item1',
  item: { name: 'Sopa de feijão', price: 20 },
  size: 'médio',
  quantity: 2,
  drinks: [],
  drinksTotal: 0,
  observation: 'adicional de torresmo',
  itemTotal: 40,
  orderTotal: 40,
  date: '2025-05-26',
};

describe('TicketDetails', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should show loading', async () => {
    localStorage.setItem('currentOrder', JSON.stringify(mockOrder));
    (storesApi.fetchStoreById as jest.Mock).mockReturnValue(new Promise(() => {}));
  
      render(<TicketDetails />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

  it('should render empty message when order not exist', async () => {
    (storesApi.fetchStoreById as jest.Mock).mockResolvedValue(mockStore);
    render(<TicketDetails />);

    await waitFor(() => {
      expect(screen.getByText(/não existe pedidos salvos/i)).toBeInTheDocument();
    });
  });

  it('should render order details', async () => {
    (storesApi.fetchStoreById as jest.Mock).mockResolvedValue(mockStore);
    localStorage.setItem('currentOrder', JSON.stringify(mockOrder));

    render(<TicketDetails />);

    await waitFor(() => {
      expect(screen.getByText(/seus itens em/i)).toBeInTheDocument();
      expect(screen.getByText(/casa da sopa/i)).toBeInTheDocument();
      expect(screen.getByText(/sopa de feijão/i)).toBeInTheDocument();
      expect(screen.getByText(/tamanho/i)).toBeInTheDocument();
      expect(screen.getByText(/médio/i)).toBeInTheDocument();
      expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
      expect(screen.getByText(/40/i)).toBeInTheDocument();
      expect(screen.getByText(/ir para pagamento/i)).toBeInTheDocument();
    });
  });

  it('should shows success dialog after clicking on button', async () => {
    (storesApi.fetchStoreById as jest.Mock).mockResolvedValue(mockStore);
    localStorage.setItem('currentOrder', JSON.stringify(mockOrder));

    render(<TicketDetails />);

    const pagarButton = await screen.findByLabelText(/pagamento/);
    fireEvent.click(pagarButton);

    expect(await screen.findByText(/pedido realizado com sucesso/i)).toBeInTheDocument();
  });

  it('closes success dialog, clears localStorage and navigates home', async () => {
    (storesApi.fetchStoreById as jest.Mock).mockResolvedValue(mockStore);
    localStorage.setItem('currentOrder', JSON.stringify(mockOrder));

    render(<TicketDetails />);

    const pagarButton = await screen.findByLabelText(/pagamento/);
    fireEvent.click(pagarButton);

    const dialog = await screen.findByText(/pedido realizado com sucesso/i);
    expect(dialog).toBeInTheDocument();

    const closeButton = await screen.findByLabelText(/novo-pedido/);
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(localStorage.getItem('currentOrder')).toBeNull();
      expect(push).toHaveBeenCalledWith('/');
    });
  });
});
