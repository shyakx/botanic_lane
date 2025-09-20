import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold text-primary mb-4">
                Welcome to Botanic Lane
              </h1>
              <p className="lead mb-4">
                Discover the perfect flowers for every occasion. From romantic bouquets 
                to elegant arrangements, we bring nature's beauty to your doorstep.
              </p>
              <div className="d-flex gap-3">
                <Link to="/products" className="btn btn-primary btn-lg">
                  <i className="fas fa-seedling me-2"></i>Shop Now
                </Link>
                <a 
                  href="https://www.instagram.com/botanic_lane25" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-lg"
                >
                  <i className="fab fa-instagram me-2"></i>Follow Us
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1520763185298-1b434c919102?w=600&h=400&fit=crop" 
                alt="Beautiful flowers" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary">Featured Products</h2>
            <p className="text-muted">Our most popular and beautiful arrangements</p>
          </div>
          
          <div className="row">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Link to="/products" className="btn btn-outline-primary">
              View All Products <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="instagram-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary">
              <i className="fab fa-instagram me-2"></i>Follow Our Journey
            </h2>
            <p className="text-muted">See our latest creations and behind-the-scenes moments</p>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <div className="mb-4">
                    <i className="fab fa-instagram text-primary" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h4 className="text-primary mb-3">@botanic_lane25</h4>
                  <p className="text-muted mb-4">
                    Follow us on Instagram to see our latest flower arrangements, 
                    behind-the-scenes moments, and customer stories. We share daily 
                    inspiration and beautiful botanical content!
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <a 
                      href="https://www.instagram.com/botanic_lane25" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-lg"
                    >
                      <i className="fab fa-instagram me-2"></i>Follow Us
                    </a>
                    <a 
                      href="https://www.instagram.com/botanic_lane25" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-lg"
                    >
                      <i className="fas fa-external-link-alt me-2"></i>View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary">Why Choose Botanic Lane?</h2>
          </div>
          
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-truck fs-3"></i>
                </div>
                <h5>Fresh Delivery</h5>
                <p className="text-muted">Same-day delivery available for orders placed before 2 PM</p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-leaf fs-3"></i>
                </div>
                <h5>Premium Quality</h5>
                <p className="text-muted">Only the freshest flowers sourced from trusted suppliers</p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-heart fs-3"></i>
                </div>
                <h5>Expert Arrangement</h5>
                <p className="text-muted">Beautifully arranged by our skilled florists</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
