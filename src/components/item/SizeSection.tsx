import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

type SizeSectionProps = {
    price: number;
    onSizeChange?: (size: 'médio' | 'grande') => void;
};

export default function SizeSection({ price, onSizeChange }: SizeSectionProps) {
    const [selectedSize, setSelectedSize] = useState<'médio' | 'grande'>('médio');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as 'médio' | 'grande';
        setSelectedSize(value);
        if (onSizeChange) {
            onSizeChange(value);
        }
    };

    const formatPrice = (value: number) => {
        return `R$ ${value.toFixed(2).replace('.', ',')}`;
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box>
                    <Typography variant="body1" fontWeight="bold">
                        qual o tamanho?
                    </Typography>
                    <Typography component="p" lineHeight={1} variant="caption" color="text.secondary" mb={2}>
                        escolha 1
                    </Typography>
                </Box>
                <Box 
                    sx={{
                        display: 'flex', 
                        alignItems: 'center', 
                        backgroundColor: "#393A3C", 
                        borderRadius: 1, 
                        p: 0.5,
                        width: 'fit-content',
                    }}>
                    <Typography color="white" variant="caption" fontWeight="bold">
                        obrigatório
                    </Typography>
                </Box>
            </Box>
            <RadioGroup
                value={selectedSize}
                onChange={handleChange}
                sx={{ mt: 2 }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControlLabel
                        value="médio"
                        control={<Radio />}
                        label={
                            <Typography color="text.secondary" variant='body2'>
                                médio
                            </Typography>
                        }
                    />
                    <Typography variant="body2" fontWeight="regular" color="primary">
                        {formatPrice(price)}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControlLabel
                        value="grande"
                        control={<Radio />}
                        label={
                            <Typography color="text.secondary" variant='body2'>
                                grande
                            </Typography>
                        }
                    />
                    <Typography variant="body2" fontWeight="bold" color="primary">
                        {formatPrice(price + 2)}
                    </Typography>
                </Box>
            </RadioGroup>
        </Box>
    );
}
