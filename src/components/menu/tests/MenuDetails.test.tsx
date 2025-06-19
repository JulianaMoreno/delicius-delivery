import { render, screen, waitFor } from '@testing-library/react';
import * as storesApi from '@/lib/stores';
import * as menusApi from '@/lib/menus';

import MenuDetails from '../MenuDetails';

jest.mock('@/lib/stores');
jest.mock('@/lib/menus');

//Router do Next
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('MenuDetails', () => {
  const mockStore = {
    id: '1',
    name: 'Sopa da Casa',
    deliveryFee: 0,
    rating: 4.9,
  };

  const mockMenu = [
    {
      name: 'Sopas',
      description: 'Nossas deliciosas sopas',
      hasPromotion: true,
      items: [
        {
          id: 'item1',
          name: 'Sopa de Feijão',
          description: 'Caldinho de feijão e muita calabresa',
          price: 20,
          promotion: 15,
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading', async () => {
    (storesApi.fetchStoreById as jest.Mock).mockReturnValue(
      new Promise(() => {})
    );

    render(<MenuDetails storeId="1" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render empty text when store is null', async () => {
    (storesApi.fetchStoreById as jest.Mock).mockResolvedValue(null);
    (menusApi.fetchMenuByStoreId as jest.Mock).mockResolvedValue([]);

    render(<MenuDetails storeId="invalid" />);

    await waitFor(() => {
      expect(screen.getByText(/loja não encontrada/i)).toBeInTheDocument();
    });
  });

  it('should render store and menu correctly', async () => {
    (storesApi.fetchStoreById as jest.Mock).mockResolvedValue(mockStore);
    (menusApi.fetchMenuByStoreId as jest.Mock).mockResolvedValue(mockMenu);

    render(<MenuDetails storeId="1" />);

    await waitFor(() => {
      expect(screen.getByText(/sopa da casa/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/nossas deliciosas sopas/i)).toBeInTheDocument();
    expect(screen.getByText(/sopa de feijão/i)).toBeInTheDocument();
    expect(screen.getByText(/caldinho de feijão e muita calabresa/i)).toBeInTheDocument();
  });

});
