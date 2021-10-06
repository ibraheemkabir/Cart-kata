import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ShoppingItemContainer } from './components/shoppingItem';
import Cola from './img/cola.png';
import BEANS from './img/beans1.png';
import ORANGE from './img/orange.png';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import {ShoppingCart} from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';
import { basketItems } from './types/shoppingItem';
import { RootState } from './common/store';
import { useDispatch, useSelector } from 'react-redux';
import { stockItems } from './models/storeItems';

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
      }
    }
  }
)

export const Actions = shoppingCartSlice.actions;

function App() {

  const userCart = useSelector((state: RootState) => state.shoppingCart.cart);
  const dispatch = useDispatch()

  return (
    <div className="App">
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  SuperMarket Kata
                </Typography>
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              </Typography>
              <Badge badgeContent={userCart.length || 0} color="secondary">
                <ShoppingCart/>
              </Badge>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <div className="container">
        <Grid container spacing={6}>
          <Grid item xs={6} md={4}>
            <ShoppingItemContainer
              storeItem={stockItems[0]}
              itemImg={Cola}
              name={'Cola'}
              onAddItem={(v:basketItems)=>dispatch(Actions.addItemToCart({item:v}))}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <ShoppingItemContainer
              storeItem={stockItems[1]}
              itemImg={BEANS}
              name={'Canned Beans'}
              onAddItem={(v:basketItems)=>dispatch(Actions.addItemToCart({item:v}))}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <ShoppingItemContainer
              storeItem={stockItems[2]}
              itemImg={ORANGE}
              name={'Oranges'}
              onAddItem={(v:basketItems)=>dispatch(Actions.addItemToCart({item:v}))}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
