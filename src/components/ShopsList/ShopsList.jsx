import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from 'redux/features/cart/cartSlice';
import { fetchPizza, fetchSushi, getAllProducts } from '../../api';

const ShopsList = () => {
  const dispatch = useDispatch();

  const { selectedShop, isActive } = useSelector(state => state.cart);

  const handleShopSelect = e => {
    const shop = e.target.id;
    dispatch(
      selectShop({
        shop,
      })
    );
  };

  useEffect(() => {
    if (selectedShop === 'sushi') {
      getAllProducts(dispatch, fetchSushi);
    } else if (selectedShop === 'pizza') {
      getAllProducts(dispatch, fetchPizza);
    }
  }, [dispatch, selectedShop]);
  
  return (
    <Box>
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <Button
                disabled={isActive.isPizzaActive}
                sx={{ width: '150px' }}
                variant="contained"
                onClick={handleShopSelect}
                id="pizza"
              >
                Pizza
              </Button>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Button
                disabled={isActive.isSushiActive}
                sx={{ width: '150px' }}
                variant="contained"
                onClick={handleShopSelect}
                id="sushi"
              >
                Sushi
              </Button>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default ShopsList;
