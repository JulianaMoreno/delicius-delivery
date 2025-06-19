import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type SuccessDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function SuccessDialog({ open, onClose }: SuccessDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <CheckCircleIcon sx={{ fontSize: 60, color: 'green' }} />
        <DialogTitle sx={{ mt: 1 }}>
            Pedido realizado com sucesso!
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Em breve sua comida estará sendo preparada 🍽️
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
          <Button aria-label='novo-pedido' variant="contained" onClick={onClose}>
            Fazer novo Pedido
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
