import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from './../common/store';
import { checkoutHandler } from './../common/handler';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export const CartTotalComponent = (props:{viewReciept:()=>void}) => {
  const userCart = useSelector((state: RootState) => state.shoppingCart.cart);
  const handler = new checkoutHandler()

  const total = handler.calculateTotalPrice(userCart) || 0
   
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ my: 0.5, mx: 2 }}>
        <Grid container alignItems="center" justifyContent="end">
          <Grid item>
            <Typography gutterBottom variant="h4" component="div" sx={{marginBottom:'auto'}}>
              TOTAL :  
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h5" component="div" sx={{marginLeft:'10px',marginBottom:'auto'}}>
              {`£${total}`}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2" sx={{textAlign:"end",marginBottom:"5px"}}>
            {userCart.length} Item(s) currently in cart.
        </Typography>
        <Grid container alignItems="center" justifyContent="end">          
          <Button variant="contained" endIcon={<SendIcon />} onClick={()=>props.viewReciept()} disabled={userCart.length < 1}>
            Checkout Receipt
          </Button>
        </Grid>
      </Box>
      <Divider variant="middle" />
    </Box>
  );
}