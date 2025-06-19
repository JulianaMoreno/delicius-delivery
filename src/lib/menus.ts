import menuData from "@/data/menus.json";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  promotion?: number;
  minimum?: number;
  image?: string;
};

export type MenuGroup = {
  menuId: string;
  name: string;
  hasPromotion: boolean;
  description?: string;
  items?: MenuItem[];
};

export type Menu = {
  storeId: string;
  menu: MenuGroup[];
}

export async function fetchMenuByStoreId(storeId: string): Promise<MenuGroup[]> {
  return menuData.find((menu) => menu.storeId === storeId)?.menu || [];
}

export async function fetchMenuItemById(itemId: string): Promise<MenuItem | null> {
  for (const storeMenu of menuData) {
    for (const menuGroup of storeMenu.menu) {
      const foundItem = menuGroup.items?.find(item => item.id === itemId);
      if (foundItem) {
        return foundItem;
      }
    }
  }
  return null;
}
