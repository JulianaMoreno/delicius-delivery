import { render, screen } from '@testing-library/react';
import StoreInfo from '../StoreInfo';

describe('StoreInfo component', () => {
  const mockProps = {
    name: 'Sopa da casa',
    image: '/images/sopa.png',
    deliveryFee: 0,
    rating: 4.9,
  };

  it('should render store name, image and info correctly', () => {
    render(<StoreInfo {...mockProps} />);

    expect(screen.getByText(/sopa da casa/i)).toBeInTheDocument();

    const img = screen.getByAltText(/sopa da casa image/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('sopa.png'));
    expect(screen.getAllByText(/grátis/i)).toHaveLength(2);
    expect(screen.getByText(/4.9 de 5/i)).toBeInTheDocument();

    // mocked data
    expect(screen.getByText(/30-40 min/i)).toBeInTheDocument();
    expect(screen.getByText(/5.2km/i)).toBeInTheDocument();
    expect(screen.getByText(/fecha às 20:00/i)).toBeInTheDocument();
    expect(screen.getByText(/pedido mínimo: r\$ 15,00/i)).toBeInTheDocument();
    expect(screen.getByText(/entrega grátis acima de r\$ 35,00/i)).toBeInTheDocument();
  });

  it('should show fee when has delivery fee', () => {
    render(<StoreInfo {...mockProps} deliveryFee={5.5} />);

    expect(screen.getByText(/r\$ 5,50/i)).toBeInTheDocument();
  });

  it('should render empty image when image not exist', () => {
    render(<StoreInfo {...mockProps} image={undefined} />);

    const img = screen.getByAltText(/sopa da casa image/i);
    expect(img).toHaveAttribute('src', expect.stringContaining('empty.png'));
  });
});
