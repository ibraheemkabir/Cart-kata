import {stockItem} from './../types/shoppingItem'

export class checkoutHandler {
    constructor(){

    }

    async calculateDiscount(item:stockItem,qty:number):Promise<number>{
        if(item.AsActiveDiscount){
            let DiscountMultiple = qty/Number(item.DiscountQuantity) || '0.0'
            let numberOfDiscount = DiscountMultiple.toString().split('.')[0]
            let discountPrice = Number(numberOfDiscount) * qty
            return discountPrice
        }
        return 0
    }

    async calculateTotalPrice(item:stockItem,qty:number){
        
    }

    async calculateItemPrice(item:stockItem,qty:number){
        if(item.AsActiveDiscount && qty>=item.DiscountQuantity){
            let price = item.ItemPrice*qty
            let discount = await this.calculateDiscount(item,qty)
            return (price - discount)
        }else{
            return item.ItemPrice*qty
        }
    }
}