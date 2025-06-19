'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

type Drink = {
  id: string;
  name: string;
  price: number;
};

type SelectedDrink = {
  drink: Drink;
  quantity: number;
};

type DrinksSectionProps = {
  drinks: Drink[];
  onDrinksChange: (selectedDrinks: SelectedDrink[]) => void;
  onTotalChange: (total: number) => void;
};

export default function DrinksSection({ drinks, onTotalChange, onDrinksChange }: DrinksSectionProps) {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  function selectDrinks(drinks: Drink[]){
    return drinks
        .filter((drink) => (quantities[drink.id] || 0) > 0)
        .map((drink) => ({
            drink,
            quantity: quantities[drink.id] || 0,
        }));
  }

  useEffect(() => {
    const total = drinks.reduce((acc, drink) => {
      const qty = quantities[drink.id] || 0;
      return acc + qty * drink.price;
    }, 0);

    onTotalChange(total);
    onDrinksChange(selectDrinks(drinks));

  }, [quantities, drinks, onTotalChange, onDrinksChange]);

  const handleAdd = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemove = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body1" fontWeight="bold">
        vai querer bebida?
      </Typography>
      <Typography component="p" lineHeight={1} variant="caption" color="text.secondary" mb={2} >
        escolha quantos quiser
      </Typography>
      <Box sx={{ mt: 2 }}>
        {drinks.map((drink) => (
          <Box
            key={drink.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label="remover-bebida" onClick={() => handleRemove(drink.id)}>
                <RemoveCircleOutlineOutlinedIcon sx={{ fontSize: 24, color: 'disabled' }}/>
              </IconButton>
              <Typography sx={{ width: 20, textAlign: 'center' }}>
                {quantities[drink.id] || 0}
              </Typography>
              <IconButton aria-label="adicionar-bebida" onClick={() => handleAdd(drink.id)}>
                <AddCircleOutlineOutlinedIcon sx={{ fontSize: 24, color: '#00A296' }}/>
              </IconButton>
              <Typography variant='body2' fontWeight="semi-bold" color="text.secondary">
                {drink.name}
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight="bold" color="primary">
              +R${drink.price.toFixed(2).replace('.', ',')}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider />
    </Box>
  );
}
