import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useSelector } from 'react-redux';
import { RootState } from './../common/store';
import Divider from '@mui/material/Divider';
import {ShoppingCart} from '@mui/icons-material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { basketItems } from '../types/shoppingItem';
import Box from '@mui/material/Box';

export const MenuBar = (props:{
        handleCartClick:(event: React.MouseEvent<HTMLElement>)=>void,
        handleCartClose:()=>void,cartDetailsOpen:boolean,
        handleRecieptOpen:()=>void,
        anchorEl: HTMLElement | null
    }) => {
    const userCart = useSelector((state: RootState) => state.shoppingCart.cart);
    const {handleCartClick,handleCartClose,cartDetailsOpen,anchorEl,handleRecieptOpen} = props;
    
    return (
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
                    open={cartDetailsOpen}
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
                    <>
                      {
                        userCart.map(
                          (e:basketItems) => 
                            <MenuItem>
                              <ListItemIcon sx={{marginRight:"5px"}}>
                                {e.qty} {e.item.priceType === 'unit' ? 'unit(s) ' : 'Kg(s)'} of
                              </ListItemIcon>
                              {e.item.itemName}
                            </MenuItem>
                        ) 
                      }
                      <Divider />
                      <MenuItem>
                        <Button variant="contained" endIcon={<SendIcon />} onClick={()=>handleRecieptOpen()} disabled={userCart.length < 1}>
                          View Receipt
                        </Button>
                      </MenuItem>
                    </>
                    : 
                    <MenuItem>
                      There are no items in your cart.
                    </MenuItem>
                  }                 
                </Menu>        
              </Toolbar>
          </AppBar>
        </Box>
      </header>
    )
}