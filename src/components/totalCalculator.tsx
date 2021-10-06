import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from './../common/store';
import { checkoutHandler } from './../common/handler';

export const CartTotalComponent = () => {
  const userCart = useSelector((state: RootState) => state.shoppingCart.cart);
  const handler = new checkoutHandler()

  const total = handler.calculateTotalPrice(userCart) || 0
   
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center" justifyContent="end">
          <Grid item>
            <Typography gutterBottom variant="h4" component="div">
              TOTAL :  
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h5" component="div" sx={{marginLeft:'10px'}}>
              {`£${total}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="end">
          <Typography color="text.secondary" variant="body2">
              {userCart.length} Item(s) currently in cart.
            </Typography>
        </Grid>
      </Box>
      <Divider variant="middle" />
    </Box>
  );
}