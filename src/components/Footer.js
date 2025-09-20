import React from 'react';

const Footer = () => {
  return (
    <footer className="footer py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-white mb-3">
              <i className="fas fa-seedling me-2"></i>Botanic Lane
            </h5>
            <p className="text-light">
              Bringing nature's beauty to your doorstep with premium flowers, 
              bouquets, and arrangements for every occasion.
            </p>
          </div>
          
          <div className="col-md-4 mb-3">
            <h6 className="text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-light text-decoration-none">Products</a></li>
              <li><a href="/cart" className="text-light text-decoration-none">Shopping Cart</a></li>
              <li><a href="/admin" className="text-light text-decoration-none">Admin Panel</a></li>
            </ul>
          </div>
          
          <div className="col-md-4 mb-3">
            <h6 className="text-white mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a 
                href="https://www.instagram.com/botanic_lane25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-light fs-4"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com/botaniclane" className="text-light fs-4">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com/botaniclane" className="text-light fs-4">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <div className="mt-3">
              <p className="text-light mb-1">
                <i className="fas fa-phone me-2"></i>+1 (555) 123-4567
              </p>
              <p className="text-light mb-1">
                <i className="fas fa-envelope me-2"></i>info@botaniclane.com
              </p>
              <p className="text-light">
                <i className="fas fa-map-marker-alt me-2"></i>123 Flower St, Garden City
              </p>
            </div>
          </div>
        </div>
        
        <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-light mb-0">
              &copy; 2024 Botanic Lane. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-light mb-0">
              Made with <i className="fas fa-heart text-danger"></i> for flower lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
