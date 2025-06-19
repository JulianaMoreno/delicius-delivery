export const routes = {
  home: '/',
  store: (storeId: string) => `/store/${storeId}`,
  storeItem: (storeId: string, itemId: string) => `/store/${storeId}/item/${itemId}`,
  ticket: '/ticket'
};