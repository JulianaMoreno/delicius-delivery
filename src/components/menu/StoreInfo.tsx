'use client';

import RoomServiceIcon from '@mui/icons-material/RoomService';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ShareOutlineIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dot from '@/components/shared/Dot';

import Image from 'next/image';

type StoreInfoProps = {
    name: string;
    image?: string;
    deliveryFee: number;
    rating: number;
};

export default function StoreInfo({name, image, deliveryFee, rating}: StoreInfoProps) {

    return (
        <Box sx={{py:3, px: 2}}>
            <Box sx={{ display: 'flex', gap:1, mb: 1 }}>
                <Image src={image? image : "/images/empty.png"}
                    alt={`${name} image`}
                    width={36} 
                    height={36} 
                    style={{ borderRadius: '4px' }} 
                />
                <Typography variant="h6" fontWeight="bold">
                    {name}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <ShareOutlineIcon sx={{ color: "primary.main" }} />
                    <FavoriteBorderIcon sx={{ color: "primary.main" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Typography variant="caption" fontWeight="bold" color='primary.main'>
                        mais infos
                    </Typography>
                    <ChevronRightIcon sx={{ fontSize: 8, color: '#00A296' }} />
                </Box>
            </Box>
            <Box sx={{ my:1}}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {deliveryFee === 0 
                            ? <RoomServiceIcon sx={{ fontSize: 20 }} /> 
                            : <DeliveryDiningIcon sx={{ fontSize: 20 }}/>
                        }
                        <Typography 
                            variant="body2" 
                            fontWeight="bold"
                        >
                            {deliveryFee === 0 ? "grátis" : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                        </Typography>
                        <ChevronRightIcon sx={{ fontSize: 8, color: "primary.main" }} />
                    </Box>
                    <Dot />
                    <Typography 
                        variant="caption" 
                        fontWeight="bold" 
                        sx={{ color: "#6D6F73", lineHeight: 1.5 }}
                    >
                        hoje, 30-40 min
                    </Typography>
                    <Dot />
                    <Typography 
                        variant="caption" 
                        fontWeight="bold" 
                        sx={{ color: "#6D6F73", lineHeight: 1.5 }}
                    >
                        5.2km
                    </Typography>
                </Box>
                <Box 
                    sx={{
                        my:1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        backgroundColor: "#F2FAFA", 
                        borderRadius: 0.1, 
                        p: 1,
                        width: 'fit-content',
                    }}>
                    <Typography sx={{ color: "#027A7A"}} variant="caption" fontWeight="bold">
                        entrega grátis acima de R$ 35,00
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Image 
                                src="/asset/star.png" 
                                alt="avaliação dos clientes"
                                width={16} 
                                height={16}
                            />
                        <Typography variant="body2" fontWeight="bold" sx={{ color: "#6D6F73" }} >
                            {`${rating} de 5`}
                        </Typography>
                        <ChevronRightIcon sx={{ fontSize: 8, color: "#6D6F73" }} />
                    </Box>
                    <Dot />
                    <Typography 
                        variant="caption" 
                        fontWeight="bold" 
                        sx={{ color: "#02A117", lineHeight: 1.5 }}
                    >
                        fecha às 20:00
                    </Typography>
                </Box>
                <Typography 
                    variant="caption" 
                    fontWeight="bold" 
                    sx={{ color: "#6D6F73", lineHeight: 1.5 }}
                >
                    pedido mínimo: R$ 15,00
                </Typography>
            </Box>
        </Box>   
    )
}