import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
    streetAddress: '',
    deliveryDate: '',
    specialInstructions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format phone number for Rwanda
    if (name === 'phone') {
      let formattedPhone = value.replace(/\D/g, ''); // Remove non-digits
      if (formattedPhone.startsWith('250')) {
        formattedPhone = formattedPhone.substring(3);
      }
      if (formattedPhone.length > 0) {
        formattedPhone = '+250 ' + formattedPhone;
      }
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    }
  };

  const validatePhoneNumber = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 12 && cleanPhone.startsWith('250');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      alert('Please enter a valid Rwandan phone number.');
      return;
    }
    
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear cart and redirect
    clearCart();
    alert('Order placed successfully! Thank you for choosing Botanic Lane.');
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="py-5">
        <div className="container">
          <div className="text-center py-5">
            <i className="fas fa-shopping-cart fs-1 text-muted mb-3"></i>
            <h3 className="text-muted">Your cart is empty</h3>
            <p className="text-muted mb-4">Add some items to your cart before checkout</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              <i className="fas fa-seedling me-2"></i>Shop Now
            </button>
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
            <h2 className="fw-bold text-primary mb-4">
              <i className="fas fa-credit-card me-2"></i>Checkout
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Customer Information */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="fas fa-user me-2"></i>Customer Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className={`form-control ${formData.phone && !validatePhoneNumber(formData.phone) ? 'is-invalid' : ''}`}
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+250 78X XXX XXX"
                        required
                      />
                      {formData.phone && !validatePhoneNumber(formData.phone) && (
                        <div className="invalid-feedback">
                          Please enter a valid Rwandan phone number (e.g., +250 78X XXX XXX)
                        </div>
                      )}
                      <small className="text-muted">Format: +250 78X XXX XXX</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="fas fa-truck me-2"></i>Delivery Address (Rwanda)
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Province *</label>
                      <select
                        className="form-select"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Province</option>
                        <option value="Kigali">Kigali</option>
                        <option value="Northern Province">Northern Province</option>
                        <option value="Southern Province">Southern Province</option>
                        <option value="Eastern Province">Eastern Province</option>
                        <option value="Western Province">Western Province</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">District *</label>
                    <input
                      type="text"
                      className="form-control"
                        name="district"
                        value={formData.district}
                      onChange={handleInputChange}
                        placeholder="e.g., Nyarugenge, Gasabo, Kicukiro"
                      required
                    />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Sector *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="sector"
                        value={formData.sector}
                        onChange={handleInputChange}
                        placeholder="e.g., Kimisagara, Gikondo"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Cell *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cell"
                        value={formData.cell}
                        onChange={handleInputChange}
                        placeholder="e.g., Kimisagara, Gikondo"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Village *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="village"
                        value={formData.village}
                        onChange={handleInputChange}
                        placeholder="e.g., Kimisagara, Gikondo"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Street Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        placeholder="House number, street name, landmarks"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Preferred Delivery Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Special Instructions</label>
                    <textarea
                      className="form-control"
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Any special delivery instructions, landmarks, or notes..."
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check me-2"></i>Place Order
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-receipt me-2"></i>Order Summary
                </h5>
              </div>
              <div className="card-body">
                {items.map(item => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <small className="fw-bold">{item.name}</small>
                      <br />
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <small className="fw-bold">
                      {new Intl.NumberFormat('rw-RW', {
                        style: 'currency',
                        currency: 'RWF',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(item.price * item.quantity)}
                    </small>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
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
                <div className="d-flex justify-content-between">
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
              </div>
            </div>

            {/* Security Notice */}
            <div className="card mt-3">
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-shield-alt me-2"></i>Secure Checkout
                </h6>
                <p className="small text-muted mb-0">
                  Your payment information is secure and encrypted. 
                  We'll contact you to arrange payment and delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

