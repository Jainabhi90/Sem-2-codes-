import { useState } from 'react';

export default function AddProduct({ onAddProduct }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!productName || !price) return;
    onAddProduct(productName, price);
    setProductName('');
    setPrice('');
  };

  return (
    <>
      <header className="cart-header">
        <h1>Shopping Cart</h1>
      </header>

      <section className="add-product-section">
        <h2>Add Products</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="price"
            value={price}
            step="0.5"
            onChange={(e) => setPrice(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAdd}>
            add to cart
          </button>
        </div>
      </section>
    </>
  );
}
