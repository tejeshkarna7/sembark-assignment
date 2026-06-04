/** React Imports */
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/** Components */
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { ProductProvider } from './context/ProductContext';

/** Main Export */
function App() {
    return (
        <BrowserRouter>
            <ProductProvider>
                <CartProvider>
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                        <Header />
                        <div style={{ flex: 1 }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/product/:id" element={<ProductDetail />} />
                                <Route path="/cart" element={<Cart />} />
                            </Routes>
                        </div>
                    </div>
                </CartProvider>
            </ProductProvider>
        </BrowserRouter>
    );
}

export default App;
