'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import RoomServiceIcon from '@mui/icons-material/RoomService';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StarRateIcon from '@mui/icons-material/StarRate';

type CardDetailsProps = {
    deliveryFee: number;
    rating: number;
}

export default function CardDetails({deliveryFee, rating}: CardDetailsProps) {
    const deliveryText = deliveryFee === 0 ? "grátis" : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;

    return (
        <Box display="flex" gap={1}>
            <Box display="flex" alignItems="center" gap={1}>
                {deliveryFee === 0 
                    ? <RoomServiceIcon sx={{ fontSize: 20 }} /> 
                    : <DeliveryDiningIcon sx={{ fontSize: 20 }}/>
                }
                <Typography variant="body2" fontWeight="bold">{deliveryText}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
                <StarRateIcon sx={{ fontSize: 16 }}/>
                <Typography color="#6D6F73" variant="body2" fontWeight="bold">{rating}</Typography>
            </Box>
        </Box>
    )
}