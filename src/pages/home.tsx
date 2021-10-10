import React from 'react';
import './../App.scss';
import { ShoppingItemContainer } from './../components/shoppingItem';
import Grid from '@mui/material/Grid';
import { createSlice } from '@reduxjs/toolkit';
import { basketItems } from './../types/shoppingItem';
import { useDispatch } from 'react-redux';
import { stockItems } from './../models/storeItems';
import { CartTotalComponent } from './../components/totalCalculator';
import { ShoppingReceipt } from './../components/reciept';
import {MenuBar} from './../components/appBar';
import {stockItem} from './../types/shoppingItem';

export interface cartItemsState {
  cart: basketItems[]
}

const initialState: cartItemsState = {
  cart: []
}

export const shoppingCartSlice = createSlice(
  {
    name: 'shoppingCartSlice',
    initialState,
    reducers: {
      addItemToCart: (state,action) => {
        state.cart.push(action.payload.item);
      },
      increaseQuantityInCart: (state,action) => {
        if(state.cart[action.payload.index]){
          const qty = state.cart[action.payload.index].qty + action.payload.qty
          state.cart[action.payload.index] = {...state.cart[action.payload.index], qty}
        }
      },
      removeCartItem: (state,action) => {
        if(state.cart[action.payload.index]){
          console.log(state,'tsattetet',action.payload.index)
          state.cart.splice(action.payload.index,1)
        }
      }
    }
  }
)

export const Actions = shoppingCartSlice.actions;

function HomePage() {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCartClose = () => {
    setAnchorEl(null);
  };
  const [openReciept, setOpenReciept] = React.useState(false);
  const handleRecieptOpen = () => setOpenReciept(true);
  const handleRecieptClose = () => setOpenReciept(false);

  return (
    <div className="App">  
      <MenuBar
        handleRecieptOpen={handleRecieptOpen}
        anchorEl={anchorEl}
        cartDetailsOpen={open}
        handleCartClose={handleCartClose}
        handleCartClick={handleCartClick}
        removeCartItem={(index:number)=>dispatch(Actions.removeCartItem({index}))}
      />
      <div className="items-display container">
        <Grid container justifyContent="space-between">
          {
            stockItems.map(
              (e:stockItem,i:number) => 
                <Grid item xs={12} sm={4} key={i}>
                    <ShoppingItemContainer
                    storeItem={e}
                    itemImg={e.itemImage}
                    name={e.itemName}
                    increaseQty={(v:number,qty:number)=>dispatch(Actions.increaseQuantityInCart({index:v,qty}))}
                    onAddItem={(v:basketItems)=>dispatch(Actions.addItemToCart({item:v}))}
                    />
              </Grid>
            )
          }
        </Grid>
      </div>
      <CartTotalComponent
        viewReciept={()=>handleRecieptOpen()}
      />
      <ShoppingReceipt
        open={openReciept}
        handleClose={handleRecieptClose}
      />
    </div>
  );
}

export default HomePage;
