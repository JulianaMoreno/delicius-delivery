'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { MenuItem } from "@/lib/menus";

type InfoSectionProps = {
    item: MenuItem;
    quantity: number;
    handleAdd: () => void;
    handleRemove: () => void;
    total: number;
}

export default function InfoSection({item, quantity, handleAdd, handleRemove, total}: InfoSectionProps){

    return (
        <>
            <Box
            component="img"
            src={item.image || '/images/emptyItem.png'}
            alt={item.name}
            sx={{
            width: '100%',
            height: 200,
            objectFit: 'cover'
            }}
            />
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    {item.name}
                </Typography>
                {item.minimum ? 
                    (<Box sx={{ display: 'flex', alignItems: 'center', gap:1 }}>
                        <Typography variant="body2" fontWeight="bold" color="text.secondary">
                            a partir de
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" color="primary">
                            R$ {item.minimum.toFixed(2).replace('.', ',')}
                        </Typography>
                    </Box>
                    ) : (
                        <Typography variant="body1" fontWeight="bold" color="primary">
                            R$ {item.promotion?.toFixed(2).replace('.', ',') || item.price?.toFixed(2).replace('.', ',')}
                        </Typography>
                    )
                }
                <Typography variant="body2" fontWeight="semi-bold" color="text.secondary" sx={{ mb: 1 }}>
                    {item.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box>
                        <Typography variant="body1" fontWeight="bold">
                            quantos?
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap:1 }}>
                            <Typography variant="body2" fontWeight="semi-bold" color="text.secondary">
                                total
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                R$ {total.toFixed(2).replace('.', ',')}
                            </Typography>
                        </Box>
                    </Box>

                    {quantity === 0 ? (
                        <Button 
                            aria-label="adicionar-item"
                            variant="contained" 
                            onClick={handleAdd} 
                            sx={{
                                backgroundColor: '#6D6F73',
                                color: '#fff',
                                '&:hover': {
                                backgroundColor: '#5a5c5f',
                            },
                        }}>
                            adicionar
                        </Button>
                    ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton  aria-label="diminuir-quantidade" onClick={handleRemove}>
                            <DeleteOutlineOutlinedIcon sx={{ fontSize: 32, color: '#00A296'}}/>
                        </IconButton>
                        <Typography variant="body1">
                            {quantity}
                        </Typography>
                        <IconButton aria-label="aumentar-quantidade" onClick={handleAdd}>
                            <AddCircleOutlineOutlinedIcon sx={{ fontSize: 32, color: '#00A296' }}/>
                        </IconButton>
                    </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}