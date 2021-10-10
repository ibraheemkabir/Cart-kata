import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { RootState } from './../common/store';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { checkoutHandler } from '../common/checkout';
import Modal from '@mui/material/Modal';


export const ShoppingReceipt = (props:{open:boolean,handleClose:()=>void}) => {
  const userCart = useSelector((state: RootState) => state.shoppingCart.cart);
  const handler = new checkoutHandler();
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  };
  
  return (
    <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box
        sx={{
            ...style,
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
            width: 428,
            },
        }}
        >
        <Paper 
            elevation={3}
            sx={{
                maxHeight: "800px",
                overflow: "scroll"
            }}
            children={
                <>
                <Box sx={{ my: 2}}>
                    <div className="reciept-header">
                        Shopping Receipt
                    </div>
                </Box>
                {
                    userCart.length > 0 ?
                        <>
                            <Divider light />
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {
                                        userCart.map( (e,i) =>  {
                                            if(e.item.priceType === 'unit'){
                                                return [...Array(e.qty)].map( t => 
                                                    <ListItem sx={{margin: 'auto 5%'}} key={i} secondaryAction={<ListItemText primary={`${e.item.itemPrice}`} />}>
                                                        <ListItemText primary={`${e.item.itemName}`} />
                                                    </ListItem>
                                                )
                                            }else if(e.item.priceType === 'weight'){
                                                return(
                                                    <ListItem sx={{margin: 'auto 5%'}} key={i} secondaryAction={<ListItemText primary={`${Number(e.item.itemPrice) * Number(e.qty)}`} />}>
                                                        <ListItemText primary={`${e.item.itemName} ( ${e.qty}kg @ ${e.item.itemPrice}/kg )`} />
                                                    </ListItem>
                                                )
                                            }
                                        })
                                    }
                            </List>
                            <Divider light />
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem sx={{margin: 'auto 5%'}} secondaryAction={<ListItemText primary={handler.calculateNormalTotal(userCart)} />}>
                                        <ListItemText primary={`Sub-Total`} />
                                    </ListItem>
                            </List>
                            <div className="reciept-header mb">
                                Savings
                            </div>
                            {
                                handler.calculateDiscountTotal(userCart) > 0 && 
                                <>
                                    <Divider light />
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {
                                            userCart.map( (e,i) =>  {
                                                const discountPrice = handler.getItemDiscount(e.item,e.qty)
                                                if(e.item.asActiveDiscount && (discountPrice !== 0)){
                                                    return (
                                                        <ListItem sx={{margin: 'auto 5%'}} key={i} secondaryAction={<ListItemText primary={`-${discountPrice}`} />}>
                                                            <ListItemText primary={`${e.item.itemName}`} />
                                                        </ListItem>    
                                                    )
                                                }       
                                            })
                                        }
                                    </List>
                                </>
                            }
                            <Divider light />
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem sx={{margin: 'auto 5%'}} secondaryAction={<ListItemText primary={`- ${handler.calculateDiscountTotal(userCart) > 0 ? handler.calculateDiscountTotal(userCart) : 0}`} />}>
                                        <ListItemText primary={`Total savings`} />
                                    </ListItem>
                            </List>   
                            <Divider light />
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem sx={{margin: 'auto 5%'}} secondaryAction={<ListItemText primary={`£${handler.calculateTotalPrice(userCart)}`} />}>
                                    <ListItemText primary={`Total to Pay`} />
                                </ListItem>
                            </List>     
                        </>
                    :   <>
                        <div className={'mb2'}>
                            There are no Items in Your Cart Currently
                        </div>
                    </>
                }
                
            </>
            }
        />    
        </Box>
    </Modal>
  );
}