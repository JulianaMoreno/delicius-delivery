export function generateOrderId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}

export function buildOrder({
  storeId,
  itemId,
  item,
  size,
  quantity,
  selectedDrinks,
  drinksTotal,
  observation,
  itemTotal,
}: {
  storeId: string;
  itemId: string;
  item: any;
  size: 'médio' | 'grande';
  quantity: number;
  selectedDrinks: { drink: any; quantity: number }[];
  drinksTotal: number;
  observation: string;
  itemTotal: number;
}) {
  const orderTotal = itemTotal + drinksTotal;

  return {
    id: generateOrderId(),
    storeId,
    itemId,
    item,
    size,
    quantity,
    drinks: selectedDrinks,
    drinksTotal,
    observation,
    itemTotal,
    orderTotal,
    date: new Date().toISOString(),
  };
}
