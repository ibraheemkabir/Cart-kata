import {DiscountHandler} from '../common/discount';
import { Discount, stockItem } from '../types/shoppingItem'
import { stockItems } from './testItemsFactory';

describe('Discount rules',()=>{
    it('should add a new discount rule',async ()=>{
        let discount:Discount[] = []
        const handler = new DiscountHandler(discount);
        let data = {
            priceType:"sameItem" as any,
            discountQty:5,
            discountId: "1002",
            price:50
        }
        handler.createDiscountRule(data);
        expect(discount.length).toBe(1)
    })

    it('should get Single Rule',async ()=>{
        let discount:Discount[] = []
        const handler = new DiscountHandler(discount);
        let data = {
            priceType:"sameItem" as any,
            discountQty:5,
            discountId: "1002",
            price:50
        }
        handler.createDiscountRule(data);
        const rule = handler.getRule("1002")
        expect(rule?.discountId).toBe("1002")
    })

    it('should get Single Rule',async ()=>{
        let discount:Discount[] = []
        const handler = new DiscountHandler(discount);
        handler.storeDiscounts = [{
            priceType:"sameItem" as any,
            discountQty:5,
            discountId: "1001",
            price:50
        },
        {
            priceType:"sameItem" as any,
            discountQty:4,
            discountId: "1002",
            price:40
        },
        {
            priceType:"sameItem" as any,
            discountQty:7,
            discountId: "1003",
            price:80
        }]
        const rule = handler.getRule("1002")
        const order = handler.getAllItemRules(stockItems[1])
        expect(rule?.discountId).toBe("1002")
        expect(order[order.length-1]?.discountId).toBe('1002')
    })

    it('should retrun 0 Discount when discount does not exist',async ()=>{
        let discount:Discount[] = []
        const handler = new DiscountHandler(discount);
        handler.storeDiscounts = [{
            priceType:"sameItem" as any,
            discountQty:2,
            discountId: "1002",
            price:1
        },
        {
            priceType:"sameItem" as any,
            discountQty:4,
            discountId: "1003",
            price:40
        },
        {
            priceType:"sameItem" as any,
            discountQty:7,
            discountId: "1004",
            price:80
        }]
        const discountPrice = handler.calculateItemDiscount(stockItems[0],5)
        expect(discountPrice.discount).toBe(0)
        expect(discountPrice.remainingQty).toBe(5)
    })

    it('should calculate Discount',async ()=>{
        let discount:Discount[] = []
        const handler = new DiscountHandler(discount);
        handler.storeDiscounts = [{
                priceType:"sameItem" as any,
                discountQty:2,
                discountId: "1002",
                price:1
            },
            {
                priceType:"sameItem" as any,
                discountQty:4,
                discountId: "1003",
                price:40
            },
            {
                priceType:"sameItem" as any,
                discountQty:7,
                discountId: "1004",
                price:80
            },
            {
                "discountId": '1001',
                "priceType":"sameItem" as any,
                "discountQty":2,
                "price":1
            },
        ]
        const discountPrice = handler.calculateItemDiscount(stockItems[0],5)
        expect(discountPrice.discount).toBe(2)
        expect(discountPrice.remainingQty).toBe(1)
    })
})