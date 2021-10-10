import {stockItem, basketItems} from '../types/shoppingItem'
import {findItem} from '../utils/utils';
import {storeDiscounts} from '../models/storeItems';
import {DiscountHandler} from './discount'
export class checkoutHandler {
    constructor(){}

    calculateDiscount(item:stockItem,qty:number){
        if(item.asActiveDiscount){
            const discountHandle = new DiscountHandler(storeDiscounts)
            const discountPrice = discountHandle.calculateItemDiscount(item,qty)
            return discountPrice
        }
        return {
            discount: 0,
            remainingQty: qty
        }
    }

    getItemDiscount(item:stockItem,qty:number):number{
        if(item.asActiveDiscount){
            const discountHandle = new DiscountHandler(storeDiscounts)
            const discountPrice = discountHandle.calculateItemDiscount(item,qty)
            let normalPrice = (qty-(discountPrice.remainingQty))*(item.itemPrice)
            return Number((normalPrice - discountPrice.discount).toFixed(1))
        }
        return 0
    }

    calculateTotalPrice(items:basketItems[]){
        if(items.length > 0){
            let total = 0
            for (let i = 0; i<items.length; i++){
                let price = this.calculateItemPrice(items[i]['item'],items[i]['qty'])
                total+=price
            }
            return total;
        }
        return 0
    }

    calculateNormalTotal(items:basketItems[]){
        if(items.length > 0){
            let total = 0
            for (let i = 0; i<items.length; i++){
                let price = items[i]['qty']*Number(items[i].item.itemPrice)
                total+=price
            }
            return Number(total.toFixed(1));
        }
        return 0
    }

    calculateDiscountTotal(items:basketItems[]){
        if(items.length > 0){
            let total = 0
            for (const item of items){
                if(item.item.asActiveDiscount && item.item.discountRules.length > 0){
                    let price = this.getItemDiscount(item.item,item.qty)
                    total+=price
                }
            }
            return total;
        }
        return 0
    }
    
    calculateItemPrice(item:stockItem,qty:number){
        if(item.asActiveDiscount){
            let discount = this.calculateDiscount(item,qty)
            const remainingItems = discount.remainingQty
            let price = (item.itemPrice) * remainingItems
            return ( price+(discount.discount) )
        }else{
            return item.itemPrice*qty
        }
    }
}