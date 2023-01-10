export const storeCartDetails = (items: any, totalNoOfItems: number) => {
  localStorage.setItem(
    "cart",
    JSON.stringify({
      items,
      totalNoOfItems,
    })
  );
};
export const updateCartDetails = (items: any, totalNoOfItems: number) => {
  if (items.length) {
    localStorage.setItem("cart", JSON.stringify({ items, totalNoOfItems }));
  } else {
    localStorage.removeItem("cart");
  }
};
