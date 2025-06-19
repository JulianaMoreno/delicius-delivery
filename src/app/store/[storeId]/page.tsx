'use client';

import { useParams } from 'next/navigation';
import MenuDetails from "@/components/menu/MenuDetails";

export default function MenuPage() {
  const params = useParams();
  const storeId = params.storeId as string;

  return <MenuDetails storeId={storeId} />;
}
