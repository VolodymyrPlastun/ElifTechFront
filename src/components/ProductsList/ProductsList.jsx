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
import { Suspense } from 'react';
import Loader from 'components/Loader/Loader';

const ProductsList = () => {
  const dispatch = useDispatch();

  const { products, selectedItems } = useSelector(state => state.cart);



  return (
    <Container>
      {products.length === 0 ? (
        <ChooseBox>
          <NorthWest />
          <h2>Choose your shop</h2>
        </ChooseBox>
      ) : (
        <Suspense fallback={<Loader/>}>
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
                    {!selectedItems.find(item => item.id === product._id)?.amount ? (
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
                        <Amount>
                          {selectedItems.find(item => item.id === product._id)?.amount ? selectedItems.find(item => item.id === product._id).amount : 0}
                          {/* {product.amount} */}
                          </Amount>
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
        </Suspense>
      )}
    </Container>
  );
};

export default ProductsList;
