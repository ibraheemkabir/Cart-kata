import {stockItem,Discount} from '../types/shoppingItem'

export const stockItems: stockItem[] = [
    {
        id: "10001",
        itemName: 'Cola',
        itemPrice: 0.5,
        priceType: 'unit',
        quantityInStock: 50,
        asActiveDiscount: true,
        discountId: "10001",
        discountPrice: 1,
        discountQuantity: 2
    },
    {
        id: "10002",
        itemName: 'Can Of Beans',
        itemPrice: 0.7,
        priceType: 'unit',
        asActiveDiscount: true,
        quantityInStock: 5,
        discountId: "10001",
        discountPrice: 1,
        discountQuantity: 2
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
        discountQuantity: 2
    }
]

export const storeDiscounts:Discount[] = [
    {
        "discountId": '10001',
        "discountType": "sameItem",
    }
]