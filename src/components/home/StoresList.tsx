'use client';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardDetails from './CardDetails';
import { routes } from '@/lib/routes';
import { Store } from "@/lib/stores";

type StoresListProps = {
    title: string;
    storesItems: Store[];
    disabled?: boolean;
};

export default function StoresList({ title, storesItems, disabled }: StoresListProps) {
    const router = useRouter();

    const handleNavigate = (storeId: string) => {
        router.push(routes.store(storeId));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography 
                variant="h6" 
                fontWeight="bold" 
                sx={{ color: "primary", marginBottom: 2 }}
            >
                {title}
            </Typography>
            {storesItems.length == 0 ?
                (
                    <Typography 
                        variant="caption" 
                        fontWeight="bold" 
                        sx={{ color: "text.secondary" }}
                    >
                        Nenhum item disponível
                    </Typography>
                )
                : (storesItems.map((store) => (
                    <Card key={store.id} sx={{ display: 'flex', marginBottom: 2 }}>
                        <CardActionArea
                            disabled={disabled}
                            onClick={() => { handleNavigate(store.id) }}
                            sx={{
                                backgroundColor: "custom.background",
                                padding: 0,
                            }}
                        >
                            <Box sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 72, height: 72, opacity: disabled ? 0.3 : 1 }}
                                    image={store.image ? store.image : '/images/emptyimage.png'}
                                    alt={`${store.name} image`}
                                />
                                <Box sx={{ flex: '0 0 auto', p: 1.5 }}>
                                    <Typography variant="body1" fontWeight="bold">
                                        {store.name}
                                    </Typography>
                                    <CardDetails
                                        deliveryFee={store.deliveryFee}
                                        rating={store.rating}
                                    />
                                </Box>
                            </Box>
                        </CardActionArea>
                    </Card>
                )))
            }
        </Box>
    )
}
