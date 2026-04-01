export default function CartList({ cart, onRemoveProduct, onChangeQuantity }) {
  return (
    <section className="your-cart-section">
      <h2>Your Cart</h2>
      
      <div className="cart-items">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th style={{ textAlign: 'center' }}>Quantity</th>
              <th>Total</th>
              <th></th> {/* Empty column header for the remove button */}
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <tr key={item.id} className="cart-item-row">
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>
                    <div className="quantity-controls">
                      <button className="qty-btn" onClick={() => onChangeQuantity(item.id, item.quantity - 1)}>-</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => onChangeQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => onRemoveProduct(item.id)}>Remove</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', fontStyle: 'italic', color: '#888' }}>
                  <p className="empty-cart-message">Your cart is empty.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
