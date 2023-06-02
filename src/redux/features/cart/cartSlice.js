import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  total: 0,
  amount: 0,
  selectedItems: [],
  products: [],
  formData: {},
  selectedShop: "",
  isActive: {
    isPizzaActive: false,
    isSushiActive: false,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    makeOrder: (state, { payload }) => {
      state.selectedItems = [];
      state.isActive = {
        isPizzaActive: false,
        isSushiActive: false,
      };
    },
    selectShop: (state, { payload }) => {
      state.selectedShop = payload;
      if (payload === "pizza") {
        state.isActive = {
          isPizzaActive: false,
          isSushiActive: true,
        };
      } else if (payload === "sushi") {
        state.isActive = {
          isPizzaActive: true,
          isSushiActive: false,
        };
      }
    },

    getProductsFromDB: (state, { payload }) => {
      state.products = payload;
    },
    getItemsFromLS: (state, { payload }) => {
      if (payload.items) {
        state.selectedItems = payload.items;
      }
      if (payload.shop) {
        state.selectedShop = payload.shop;
      }
      if (payload.userData) {
        state.formData = payload.userData;
      }
    },
    increase: (state, { payload }) => {
      const itemInCart = state.selectedItems.find(
        (item) => item.id === payload
      );
      itemInCart.amount++;
    },

    decrease: (state, { payload }) => {
      const itemInCart = state.selectedItems.find(
        (item) => item.id === payload
      );
      if (itemInCart.amount > 1) {
        itemInCart.amount--;
      } else {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.id !== payload
        );
      }
      if (state.selectedItems.length === 0) {
        localStorage.removeItem("selectedItems");
        state.isActive = {
          isPizzaActive: false,
          isSushiActive: false,
        };
      }
    },
    AddProduct: (state, { payload }) => {
      const itemInCart = state.selectedItems.find(
        (item) => item.id === payload.id
      );
      if (itemInCart) {
        itemInCart.amount++;
      } else {
        state.selectedItems.push({ ...payload, amount: 1 });
      }
      if (state.selectedShop === "pizza") {
        state.isActive = {
          isPizzaActive: false,
          isSushiActive: true,
        };
      } else if (state.selectedShop === "sushi") {
        state.isActive = {
          isPizzaActive: true,
          isSushiActive: false,
        };
      }
    },
    calculateTotal: (state, { payload }) => {
      let totalPrice = 0;
      state.selectedItems.forEach((item) => {
        if (item.amount) {
          totalPrice += item.amount * item.price;
        }
      });
      state.total = totalPrice;
    },
    saveFormData: (state, { payload }) => {
      if (state.formData.email === payload.email) {
        toast.error("Your email already saved");
        return;
      }
      state.formData = payload;
      toast.success("Your data has been saved");
    },
    resetData: (state, { payload }) => {
      state.formData = {};
    },
  },
});

export const {
  increase,
  decrease,
  AddProduct,
  calculateTotal,
  getProductsFromDB,
  saveFormData,
  selectShop,
  makeOrder,
  getItemsFromLS,
  resetData,
} = cartSlice.actions;

export default cartSlice.reducer;
