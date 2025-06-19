'use client';
import { useRouter } from 'next/navigation';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';
import { routes } from '@/lib/routes';

type HeaderProps = {
    address: string;
  };

export default function Header({ address }: HeaderProps) {
  const router = useRouter();

   const handleNavigate = () => {
        router.push(routes.home);
    };

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      sx={{ py: 1 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between'}} >
        <IconButton aria-label="logo" sx={{ padding: 0 }} onClick={() => { handleNavigate() }}>
          <Image src="/asset/logoWhite.png" alt="Logo" width={36} height={36} />
        </IconButton>
        <Box display="flex" alignItems="center" sx={{ gap: '10px'}}>
          <LocationOnIcon sx={{ fontSize: 16,color: 'white' }} />
          <Box>
            <Typography variant="body2" sx={{color: "custom.lightBlue"}}>
              entregando em
            </Typography>
            <Box alignItems="center"  display="flex" sx={{ gap: '4px'}}>
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                {address}
              </Typography>
              <ChevronRightIcon sx={{ fontSize: 16, color: 'white' }} />
            </Box>
          </Box>
        </Box>
        <IconButton sx={{ padding: 0 }}>
          <PersonOutlineIcon sx={{ fontSize: 24, color: 'white' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}