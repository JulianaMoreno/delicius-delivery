'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

type DrinkProps = {
  id: string;
  name: string;
  price: number;
};

type OrderItemProps = {
  order: {
    id: string;
    item: {
      name: string;
      price?: number;
      minimum?: number;
      promotion?: number;
    };
    size: string;
    quantity: number;
    drinks: { drink: DrinkProps; quantity: number }[];
    observation?: string;
  };
};

export default function TicketOrderItem({ order }: OrderItemProps) {
    const price = order.item.minimum || order.item.promotion || order.item.price || 0.0;
  return (
    <Box >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:1}}>
            <Typography variant='body2' fontWeight="bold">
                {order.item.name}
            </Typography>
            <Typography variant='body2' fontWeight="bold" color="primary">
                R$ {price.toFixed(2).replace(".", ",")}
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
            <IconButton sx={{ p:0 }} >
                <DeleteOutlineOutlinedIcon sx={{ fontSize: 24, color: '#00A296'}}/>
            </IconButton>
            <Typography variant="body2">
                {order.quantity}
            </Typography>
            <IconButton sx={{ p:0 }} >
                <AddCircleOutlineOutlinedIcon sx={{ p:0, fontSize: 24, color: '#00A296' }}/>
            </IconButton>
        </Box>

        <Box sx={{ mt: 1, display: 'flex', flexDirection:"column" }}>
            <Typography variant="caption" fontWeight="bold" color="text.secondary">
                • tamanho
            </Typography>
            <Typography sx={{px:1}} variant="caption" fontWeight="semi-bold" color="text.secondary">
                {order.size}
            </Typography>

            {order.drinks.length > 0 && (
            <>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">
                    • vai querer bebida?
                </Typography>
                {order.drinks.map((item) => (
                    <Box key={item.drink.id} sx={{ px: 1, display: 'flex', gap:1}}>
                        <Typography variant="caption" color="text.secondary">
                            (x {item.quantity})
                        </Typography>
                        <Typography variant="caption" fontWeight="semi-bold" color="text.secondary">
                            {item.drink.name}
                        </Typography>
                        <Typography variant="caption" fontWeight="semi-bold" color="#00A296">
                            +R${item.drink.price.toFixed(2)}
                        </Typography>
                    </Box>
                ))}
            </>
            )}

            {order.observation && (
                <Box sx={{ mt: 1, p: 0.5, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="caption" fontWeight="bold">
                        observação:
                    </Typography>
                    <Typography p={1} variant="caption" fontWeight="semi-bold">
                        {order.observation}
                    </Typography>
                </Box>
            )}
      </Box>
    </Box>
  );
}
