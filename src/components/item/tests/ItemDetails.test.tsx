import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import * as menusApi from '@/lib/menus';
import * as orderUtils from '@/lib/order-utils';

import ItemDetails from '../ItemDetails';

jest.mock('@/lib/menus');
jest.mock('@/lib/order-utils');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ItemDetails Component', () => {
  const mockItem = {
    id: 'item1',
    name: 'Sopa de Feijão',
    description: 'Feijão, legumes e temperos',
    price: 20,
    promotion: 15,
    minimum: null,
  };

  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  it('should show loading', async () => {
    (menusApi.fetchMenuItemById as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<ItemDetails storeId="1" itemId="item1" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render empty text when item is null', async () => {
    (menusApi.fetchMenuItemById as jest.Mock).mockResolvedValue(null);

    render(<ItemDetails storeId="1" itemId="invalid" />);

    await waitFor(() => {
      expect(screen.getByText(/item não se encontra mais disponível/i)).toBeInTheDocument();
    });
  });

  it('should render item details correctly', async () => {
    (menusApi.fetchMenuItemById as jest.Mock).mockResolvedValue(mockItem);
    render(<ItemDetails storeId="1" itemId="item1" />);

    expect(await screen.findByText(/sopa de feijão/i)).toBeInTheDocument();
    expect(await screen.findByText(/qual o tamanho?/i)).toBeInTheDocument();
    expect(await screen.findByText(/vai querer bebida?/i)).toBeInTheDocument();
    expect(await screen.findByLabelText('adicionar-item')).toBeInTheDocument();
    expect(await screen.findByLabelText('adicionar-observacao')).toBeInTheDocument();
  });

   it('should accepts adding an observation', async () => {
    (menusApi.fetchMenuItemById as jest.Mock).mockResolvedValue(mockItem);
    render(<ItemDetails storeId="1" itemId="item1" />);

    const textarea = await screen.findByPlaceholderText(/alguma observação do item/i);
    fireEvent.change(textarea, { target: { value: 'com bastante cebolinha' } });
    expect(textarea).toHaveValue('com bastante cebolinha');
  });

  it('creates the order and navigates to ticket page', async () => {
    (menusApi.fetchMenuItemById as jest.Mock).mockResolvedValue(mockItem);
    render(<ItemDetails storeId="1" itemId="item1" />);

    await screen.findByText(/sopa de feijão/i);

    const addButton = await screen.findByLabelText('adicionar-item');
    fireEvent.click(addButton);

    const footerButton = await screen.findByLabelText('ver-ticket');
    fireEvent.click(footerButton);

    await waitFor(() => {
      expect(orderUtils.buildOrder).toHaveBeenCalled();
      expect(push).toHaveBeenCalledWith('/ticket');
    });
  });

});
