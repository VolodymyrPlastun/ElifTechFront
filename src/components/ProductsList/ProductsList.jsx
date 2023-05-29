import { Add, Remove, NorthWest } from '@mui/icons-material';
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
import {
  Amount,
  Box,
  BtnBox,
  ChooseBox,
  Container,
  Img,
  PizzaCard,
} from './ProductsList.styled';

const ProductsList = () => {
  const dispatch = useDispatch();

  const { products } = useSelector(state => state.cart);

  return (
    <Container>
      {products.length === 0 ? (
        <ChooseBox>
          <NorthWest />
          <h2>Choose your shop</h2>
        </ChooseBox>
      ) : (
        <Grid container spacing={2}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
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
                        <Button onClick={() => dispatch(decrease(product._id))}>
                          <Remove />
                        </Button>
                        <Amount>{product.amount}</Amount>
                        <Button
                          onClick={() => {
                            dispatch(increase(product._id));
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
      )}
    </Container>
  );
};

export default ProductsList;
