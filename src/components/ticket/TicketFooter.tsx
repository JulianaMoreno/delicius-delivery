import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

type TicketFooterProps = {
    valorTotal: number;
    handlePayment: () => void;
}

export default function TicketFooter({ valorTotal, handlePayment}: TicketFooterProps) {
    return(
        <Box
            sx={{
                width: '100%',
                backgroundColor: 'white',
                px: 4,
                py: 2,
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="body2" fontWeight="bold">
                        subtotal
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        R$ {valorTotal.toFixed(2).replace(".", ",")}
                    </Typography>
                </Box>
                <Button
                    aria-label='pagamento'
                    variant="contained"
                    sx={{ px: 3, borderRadius: 2, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}
                    onClick={handlePayment}
                >
                    ir para pagamento
                </Button>
            </Box>
        </Box>
    )
}