import { CartProvider } from 'context/CartContext';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id/details" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
