import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

const CartPage = lazy(() => import('../pages/CartPage'));
const HomePage = lazy(() => import('../pages/HomePage'));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Toaster position="top-right" duration="5000" />
    </div>
  );
};
