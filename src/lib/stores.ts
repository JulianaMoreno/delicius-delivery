import stores from "@/data/stores.json";

export type Store = {
  id: string;
  name: string;
  image?: string;
  deliveryFee: number;
  rating: number;
  isOpen: boolean;
};

export async function fetchStores(): Promise<Store[]> {
  return stores;
}

export async function fetchStoreById(id: string): Promise<Store | undefined> {
  return stores.find((store) => store.id === id);
}