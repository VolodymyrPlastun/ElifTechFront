import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
  total: 0,
  amount: 0,
  selectedItems: [],
  products: [],
  formData: {},
  selectedShop: '',
  isActive: {
    isPizzaActive: false,
    isSushiActive: false
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    makeOrder: (state, {payload}) => {
      state.isActive = {
        isPizzaActive: false,
        isSushiActive: false
      }
    },
    selectShop: (state, {payload}) => {
      state.selectedShop = payload.shop;
      if(payload.shop === 'pizza') {
        state.isActive = {
          isPizzaActive: false,
          isSushiActive: true
        }
        } else if (payload.shop === 'sushi'){
          state.isActive = {
            isPizzaActive: true,
            isSushiActive: false
          }
        }
    },

    getProducts:(state, {payload}) => {
      state.products = payload;
    },
    increase: (state, { payload }) => {
      const itemInCart = state.selectedItems.find(item => item.id === payload);
      const productsItem = state.products.find(item => item._id === payload);
      itemInCart.amount++;
      productsItem.amount++;
    },
    decrease: (state, { payload }) => {
      const itemInCart = state.selectedItems.find(item => item.id === payload);
      const productsItem = state.products.find(item => item._id === payload);
      if(itemInCart.amount > 1) {
        itemInCart.amount--;
        productsItem.amount--;
      } else {
        productsItem.amount = 0;
        state.selectedItems = state.selectedItems.filter(item => item.id !== payload)
      }
      if(state.selectedItems.length === 0) {
        state.isActive = {
          isPizzaActive: false,
          isSushiActive: false
        }
      
      }
    },
    AddProduct: (state, {payload}) => {
      const itemInCart = state.selectedItems.find(item => item.id === payload.id);
      const productsItem = state.products.find(item => item._id === payload.id);

      if (itemInCart) {
        itemInCart.amount++;
        
      } else {
        state.selectedItems.push({ ...payload, amount: 1 });
      }
      productsItem.amount++;
      if(state.selectedShop === 'pizza') {
        state.isActive = {
          isPizzaActive: false,
          isSushiActive: true
        }
        } else if (state.selectedShop === 'sushi'){
          state.isActive = {
            isPizzaActive: true,
            isSushiActive: false
          }
        }
    },
    calculateTotal: (state, { payload }) => {
      let totalPrice = 0;
      state.selectedItems.forEach(item => {
        if(item.amount) {
          totalPrice += item.amount * item.price;
        }
      });
      state.total = totalPrice;
    },
    saveFormData: (state, { payload }) => {
      if(state.formData.email === payload.email) {
        toast.error("Your email already saved")
        return;
      }
      state.formData = payload;
      toast.success("Your data has been saved")
    },
  },
});

export const { increase, decrease, AddProduct, calculateTotal, getProducts, saveFormData, selectShop, makeOrder } =
  cartSlice.actions;

export default cartSlice.reducer;
