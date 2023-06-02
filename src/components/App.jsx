import { lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getItemsFromLS } from "redux/features/cart/cartSlice";

const CartPage = lazy(() => import("../pages/CartPage"));
const HomePage = lazy(() => import("../pages/HomePage"));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const selectedItemsString = localStorage.getItem("selectedItems");
    const selectedShop = localStorage.getItem("selectedShop");
    const userData = localStorage.getItem("userData");

    if (selectedItemsString) {
      const parsedSelectedItems = JSON.parse(selectedItemsString);
      dispatch(
        getItemsFromLS({
          items: parsedSelectedItems,
        })
      );
    }
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      dispatch(
        getItemsFromLS({
          userData: parsedUserData,
        })
      );
    }
    if (selectedShop) {
      dispatch(
        getItemsFromLS({
          shop: selectedShop,
        })
      );
    }
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Toaster position="top-right" duration="5000" />
    </div>
  );
};
