export interface stockItem {
    "id":string,
    "itemName": string,
    "itemPrice": number,
    "itemImage": string,
    "itemDescription": string,
    "priceType": 'unit' | 'weight',
    "quantityInStock": number,
    "asActiveDiscount": boolean,
    "discountId"?: string,
    "discountPrice": number,
    "discountQuantity":number
}

export interface basketItems {
    "item": stockItem,
    "qty": number
}

export interface Discount {
    "discountId": string,
    "discountType": "sameItem" | "otherItem"| "special"
    "specialDiscountItemId"?: string,
}