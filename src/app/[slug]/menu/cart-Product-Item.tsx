import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "./context/cart";

interface CartItensProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartItensProps) => {
  const {
    DecreaseProductQuantity,
    IncreaseProductQuantity,
    RemoveProductFromCart,
  } = useContext(CartContext);
  return (
    <div className="iten-center flex justify-between">
      {/*Esquerda*/}
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-200">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="iten-center flex gap-1 text-center">
            {/*Quantidade*/}
            <Button
              className="h-7 w-7 rounded-lg"
              variant="outline"
              onClick={() => DecreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="mt-1 w-8 text-xs">{product.quantity}</p>
            <Button
              className="h-7 w-7 rounded-lg"
              variant="destructive"
              onClick={() => IncreaseProductQuantity(product.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      {/*Direita-Botao-Deletar*/}
      <div>
        <Button
          className="h-7 w-7 rounded-lg"
          variant="outline"
          onClick={() => RemoveProductFromCart(product.id)}
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default CartProductItem;
