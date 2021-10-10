import {checkoutHandler} from '../common/checkout';
import { stockItem } from '../types/shoppingItem'
import { stockItems } from './testItemsFactory';

describe('checkout handler singleItem test', ()=>{

    it('should calculate item price without discount',async ()=>{
        let Item:stockItem = stockItems[2]
        const handler = new checkoutHandler();
        let quantity = 4
        let expectedPrice = Item.itemPrice * quantity;
        const price = await handler.calculateItemPrice(Item,quantity)
        expect(price).toBe(expectedPrice)
    })

    it('should calculate item price with discount',async ()=>{
        let Item:stockItem = stockItems[1]
        const handler = new checkoutHandler();
        let quantity = 2
        let expectedPrice = 1;
        const price = await handler.calculateItemPrice(Item,quantity)
        expect(price).toBe(expectedPrice)
    })

    it('should calculate item price with discount and add remainder value',async ()=>{
        let Item:stockItem = stockItems[1]
        const handler = new checkoutHandler();
        let quantity = 5
        let expectedPrice = (1) + (2*Item.itemPrice);
        const price = await handler.calculateItemPrice(Item,quantity)
        expect(price).toBe(expectedPrice)
    })
});

describe('checkout handler multipleItem test', ()=>{

    it('should calculate total item price without discount',async ()=>{
        let Item1:stockItem = stockItems[1]
        let Item2:stockItem = stockItems[0]
           
        const itemsArray = [
            {"item":Item1,"qty": 1},
            {"item":Item2,"qty": 1},
        ]
        const handler = new checkoutHandler();
        const price = await handler.calculateTotalPrice(itemsArray)
        expect(price).toBe(1.2)
    })

    it('should calculate total item price with discount and add remainder',async ()=>{
        let Item1:stockItem = stockItems[1]
        let Item2:stockItem = stockItems[0]
        const itemsArray = [
            {"item":Item1,"qty": 1},
            {"item":Item2,"qty": 3},
        ]
        const handler = new checkoutHandler();
        const price = await handler.calculateTotalPrice(itemsArray)
        expect(price).toBe(2.2)
    })

    it('should calculate total item price with discount and no remainder',async ()=>{
        let Item1:stockItem = stockItems[1]
        let Item2:stockItem = stockItems[0]
        const itemsArray = [
            {"item":Item1,"qty": 1},
            {"item":Item2,"qty": 4},
        ]
        const handler = new checkoutHandler();
        const price = await handler.calculateTotalPrice(itemsArray)
        expect(price).toBe(2.5)
    })
});