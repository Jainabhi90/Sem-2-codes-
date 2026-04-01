export default function Checkout({ cart }) {
  let totalAmount = 0;
  for (let i = 0; i < cart.length; i++) {
    totalAmount += cart[i].price * cart[i].quantity;
  }

  return (
    <section className="checkout-section">
      <div className="total-display">
        <span>Total Amount:</span>
        <strong>{totalAmount.toFixed(2)}</strong>
      </div>
      <button className="btn btn-success checkout-btn">
        Checkout
      </button>
    </section>
  );
}
