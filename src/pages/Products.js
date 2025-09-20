import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/mockData';
import { useProducts } from '../context/ProductContext';

const Products = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-5">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary">Our Products</h1>
          <p className="text-muted">Discover our beautiful collection of flowers and arrangements</p>
        </div>

        {/* Search and Filter Section */}
        <div className="row mb-4">
          <div className="col-lg-6 mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-lg-6 mb-3">
            <div className="d-flex flex-wrap gap-2">
              <button
                className={`btn ${selectedCategory === 'All' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedCategory('All')}
              >
                All Products
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`btn ${selectedCategory === category.name ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <i className={`${category.icon} me-1`}></i>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-muted">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="row">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="fas fa-search fs-1 text-muted mb-3"></i>
            <h4 className="text-muted">No products found</h4>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-5 py-4 bg-light rounded">
          <h4 className="text-primary mb-3">Can't find what you're looking for?</h4>
          <p className="text-muted mb-3">
            We create custom arrangements for special occasions. Contact us to discuss your needs!
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a 
              href="https://www.instagram.com/botanic_lane25" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline-primary"
            >
              <i className="fab fa-instagram me-2"></i>Message Us
            </a>
            <a href="tel:+15551234567" className="btn btn-primary">
              <i className="fas fa-phone me-2"></i>Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
