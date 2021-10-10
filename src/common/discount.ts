import {stockItem, basketItems} from './../types/shoppingItem'
import {findItem} from './../utils/utils';
import {Discount} from './../types/shoppingItem'
import _ from 'lodash';

export class DiscountHandler {
    public storeDiscounts;

    constructor(
        discounts:Discount[]
    ){
        this.storeDiscounts = discounts
    }


    createDiscountRule(discount:Discount) {
        this.storeDiscounts.push(discount)
    }

    getRule(discountId:string){
        const discount  = this.storeDiscounts.find( e => e.discountId === discountId)
        return discount;
    }

    getAllItemRules(item:stockItem){
        let itemDiscounts =  item.discountRules.map(e => this.getRule(e))
        if(item.discountRules.length > 1){
            //arange discounts by qty in descending order
            //@ts-ignore
            itemDiscounts = _.sortBy(itemDiscounts, 'discountQty').reverse();
        }
        return itemDiscounts
    }

    calculateItemDiscount(item:stockItem,qty:number){
        let discountPrice = 0;
        let remainingQty = qty

        if(item.asActiveDiscount){
            let itemDiscounts = this.getAllItemRules(item)
            if(itemDiscounts.length > 0){
                for(const discount of itemDiscounts){
                    if(discount){
                        if(remainingQty >= discount.discountQty){
                            let DiscountMultiple = remainingQty/Number(discount!.discountQty) || '0.0';
                            let numberOfDiscount = DiscountMultiple.toString().split('.')[0]
                            switch(discount!.priceType){
                                case "sameItem":
                                    discountPrice += Number(numberOfDiscount) * discount!.price  
                            }
                            remainingQty -= (Number(numberOfDiscount)*Number(discount!.discountQty))
                        }
                    }
                }
            }
        }
        return {
            "discount": discountPrice,
            "remainingQty": remainingQty
        }
    }

    // newCalculateCartDiscountTotal(items:basketItems[]){
    //     if(items.length > 0){
    //         let total = 0
    //         for (const item of items){
    //             if(item.item.asActiveDiscount && item.qty>=item.item.discountQuantity){
    //                 let price = this.newCalculateItemDiscount(item.item,item.qty)
    //                 total+=price.discount
    //             }
    //         }
    //         return total;
    //     }
    //     return 0
    // }


    // calculateItemDiscount(item:stockItem,qty:number):number{
    //     if(item.asActiveDiscount){
    //         let discount = findItem(item?.discountId!,this.storeDiscounts,'discountId');
    //         if(discount){
    //             switch(discount.discountType){
    //                 case "sameItem":
    //                     let DiscountMultiple = qty/Number(item.discountQuantity) || '0.0'
    //                     let numberOfDiscount = DiscountMultiple.toString().split('.')[0]
    //                     let discountPrice = Number(numberOfDiscount) * item?.discountPrice
    //                     return discountPrice
    //             }
                    
    //         }
    //         return 0
    //     }
    //     return 0
    // }

    calculateCartDiscountTotal(items:basketItems[]){
        if(items.length > 0){
            let total = 0
            for (const item of items){
                if(item.item.asActiveDiscount && item.item.discountRules.length > 0){
                    let price = this.calculateItemDiscount(item.item,item.qty)
                    total+=(price.discount)
                }
            }
            return total;
        }
        return 0
    }
}