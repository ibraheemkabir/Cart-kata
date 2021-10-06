import React from 'react';
import logo from './logo.svg';
import './App.scss';
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
import { CartTotalComponent } from './components/totalCalculator';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';

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
    }
  }
)

export const Actions = shoppingCartSlice.actions;

function App() {

  const userCart = useSelector((state: RootState) => state.shoppingCart.cart);
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCartClose = () => {
    setAnchorEl(null);
  };

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
              <IconButton onClick={handleCartClick} size="small" sx={{ ml: 2 }} color={"primary"}>
                <Badge badgeContent={userCart.length || 0} color="secondary">
                  <ShoppingCart sx={{color:"white"}}/>
                </Badge>
              </IconButton>
              <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCartClose}
                  onClick={handleCartClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  Cart Items
                </MenuItem>
                <Divider />
                {
                  userCart.length > 0 ?
                  userCart.map(
                    e => 
                      <MenuItem>
                        <ListItemIcon sx={{marginRight:"5px"}}>
                          {e.qty} {e.item.priceType === 'unit' ? 'unit(s) ' : 'Kg(s)'} of
                        </ListItemIcon>
                        {e.item.itemName}
                      </MenuItem>
                  ) : 
                  <MenuItem>
                    There are no items in your cart.
                  </MenuItem>
                }                 
              </Menu>        
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <div className="container">
        <Grid container justifyContent="space-between">
          <Grid item xs={4}>
            <ShoppingItemContainer
              storeItem={stockItems[0]}
              itemImg={Cola}
              name={'Cola'}
              increaseQty={(v:number,qty:number)=>dispatch(Actions.increaseQuantityInCart({index:v,qty}))}
              onAddItem={(v:basketItems)=>dispatch(Actions.addItemToCart({item:v}))}
            />
          </Grid>
          <Grid item xs={4}>
            <ShoppingItemContainer
              storeItem={stockItems[1]}
              itemImg={BEANS}
              name={'Canned Beans'}
              increaseQty={(v:number,qty:number)=>dispatch(Actions.increaseQuantityInCart({index:v,qty}))}
              onAddItem={(v:basketItems)=>dispatch(Actions.addItemToCart({item:v}))}
            />
          </Grid>
          <Grid item xs={4}>
            <ShoppingItemContainer
              storeItem={stockItems[2]}
              itemImg={ORANGE}
              name={'Oranges'}
              increaseQty={(v:number,qty:number)=>dispatch(Actions.increaseQuantityInCart({index:v,qty}))}
              onAddItem={(v:basketItems)=>dispatch(Actions.addItemToCart({item:v}))}
            />
          </Grid>
        </Grid>
      </div>
      <div className="totalContainer">
        <CartTotalComponent/>
      </div>
    </div>
  );
}

export default App;
