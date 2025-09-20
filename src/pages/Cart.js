import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-5">
        <div className="container">
          <div className="text-center py-5">
            <i className="fas fa-shopping-cart fs-1 text-muted mb-3"></i>
            <h3 className="text-muted">Your cart is empty</h3>
            <p className="text-muted mb-4">Add some beautiful flowers to get started!</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              <i className="fas fa-seedling me-2"></i>Shop Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold text-primary">
                <i className="fas fa-shopping-cart me-2"></i>Shopping Cart
              </h2>
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={clearCart}
              >
                <i className="fas fa-trash me-1"></i>Clear Cart
              </button>
            </div>

            <div className="card">
              <div className="card-body">
                {items.map(item => (
                  <div key={item.id} className="row align-items-center py-3 border-bottom">
                    <div className="col-md-2">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{ height: '80px', objectFit: 'cover' }}
                      />
                    </div>
                    
                    <div className="col-md-4">
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">{item.category}</small>
                    </div>
                    
                    <div className="col-md-2">
                      <span className="fw-bold text-primary">
                        {new Intl.NumberFormat('rw-RW', {
                          style: 'currency',
                          currency: 'RWF',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        }).format(item.price)}
                      </span>
                    </div>
                    
                    <div className="col-md-2">
                      <div className="input-group input-group-sm">
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          className="form-control text-center"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                        />
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-md-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold">
                          {new Intl.NumberFormat('rw-RW', {
                            style: 'currency',
                            currency: 'RWF',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          }).format(item.price * item.quantity)}
                        </span>
                        <button 
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-receipt me-2"></i>Order Summary
                </h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({items.reduce((total, item) => total + item.quantity, 0)} items):</span>
                  <span>
                    {new Intl.NumberFormat('rw-RW', {
                      style: 'currency',
                      currency: 'RWF',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(getTotalPrice())}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery:</span>
                  <span className="text-success">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong className="text-primary">
                    {new Intl.NumberFormat('rw-RW', {
                      style: 'currency',
                      currency: 'RWF',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(getTotalPrice())}
                  </strong>
                </div>
                
                <Link to="/checkout" className="btn btn-primary w-100 mb-2">
                  <i className="fas fa-credit-card me-2"></i>Proceed to Checkout
                </Link>
                
                <Link to="/products" className="btn btn-outline-primary w-100">
                  <i className="fas fa-arrow-left me-2"></i>Continue Shopping
                </Link>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="card mt-3">
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-truck me-2"></i>Delivery Information
                </h6>
                <ul className="list-unstyled small">
                  <li><i className="fas fa-check text-success me-2"></i>Free delivery on all orders</li>
                  <li><i className="fas fa-check text-success me-2"></i>Same-day delivery available</li>
                  <li><i className="fas fa-check text-success me-2"></i>Fresh flowers guaranteed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
