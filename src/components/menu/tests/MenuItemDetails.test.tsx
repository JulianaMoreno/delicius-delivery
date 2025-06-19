import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuItemDetails from '../MenuItemDetails';

describe('MenuItemDetails', () => {
  it('renders item name and description', () => {
    const mockItem = {
      id: '1',
      name: 'Sanduiche de Queijo',
      description: 'Pao e dois queijos',
      price: 30,
    };

    render(<MenuItemDetails item={mockItem} idx={0} />);

    expect(screen.getByText(/sanduiche de queijo/i)).toBeInTheDocument();
    expect(screen.getByText(/pao e dois queijos/i)).toBeInTheDocument();
    expect(screen.getByText(/r\$ 30,00/i)).toBeInTheDocument();
  });

  it('renders promotion price correctly', () => {
    const mockItem = {
      id: '2',
      name: 'Pastel de Frango',
      price: 20,
      promotion: 15,
    };

    render(<MenuItemDetails item={mockItem} idx={1} />);

    expect(screen.getByText(/pastel de frango/i)).toBeInTheDocument();
    expect(screen.getByText(/r\$ 20,00/i)).toHaveStyle('text-decoration: line-through');
    expect(screen.getByText(/r\$ 15,00/i)).toBeInTheDocument();
  });

  it('renders minimum price correctly', () => {
    const mockItem = {
      id: '3',
      name: 'Combo',
      description: 'lanche, batata frita e refrigerante',
      price: 54,
      minimum: 50,
    };

    render(<MenuItemDetails item={mockItem} idx={2} />);

    expect(screen.getByText(/combo/i)).toBeInTheDocument();
    expect(screen.getByText(/lanche, batata frita e refrigerante/i)).toBeInTheDocument();
    expect(screen.getByText(/a partir de/i)).toBeInTheDocument();
    expect(screen.getByText(/r\$ 50,00/i)).toBeInTheDocument();
  });

  it('calls onClickItem when clicked', async () => {
    const handleClick = jest.fn();

    const mockItem = {
      id: '4',
      name: 'Bolo de Chocolate',
      price: 10,
    };

    const user = userEvent.setup();

    render(<MenuItemDetails item={mockItem} idx={3} onClickItem={handleClick} />);

    const item = screen.getByTestId('menu-item-details-4');
    await user.click(item);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
