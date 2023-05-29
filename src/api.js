import axios from 'axios';
import { getProducts } from 'redux/features/cart/cartSlice';
import { toast } from 'react-hot-toast';

const baseUrl = 'https://eliftech-testtask.onrender.com/';

axios.defaults.baseURL = baseUrl;

export const fetchPizza = async () => {
  try {
    const response = await axios.get('/api/products');
    return response.data.data.products;
  } catch (error) {
    toast.error('Ошибка при получении товаров:', error.message);
    throw error;
  }
};

export const fetchSushi = async () => {
  try {
    const response = await axios.get('/api/products/sushi');
    return response.data.data.products;
  } catch (error) {
    toast.error('Ошибка при получении товаров:', error.message);
    throw error;
  }
};

export const createOrder = async (userData, selectedProducts) => {
  try {
   await axios.post('/api/products/order', {
      userData,
      selectedProducts,
    });
    toast.success("Your order accepted!");
  } catch (error) {
    const errorMessage = error.response.data.message;
    if (errorMessage.includes('duplicate key error collection')) {
      toast.success('You are already registered, your order accepted');
    } else {
      console.log(errorMessage);
    }
    
  }
};

export const getAllProducts = async (dispatch, fetchData) => {
  try {
    const products = await fetchData();
    dispatch(getProducts(products));
  } catch (error) {
console.log(error.message);
  }
};
