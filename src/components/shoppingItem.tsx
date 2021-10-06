import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AddCircle } from '@material-ui/icons';
import { RemoveCircle } from '@material-ui/icons';
import { AddShoppingCart } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { basketItems,stockItem } from './../types/shoppingItem';


export const ShoppingItemContainer = (props:{storeItem:stockItem,itemImg:string,name:string,onAddItem:(item:basketItems)=>void}) => {
    const [qty,setQty] = React.useState(0)
    const [invalidEntry,setInvalidEntry] = React.useState(false)

    const handleAddItem = () => {
        if(Number(qty) ===  0){
            setInvalidEntry(true)
            return
        }
        props.onAddItem(
            {
                "qty":qty,
                "item": props.storeItem
            }
        )
    }

    const handleNavChange = (operator:string) => {
        if(invalidEntry){
            setInvalidEntry(false)
        }
        switch(operator) {
            case 'minus':
                qty > 0 && setQty(qty-1);
                return
            case 'add':
                setQty(qty+1);
                return
            default:
                return
        }
        
    }

    return <div>
        <Card sx={{ maxWidth: 345, minHeight:100 }} >
            <div>
                <img src={props.itemImg} height={200} className="item_img"/>
            </div>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions className="action">
                <>
                    <IconButton className="roundedBtn">
                        <RemoveCircle onClick={()=> handleNavChange('minus')} className="roundedBtn" />
                    </IconButton>
                    <TextField 
                        value={qty}
                        size="small"
                        label={"quantity"} 
                        error={invalidEntry}
                        type={'number'}
                        className={'qtyfield'} 
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                    />
                    <IconButton className="roundedBtn" >
                        <AddCircle 
                            className="roundedBtn" 
                            onClick={()=> handleNavChange('add')}
                        />
                    </IconButton> 
                </>
                <div>
                    <Button size="small" color="primary" onClick={()=>handleAddItem()}>
                        Add to Cart <AddShoppingCart/>
                    </Button>
                </div>
            </CardActions>
        </Card>
    </div>
}