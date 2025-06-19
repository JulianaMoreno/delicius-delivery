'use client';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type FooterProps = {
    shouldShowButton: boolean;
    onClick?: () => void;
  };

export default function Footer({ shouldShowButton, onClick }: FooterProps) {
   return(
        <Box
            sx={{
              backgroundColor: "secondary.main",
              textAlign: 'center',
              px: 2,
              py: 3
            }}
          >
            <Typography variant="body2" sx={{ color: "custom.textBlue", paddingBottom: 1 }}>
                delicius-delivery.com
            </Typography>
            { shouldShowButton ?
                <Button 
                  aria-label="ver-ticket"
                  variant="contained" 
                  fullWidth 
                  sx={{ bgcolor: "primary.main"}}
                  onClick={onClick}
                >
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                        ver ticket
                    </Typography>
                </Button>
                :
              <Typography variant="body1" sx={{ color: "custom.textBlue" , fontWeight: 600 }}>
                 Todos os direitos reservados © 2020-2025 delicius delivery LTDA 
              </Typography>
            }
        </Box>
   )
}