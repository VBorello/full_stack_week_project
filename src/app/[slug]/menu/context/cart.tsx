"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  total: number;
  addProduct: (product: CartProduct) => void;
  DecreaseProductQuantity: (productId: string) => void;
  IncreaseProductQuantity: (ProductId: string) => void;
  RemoveProductFromCart: (ProductId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  total: 0,
  addProduct: () => {},
  DecreaseProductQuantity: () => {},
  IncreaseProductQuantity: () => {},
  RemoveProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id == product.id,
    );
    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id == product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };
  const DecreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id != productId) {
          return prevProduct;
        }

        if (prevProduct.quantity == 1) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };
  const IncreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id != productId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };

  const RemoveProductFromCart = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((prevProduct) => prevProduct.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        isOpen: isOpen,
        products: products,
        toggleCart: toggleCart,
        total: total,
        addProduct: addProduct,
        DecreaseProductQuantity: DecreaseProductQuantity,
        IncreaseProductQuantity: IncreaseProductQuantity,
        RemoveProductFromCart: RemoveProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
