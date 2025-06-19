'use client';

import { useParams } from 'next/navigation';
import ItemDetails from '@/components/item/ItemDetails'

export default function ItemPage() {
  const params = useParams();
  const storeId = params.storeId as string;
  const itemId = params.itemId as string;

  return <ItemDetails storeId={storeId} itemId={itemId}/>;
}
