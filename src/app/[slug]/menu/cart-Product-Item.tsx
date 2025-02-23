import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartProduct } from "./context/cart";

interface CartItensProps{
    product: CartProduct;

}

const CartProductItem = ({product}: CartItensProps) => {
    return ( 
        <div className="flex iten-center justify-between">
            {/*Esquerda*/}
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 bg-gray-200 rounded-xl">
                    <Image src={product.imageUrl} alt={product.name} fill/>
                </div>
                <div className="space-y-1">
                    <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                    <div className="flex iten-center gap-1 text-center">
                        {/*Quantidade*/}
                        <Button className="w-7 h-7 rounded-lg" variant="outline">
                            <ChevronLeftIcon/>
                        </Button>
                        <p className="text-xs w-8 mt-1">{product.quantity}</p>
                        <Button className="w-7 h-7 rounded-lg" variant="destructive">
                            <ChevronRightIcon/>
                        </Button>
                    </div>
                </div>
            </div>
            {/*Direita-Botao-Deletar*/}
            <div>
                <Button className="w-7 h-7 rounded-lg" variant="outline">
                    <TrashIcon/>
                </Button>
            </div>
        </div>
    );
}
 
export default CartProductItem;