import { useState } from 'react';
import AddProduct from './components/AddProduct';
import CartList from './components/CartList';
import Checkout from './components/Checkout';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddProduct = (name, price) => {
    const newItem = {
      id: Date.now(),
      name,
      price: Number(price),
      quantity: 1,
    };
    setCart([...cart, newItem]);
  };

  const handleRemoveProduct = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleChangeQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map((item) => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <div className="cart-dashboard">
      <AddProduct onAddProduct={handleAddProduct} />
      <CartList 
        cart={cart} 
        onRemoveProduct={handleRemoveProduct} 
        onChangeQuantity={handleChangeQuantity} 
      />
      <Checkout cart={cart} />
    </div>
  );
}

export default App;
