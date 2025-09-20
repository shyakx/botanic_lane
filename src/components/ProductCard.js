import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const formatSalesCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k+ sold`;
    }
    return `${count}+ sold`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-warning"></i>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-warning"></i>);
    }
    
    return stars;
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card product-card h-100">
        <div className="position-relative">
          <img 
            src={product.image} 
            className="card-img-top product-image" 
            alt={product.name}
            onError={(e) => {
              // Fallback to a reliable flower image
              e.target.src = 'https://images.unsplash.com/photo-1563241527-3004b7be546d?w=400&h=400&fit=crop&auto=format';
            }}
            onLoad={(e) => {
              // Ensure image loads properly
              e.target.style.opacity = '1';
            }}
            style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
          />
          <span className="category-badge position-absolute top-0 start-0 m-3">
            {product.category}
          </span>
          {product.discount && (
            <span className="badge bg-danger position-absolute top-0 end-0 m-3">
              -{product.discount}%
            </span>
          )}
          {product.featured && !product.discount && (
            <span className="badge bg-warning position-absolute top-0 end-0 m-3">
              <i className="fas fa-star me-1"></i>Featured
            </span>
          )}
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          
          {/* Rating and Sales */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center">
              <div className="me-2">
                {renderStars(product.rating || 4.5)}
              </div>
              <small className="text-muted">({product.rating || 4.5})</small>
            </div>
            <small className="text-muted">{formatSalesCount(product.salesCount || 1000)}</small>
          </div>
          
          <p className="card-text text-muted flex-grow-1 small">{product.description}</p>
          
          {/* Pricing */}
          <div className="d-flex align-items-center mb-3">
            <span className="price-tag me-2">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through small">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <button 
            className="btn btn-primary btn-sm w-100"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <i className="fas fa-cart-plus me-1"></i>
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
