'use client';
import { useEffect, useState } from "react";
import Image from "next/image"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from "@mui/icons-material/Search";

import Footer from "@/components/shared/Footer";
import theme from "@/theme";
import StoresList from "./StoresList";

import { fetchStores, Store } from "@/lib/stores";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchStores();
        setStores(data);
      } catch (error) {
          console.error("Erro ao buscar o item:", error);
          setStores([]);
      } finally {
          setLoading(false);
      }
    }
    loadData();
  }, []);

  if(loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        )
    }

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          px:2,
          pb:2
        }}
      >
        <TextField 
          id="select" 
          placeholder="busque pela loja ou culinária" 
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="disabled"/>
                </InputAdornment>
              ),
              'aria-label': 'search-store'
            },
          }}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          width: { xs:"390px", sm:"100%" },
          maxWidth: {sm:"1200px"},
          height: { xs: "130px", sm: "auto" },
          aspectRatio: { xs: "auto", sm: "16/5" },
          margin: "0 auto"
        }}
      >
        <Image 
          src="/images/banner.png" 
          alt="Banner" 
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 600px) 390px, 100vw"
          priority
        />
      </Box>
      <Box
        sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '60vh',
            flex: 1 
        }}
      >
        <StoresList 
          title="abertos" 
          storesItems={filteredStores.filter((s) => s.isOpen)}
        />
        <StoresList 
          title="fechados" 
          storesItems={filteredStores.filter((s) => !s.isOpen)}
          disabled
        />
      </Box>
      <Footer shouldShowButton={false} />
    </>
  );
}
