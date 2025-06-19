'use client';

import { useRouter } from 'next/navigation';
import Accordion from '@mui/material/Accordion';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItemDetails from './MenuItemDetails';
import { routes } from '@/lib/routes';

import { MenuGroup } from "@/lib/menus";

type MenuListProps = {
  menu: MenuGroup[];
  storeId: string;
};

export default function MenuList({ storeId, menu }: MenuListProps) {
  const router = useRouter();

  const handleNavigate = (itemId: string) => {
    router.push(routes.storeItem(storeId, itemId));
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '40vh'
      }}
    >
      {menu.map((produto, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body1" fontWeight="bold">
                  {produto.name}
                </Typography>
                {produto.hasPromotion && (
                  <LocalOfferIcon sx={{ color: "#02A117", fontSize: 16 }}/>
                )}
              </Box>
              {produto.description && (
                <Typography variant="caption" fontWeight="semi-bold" color="text.secondary">
                  {produto.description}
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {produto.items && produto.items.length > 0 ? 
              (
                produto.items.map((item, idx) => 
                  (
                    <MenuItemDetails 
                      key={idx} 
                      item={item} 
                      idx={idx}
                      onClickItem={() => handleNavigate(item.id)}
                      />
                  )
                )
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Nenhum item disponível.
                </Typography>
              )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
