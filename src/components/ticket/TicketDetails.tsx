'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';

import { fetchStoreById, Store } from "@/lib/stores";
import { routes } from '@/lib/routes';

import TicketOrderItem from './TicketOrderItem';
import TicketFooter from './TicketFooter';
import SuccessDialog from './SucessDialog';


type Drink = {
  id: string;
  name: string;
  price: number;
};

type Order = {
  id: string;
  storeId: string;
  itemId: string;
  item: any;
  size: 'médio' | 'grande';
  quantity: number;
  drinks: { drink: Drink; quantity: number }[];
  drinksTotal: number;
  observation: string;
  itemTotal: number;
  orderTotal: number;
  date: string;
};

export default function TicketDetails() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [order, setOrder] = useState<Order | null>(null);
    const [store, setStore] = useState<Store>();
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setLoading(true);

        async function loadData() {
            try {
                const storedOrder = localStorage.getItem('currentOrder');
                if (storedOrder) {
                    const orderParsed = JSON.parse(storedOrder);
                    const data = await fetchStoreById(orderParsed.storeId);

                    setOrder(orderParsed);
                    setStore(data);
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

     if(loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (!order || !store) {
        return (
            <Typography 
                variant="caption" 
                fontWeight="bold" 
                sx={{ color: "text.secondary", margin: 15, alignContent: "center" }}
            >
                Não existe pedidos salvos
            </Typography>
        )
    }

    const handlePayment = () => {
        setShowSuccess(true);
    };

    const handleClose = () => {
        setShowSuccess(false);
        localStorage.removeItem('currentOrder');
        router.push(routes.home);
    }

    return(
        <Box sx={{ pt: 3, px:2 }}>
            <Box sx={{ display: 'flex', gap:1, mb: 2 }}>
                <Image src={store.image? store.image : "/images/empty.png"}
                    alt={`${store.name} image`}
                    width={32} 
                    height={32} 
                    style={{ borderRadius: '4px' }} 
                />
                <Box>
                    <Typography variant="body2" fontWeight="bold" color="text.secondary">
                        seus itens em
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                        {store.name}
                    </Typography>
                </Box>
            </Box>
            <TicketOrderItem
                key={order.id}
                order={order}
            />
            <TicketFooter 
                valorTotal={order.orderTotal}
                handlePayment={handlePayment}
            />
            { showSuccess && 
               (<SuccessDialog 
                open={showSuccess} 
                onClose={handleClose} 
                />
            )}
        </Box>
    )

}