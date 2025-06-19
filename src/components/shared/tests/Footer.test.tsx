import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from '../Footer';

const renderWithTheme = (ui: React.ReactElement) => {
  const theme = createTheme({
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#f5f5f5' },
      custom: { textBlue: '#800080' } as any,
    },
  });

  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Footer Component', () => {
  it('should render fixed text', () => {
    renderWithTheme(<Footer shouldShowButton={false} />);

    expect(screen.getByText(/delicius-delivery.com/i)).toBeInTheDocument();
    expect(screen.getByText(/delicius delivery LTDA/i)).toBeInTheDocument();
  });

  it('should render button whenshouldShowButton is true', async () => {
    renderWithTheme(<Footer shouldShowButton={true} />);

    expect(await screen.findByLabelText(/ver-ticket/)).toBeInTheDocument();
  });

  it('should not render button when shouldShowButton is false', async () => {
    renderWithTheme(<Footer shouldShowButton={false} />);

    expect(screen.queryByLabelText(/ver-ticket/)).not.toBeInTheDocument();
  });

  it('onClick when button is clicked', async () => {
    const handleClick = jest.fn();

    renderWithTheme(<Footer shouldShowButton={true} onClick={handleClick} />);

    const button = await screen.findByLabelText(/ver-ticket/);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
