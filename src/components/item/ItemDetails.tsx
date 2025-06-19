'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import Footer from "@/components/shared/Footer";
import InfoSection from './InfoSection';
import SizeSection from './SizeSection';
import DrinksSection from './DrinksSection';

import { fetchMenuItemById, MenuItem } from "@/lib/menus";
import { routes } from '@/lib/routes';
import { buildOrder } from '@/lib/order-utils';

type ItemDetailsProps = {
    storeId: string;
    itemId: string;
};

type DrinkProps = {
    id: string;
    name: string;
    price: number;
}

const drinksList = [
  { id: '1', name: 'guaraná', price: 5.0 },
  { id: '2', name: 'coca-cola', price: 6.0 },
  { id: '3', name: 'água sem gás', price: 3.0 },
];

export default function ItemDetails({storeId, itemId}: ItemDetailsProps) {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const [quantity, setQuantity] = useState(0);
    const [menuItem, setMenuItem] = useState<MenuItem|null>(null);
    const [size, setSize] = useState<'médio' | 'grande'>('médio');
    const [selectedDrinks, setSelectedDrinks] = useState<{ drink: DrinkProps; quantity: number }[]>([]);
    const [drinksTotal, setDrinksTotal] = useState(0);
    const [observation, setObservation] = useState('');

    useEffect(() => {
        async function loadData() {
          setLoading(true);
            try {
                const data = await fetchMenuItemById(itemId);
                setMenuItem(data);
            } catch (error) {
                console.error("Erro ao buscar o item:", error);
                setMenuItem(null);
            } finally {
                setLoading(false);
            }
        }
        loadData();
      }, [itemId]);
    
    const handleAdd = () => setQuantity((prev) => prev + 1);
    const handleRemove = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
    const handleSizeChange = (newSize: 'médio' | 'grande') => {
        setSize(newSize);
    };

    if(loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (!menuItem) {
        return (
            <Typography 
                variant="caption" 
                fontWeight="bold" 
                sx={{ color: "text.secondary", margin: 15, alignContent: "center" }}
            >
                Item não se encontra mais disponível
            </Typography>
        )
    }

    const basePrice = menuItem.minimum || menuItem.promotion || menuItem.price || 0;
    const finalPrice = size === 'grande' ? basePrice + 2 : basePrice;
    const total = finalPrice * quantity;

    const handleCreateOrder = () => {
        const order = buildOrder({
            storeId,
            itemId,
            item: menuItem,
            size,
            quantity,
            selectedDrinks,
            drinksTotal,
            observation,
            itemTotal: total,
        });

        try {
            localStorage.setItem('currentOrder', JSON.stringify(order));
            router.push(routes.ticket);
        } catch (error) {
            console.error("Erro ao salvar o pedido:", error);
        }
    };
    
  return (
    <>
        <InfoSection 
            item={menuItem}
            quantity={quantity}
            handleAdd={() => handleAdd()}
            handleRemove={() => handleRemove()}
            total={total}
        />
        <Divider />
        <SizeSection
            price={basePrice}
            onSizeChange={handleSizeChange}
        />
        <Divider />
        <DrinksSection 
            drinks={drinksList} 
            onTotalChange={setDrinksTotal}
            onDrinksChange={setSelectedDrinks}
        />
        <Divider />
        <Box sx={{ p: 2 }}>
            <TextField
                aria-label='adicionar-observacao'
                fullWidth
                multiline
                minRows={2}
                maxRows={3}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="alguma observação do item? • opcional. ex: tirar algum ingrediente, ponto do prato..."
                variant="outlined"
                sx={{
                    "& .MuiInputBase-input": {
                        fontSize: '14px',
                        color: '#6D6F73',
                    }
                }}
            />
        </Box>
        <Footer 
            shouldShowButton={quantity > 0} 
            onClick={handleCreateOrder}
        />
    </>
  );

}