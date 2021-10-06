import {stockItem,Discount} from '../types/shoppingItem'
import BEANS from './../img/beans1.png';
import ORANGE from './../img/orange.png';
import COLA from './../img/cola.png';

export const stockItems: stockItem[] = [
    {
        id: "10001",
        itemName: 'Cola',
        itemPrice: 0.7,
        priceType: 'unit',
        asActiveDiscount: true,
        discountId: "10001",
        quantityInStock: 15,
        discountPrice: 1,
        discountQuantity: 2,
        itemImage: BEANS,
        itemDescription: 'A can of delicious beans stocked with vitamins.',
    },
    {
        id: "10002",
        itemName: 'Can Of Beans',
        itemPrice: 0.5,
        priceType: 'unit',
        asActiveDiscount: true,
        discountId: "10001",
        quantityInStock: 15,
        discountPrice: 1,
        discountQuantity: 2,
        itemImage: ORANGE,
        itemDescription: 'A nicely grown orange, smells good and tastes very good',
    },
    {
        id: "1003",
        itemName: 'Oranges',
        itemPrice: 1.99,
        priceType: 'weight',
        asActiveDiscount: false,
        discountId: "10001",
        quantityInStock: 15,
        discountPrice: 1,
        discountQuantity: 2,
        itemImage: COLA,
        itemDescription: 'A can of delicious beans stocked with vitamins',
    }
]

export const storeDiscounts:Discount[] = [
    {
        "discountId": '10001',
        "discountType": "sameItem",
    }
]