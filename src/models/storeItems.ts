import {stockItem,Discount} from '../types/shoppingItem'
import BEANS from './../img/beans1.png';
import ORANGE from './../img/orange.png';
import Cola from './../img/cola.png';

export const stockItems: stockItem[] = [
    {
        id: "10001",
        itemName: 'Cola',
        itemPrice: 0.7,
        priceType: 'unit',
        quantityInStock: 50,
        asActiveDiscount: true,
        itemImage: Cola,
        itemDescription: 'cola is a fizzy fizzy drink. Gluten-free, dairy-free and nut-free,Best served chilled',
        discountRules:['1001']
    },
    {
        id: "10002",
        itemName: 'Can Of Beans',
        itemPrice: 0.5,
        priceType: 'unit',
        asActiveDiscount: true,
        itemImage: BEANS,
        itemDescription: 'A can of delicious beans stocked with vitamins. Filled with Beans (51%), Tomatoes (34%), Water, Sugar, Modified Cornflour, Salt, Spirit Vinegar.',
        quantityInStock: 5,
        discountRules:['1002']
    },
    {
        id: "10003",
        itemName: 'Oranges',
        itemPrice: 1.99,
        priceType: 'weight',
        asActiveDiscount: false,
        itemImage: ORANGE,
        itemDescription: 'A nicely grown orange, smells good and tastes very good.',
        quantityInStock: 15,
        discountRules:[]
    }
]

export const storeDiscounts:Discount[] = [
    {
        "discountId": '1001',
        "priceType":"sameItem" as any,
        "discountQty":2,
        "price":1
    },
    {
        "discountId": '1002',
        "priceType":"sameItem" as any,
        "discountQty":3,
        "price":1
    }
]
