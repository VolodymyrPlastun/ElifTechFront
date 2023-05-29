import { Box, Button, Typography } from '@mui/material';
import ShopDrawer from 'components/ShopDrawer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { calculateTotal, makeOrder } from 'redux/features/cart/cartSlice';
import { createOrder } from '../../api';
import { toast } from 'react-hot-toast';
import {
  Container,
  PriceText,
  PriceTotal,
  TextBox,
  TotalBox,
} from './CartPage.styled';

const CartPage = () => {
  const dispatch = useDispatch();

  const { selectedItems, total, formData } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, selectedItems]);

  const order = () => {
      if(Object.keys(formData).length === 0) {
        toast.error("Please enter your data before order");
        return;
      }
      createOrder(formData, selectedItems)
      dispatch(makeOrder());
  }
  return (
    <Container>
      {selectedItems.length > 0 ? (
        <>
          <ShopDrawer />
          <TotalBox>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <PriceText variant="h4">
                Total price: <PriceTotal>{total} UAH</PriceTotal>
              </PriceText>
              <Button
                variant="contained"
                color="primary"
                onClick={() => order()}
              >
                Make an order
              </Button>
            </Box>
          </TotalBox>
        </>
      ) : (
        <TextBox>
          <Typography style={{ fontSize: '30px' }}>
            Choose products <Link to="/">here</Link>
          </Typography>
        </TextBox>
      )}
    </Container>
  );
};

export default CartPage;
