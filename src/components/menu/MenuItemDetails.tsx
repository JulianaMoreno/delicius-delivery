import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MenuItem } from "@/lib/menus";

type MenuItemDetailsProps = {
  item: MenuItem;
  idx: number;
  onClickItem?: () => void;
};

export default function MenuItemDetails({item, idx, onClickItem}: MenuItemDetailsProps) {

    function formatPrice(value?: number) {
        return value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return(
        <Box 
            key={idx} 
            data-testid={`menu-item-details-${item.id}`}
            onClick={onClickItem}
            sx={{ 
                px: 1, 
                pb: 3, 
                display: 'flex', 
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                    backgroundColor: '#f9f9f9',
                },
            }}
        >
            <Box sx={{ maxWidth: '70%' }}>
                <Typography variant="body2" fontWeight="bold">
                    {item.name}
                </Typography>
                {item.description && (
                    <Typography 
                        component="p"
                        variant="caption" 
                        fontWeight="regular" 
                        color="text.secondary"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: 1.2,
                        }}
                    >
                        {item.description}
                    </Typography>
                )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
                {item.promotion ? (
                    <>
                    <Typography
                        variant="caption"
                        fontWeight="bold"
                        sx={{
                            textDecoration: 'line-through',
                            color: 'text.secondary',
                        }}
                    >
                        {formatPrice(item.price)}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: "#02A117" }}>
                        {formatPrice(item.promotion)}
                    </Typography>
                    </>
                ) : item.minimum ? (
                    <>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: "#6D6F73"}}>
                            A partir de 
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" sx={{ color: "custom.textBlue" }}>
                            {formatPrice(item.minimum)}
                        </Typography>
                    </>
                ) : (
                    <Typography variant="body2" fontWeight="bold" sx={{ color: "custom.textBlue" }}>
                        {formatPrice(item.price)}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}