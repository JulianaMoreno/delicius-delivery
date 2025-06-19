import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { routes } from '@/lib/routes';
import { useRouter } from 'next/navigation';

import MenuList from '../MenuList';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
});

afterEach(() => {
  jest.clearAllMocks();
});

const mockMenu = [
  {
    name: 'Bebidas',
    description: 'Refrigerantes',
    hasPromotion: true,
    items: [
      { id: '1', name: 'Coca-Cola', description: 'lata' },
      { id: '2', name: 'Guaraná', description: 'lata' },
    ],
  },
  {
    name: 'Sobremesas',
    hasPromotion: false,
    items: [],
  },
];

describe('MenuList', () => {
  it('should render the menu correctly', () => {
    render(<MenuList storeId="123" menu={mockMenu} />);
    
    expect(screen.getByText(/bebidas/i)).toBeInTheDocument();
    expect(screen.getByText(/sobremesas/i)).toBeInTheDocument();
    expect(screen.getByText(/refrigerantes/i)).toBeInTheDocument();
    expect(screen.getByText(/coca-cola/i)).toBeInTheDocument();
    expect(screen.getByText(/guaraná/i)).toBeInTheDocument();
    expect(screen.getByText(/nenhum item disponível/i)).toBeInTheDocument();
  });

  it('should redirect when a item is clicked', async () => {
    render(<MenuList storeId="123" menu={mockMenu} />);
    const user = userEvent.setup();

    const item = screen.getByText(/coca-cola/i);
    await user.click(item);

    expect(pushMock).toHaveBeenCalledWith(
      routes.storeItem('123', '1')
    );
  });
});
