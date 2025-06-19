'use client';
import { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

import Footer from "@/components/shared/Footer";

import StoreInfo from './StoreInfo';
import MenuList from './MenuList';

import { fetchStoreById, Store } from "@/lib/stores";
import { fetchMenuByStoreId, MenuGroup} from "@/lib/menus";

type MenuDetailsProps = {
    storeId: string;
  };

export default function Menu({storeId}: MenuDetailsProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [store, setStore] = useState<Store|null>(null);
    const [menu, setMenu] = useState<MenuGroup[]>([]);

    useEffect(() => {
    if (!storeId) return;

    async function loadData() {
        setLoading(true);
        try {
            const storeData = await fetchStoreById(storeId);

            if (!storeData) {
            setStore(null);
            setMenu([]);
            return;
            }

            const menuData = await fetchMenuByStoreId(storeId);
            setStore(storeData);
            setMenu(menuData);
        } catch (error) {
            console.error("Erro ao buscar o item:", error);
            setStore(null);
            setMenu([]);
        } finally {
            setLoading(false);
        }
    }
    loadData();
    }, [storeId]);

    if(loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (!store) {
        return (
            <Typography 
                variant="caption" 
                fontWeight="bold" 
                sx={{ color: "text.secondary", margin: 15, alignContent: "center" }}
            >
                Loja não encontrada
            </Typography>
        )
    }
    
    return (
        <Box>
            <StoreInfo 
                name={store.name}
                image={store.image}
                deliveryFee={store.deliveryFee}
                rating={store.rating}
            />
            <Box sx={{ mb: 10}}>
                <MenuList storeId={storeId} menu={menu}/>
            </Box>
            <Footer shouldShowButton={false} />
        </Box>
    )
}
