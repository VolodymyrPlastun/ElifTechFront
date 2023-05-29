import { Add, Remove } from '@mui/icons-material';
import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AddProduct, decrease, increase } from 'redux/features/cart/cartSlice';
import { Amount, Box, BtnBox, Img, PizzaCard } from './CartList.styled';

const CartList = () => {
  const dispatch = useDispatch();

  const { selectedItems } = useSelector(state => state.cart);

  return (
    <div>
      <Grid container spacing={2}>
        {selectedItems?.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <PizzaCard style={{ height: '100%' }}>
              <Box>
                <CardActionArea>
                  <Img
                    component="img"
                    image={product.image}
                    title={product.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {product.description}
                    </Typography>
                    <Typography variant="h6" component="p">
                      {product.price} UAH
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  {product.amount < 1 ? (
                    <>
                      <Button
                        onClick={() => {
                          dispatch(
                            AddProduct({
                              id: product._id,
                              title: product.title,
                              description: product.description,
                              image: product.image,
                              price: product.price,
                              amount: product.amount,
                            })
                          );
                        }}
                        variant="contained"
                        size="small"
                        color="primary"
                      >
                        Add to cart
                      </Button>{' '}
                    </>
                  ) : (
                    <BtnBox>
                      <Button onClick={() => dispatch(decrease(product.id))}>
                        <Remove />
                      </Button>
                      <Amount>{product.amount}</Amount>
                      <Button
                        onClick={() => {
                          dispatch(increase(product.id));
                        }}
                      >
                        <Add />
                      </Button>
                    </BtnBox>
                  )}
                </CardActions>
              </Box>
            </PizzaCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CartList;
