export interface stockItem {
    "id":string,
    "itemName": string,
    "itemPrice": number,
    "itemImage": string,
    "itemDescription": string,
    "priceType": 'unit' | 'weight',
    "quantityInStock": number,
    "asActiveDiscount": boolean,
    "discountRules": string[]
}

export interface basketItems {
    "item": stockItem,
    "qty": number
}

export interface Discount {
    "discountId": string,
    "priceType": "sameItem" | "otherItem"| "special"
    "discountQty":number
    "price":number
}