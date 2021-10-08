import {stockItem, basketItems} from './../types/shoppingItem'
import {findItem} from './../utils/utils';
import {storeDiscounts} from './../models/storeItems';

export class checkoutHandler {
    constructor(){

    }

    calculateDiscount(item:stockItem,qty:number):number{
        if(item.asActiveDiscount){
            let discount = findItem(item?.discountId!,storeDiscounts,'discountId');
            if(discount){
                switch(discount.discountType){
                    case "sameItem":
                        let DiscountMultiple = qty/Number(item.discountQuantity) || '0.0'
                        let numberOfDiscount = DiscountMultiple.toString().split('.')[0]
                        let discountPrice = Number(numberOfDiscount) * item?.discountPrice
                        return discountPrice
                }
                    
            }
            return 0
        }
        return 0
    }

    getItemDiscount(item:stockItem,qty:number):number{
        if(item.asActiveDiscount){
            let discount = findItem(item?.discountId!,storeDiscounts,'discountId');
            if(discount){
                switch(discount.discountType){
                    case "sameItem":
                        let DiscountMultiple = qty/Number(item.discountQuantity) || '0.0'
                        let numberOfDiscount = DiscountMultiple.toString().split('.')[0]
                        let discountPrice = Number(numberOfDiscount) * item?.discountPrice
                        let normalPrice = ((Number(numberOfDiscount)*item.discountQuantity)*(item.itemPrice))
                        return Number((normalPrice - discountPrice).toFixed(1))
                }
                    
            }
            return 0
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
            for (let i = 0; i<items.length; i++){
                if(items[i].item.asActiveDiscount && items[i].qty>=items[i]?.item.discountQuantity){
                    let price = this.getItemDiscount(items[i].item,items[i].qty)
                    total+=price
                }
            }
            return total;
        }
        return 0
    }
    
    calculateItemPrice(item:stockItem,qty:number){
        if(item.asActiveDiscount && qty>=item?.discountQuantity){
            let discount = this.calculateDiscount(item,qty)
            const remainingItems = (qty%item?.discountQuantity)
            let price = item.itemPrice*remainingItems
            return (price+discount)
        }else{
            return item.itemPrice*qty
        }
    }
}