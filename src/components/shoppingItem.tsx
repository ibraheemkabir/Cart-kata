import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AddCircle } from '@material-ui/icons';
import { RemoveCircle } from '@material-ui/icons';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { basketItems,stockItem } from './../types/shoppingItem';
import { useSelector } from 'react-redux';
import { RootState } from './../common/store';
import InputAdornment from '@mui/material/InputAdornment';

export const ShoppingItemContainer = (props:{
        storeItem:stockItem,
        itemImg:string,name:string,
        onAddItem:(item:basketItems)=>void,
        increaseQty: (index:number,qty:number) => void
    }) => {
    const [qty,setQty] = React.useState(0)
    const [weight,setWeight] = React.useState('0')

    const [invalidEntry,setInvalidEntry] = React.useState(false)
    const userCart = useSelector((state: RootState) => state.shoppingCart.cart);
    const { storeItem } = props;

    const handleAddItem = () => {
        if(Number(qty) ===  0){
            setInvalidEntry(true)
            return
        }
        const itemIdx = userCart.findIndex((e:basketItems)=> e.item.id === storeItem.id);
        if(itemIdx !== (-1)){
            props.increaseQty(itemIdx,qty)
        }else{
            props.onAddItem({"qty":qty,"item": props.storeItem})
        }
    }

    const handleQtyChange = (operator:string,value?:string) => {
        if(invalidEntry){
            setInvalidEntry(false)
        }
        switch(operator) {
            case 'minus':
                qty > 0 && setQty(qty-1);
                return
            case 'add':
                if(qty < props.storeItem.quantityInStock){
                    setQty(qty+1);
                }
                return
            case 'weight':
                setQty(Number(value||'0'))
                setWeight(value||'')
                return
            default:
                return
        }
        
    }

    return <div className="itemsContainer">
        <Card sx={{ maxWidth: 345, minHeight:100, justifyContent:"center", display:"flex" }}>
            <div>
                <div>
                    <img src={storeItem.itemImage} height={200} className="item_img"/>
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {storeItem.itemName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="product_description">
                        {storeItem.itemDescription}
                    </Typography>
                </CardContent>
                <CardActions className="action">
                    {
                        storeItem.priceType === 'unit' ?
                        <>
                            <IconButton className="roundedBtn" onClick={()=> handleQtyChange('minus')}>
                                <RemoveCircle className="roundedBtn" />
                            </IconButton>
                            <TextField 
                                value={qty}
                                size="small"
                                label={"quantity"} 
                                error={invalidEntry}
                                type={'number'}
                                disabled={true}
                                className={'qtyfield'} 
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                            />
                            <IconButton className="roundedBtn" onClick={()=> handleQtyChange('add')}>
                                <AddCircle 
                                    className="roundedBtn" 
                                />
                            </IconButton> 
                        </>
                        : <>
                            <TextField
                                label="Weight"
                                id="filled-start-adornment"
                                sx={{ m: 1, width: '10ch' }}
                                type={'number'}
                                error={invalidEntry}
                                className={'qtyfield'} 
                                onChange={(e)=>handleQtyChange('weight',e.target.value)}
                                value={weight}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                }}
                                variant="filled"
                            />
                        </>
                    }
                    <div>
                        <Button size="small" color="primary" onClick={()=>handleAddItem()}>
                            Add to Cart
                        </Button>
                    </div>
                </CardActions>
            </div>
        </Card>
    </div>
}