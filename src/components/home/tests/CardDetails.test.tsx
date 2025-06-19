import { render, screen } from '@testing-library/react';
import CardDetails from '../CardDetails';

describe('CardDetails', () => {

  it('should render moto icon and gratis text when fee is zero', () => {
    render(<CardDetails deliveryFee={0} rating={4.5} />);

    expect(screen.getByText(/grátis/i)).toBeInTheDocument();
    expect(screen.getByTestId('StarRateIcon')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should render icon and delivery fee when fee is not zero', () => {
    render(<CardDetails deliveryFee={5.99} rating={3.8} />);

    expect(screen.getByText('R$ 5,99')).toBeInTheDocument();
    expect(screen.getByTestId('StarRateIcon')).toBeInTheDocument();


    expect(screen.getByText('3.8')).toBeInTheDocument();
  });
});
