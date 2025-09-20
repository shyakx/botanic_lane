import React, { useState } from 'react';
import { orders } from '../data/mockData';
import { useProducts } from '../context/ProductContext';

const Admin = () => {
  const { products: globalProducts, updateProduct, addProduct, deleteProduct } = useProducts();
  const [activeTab, setActiveTab] = useState('orders');
  const [orderStatus, setOrderStatus] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});

  const handleStatusChange = (orderId, newStatus) => {
    setOrderStatus(prev => ({
      ...prev,
      [orderId]: newStatus
    }));
  };

  const getOrderStatus = (orderId) => {
    return orderStatus[orderId] || orders.find(order => order.id === orderId)?.status || 'pending';
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning';
      case 'processing': return 'bg-info';
      case 'completed': return 'bg-success';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      deleteProduct(productId);
      alert('Product deleted successfully!');
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: Math.max(...globalProducts.map(p => p.id)) + 1,
      name: prompt('Enter product name:'),
      price: parseFloat(prompt('Enter product price (RWF):')) || 0,
      originalPrice: parseFloat(prompt('Enter original price (RWF):')) || 0,
      discount: parseInt(prompt('Enter discount percentage:')) || 0,
      image: prompt('Enter image URL:') || 'https://images.unsplash.com/photo-1563241527-3004b7be546d?w=400&h=400&fit=crop&auto=format',
      category: prompt('Enter category (Bouquets/Arrangements/Plants):') || 'Bouquets',
      description: prompt('Enter product description:') || 'Beautiful product',
      inStock: true,
      featured: false,
      rating: 4.5,
      salesCount: 0
    };

    if (newProduct.name && newProduct.price > 0) {
      addProduct(newProduct);
      alert('Product added successfully!');
    } else {
      alert('Please provide valid product information.');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      discount: product.discount || 0,
      image: product.image,
      category: product.category,
      description: product.description,
      inStock: product.inStock,
      featured: product.featured || false,
      rating: product.rating || 4.5,
      salesCount: product.salesCount || 0
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editForm.name || !editForm.price) {
      alert('Please fill in all required fields.');
      return;
    }

    updateProduct(editingProduct.id, editForm);

    setShowEditModal(false);
    setEditingProduct(null);
    setEditForm({});
    alert('Product updated successfully!');
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    setEditForm({});
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => getOrderStatus(order.id) === 'pending').length;
  const completedOrders = orders.filter(order => getOrderStatus(order.id) === 'completed').length;

  return (
    <div className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary">
            <i className="fas fa-cog me-2"></i>Admin Dashboard
          </h2>
          <div className="text-muted">
            <i className="fas fa-user me-1"></i>Welcome, Admin
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="mb-0">{orders.length}</h4>
                    <p className="mb-0">Total Orders</p>
                  </div>
                  <i className="fas fa-shopping-cart fs-2"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card bg-warning text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="mb-0">{pendingOrders}</h4>
                    <p className="mb-0">Pending Orders</p>
                  </div>
                  <i className="fas fa-clock fs-2"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card bg-success text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="mb-0">{completedOrders}</h4>
                    <p className="mb-0">Completed</p>
                  </div>
                  <i className="fas fa-check-circle fs-2"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card bg-info text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="mb-0">
                      {new Intl.NumberFormat('rw-RW', {
                        style: 'currency',
                        currency: 'RWF',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(totalRevenue)}
                    </h4>
                    <p className="mb-0">Total Revenue</p>
                  </div>
                  <i className="fas fa-dollar-sign fs-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <i className="fas fa-list me-2"></i>Orders
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <i className="fas fa-seedling me-2"></i>Products
            </button>
          </li>
        </ul>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>Order Management
              </h5>
            </div>
            <div className="card-body">
              {orders.map(order => (
                <div key={order.id} className="border rounded p-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <strong>Order #{order.id}</strong>
                      <br />
                      <small className="text-muted">{order.orderDate}</small>
                    </div>
                    
                    <div className="col-md-3">
                      <strong>{order.customerName}</strong>
                      <br />
                      <small className="text-muted">{order.email}</small>
                      <br />
                      <small className="text-muted">{order.phone}</small>
                    </div>
                    
                    <div className="col-md-3">
                      <div>
                        {order.items.map((item, index) => {
                          const product = globalProducts.find(p => p.id === item.productId);
                          return (
                            <div key={index} className="small">
                              {product?.name} x{item.quantity}
                            </div>
                          );
                        })}
                      </div>
                      <strong className="text-primary">
                        {new Intl.NumberFormat('rw-RW', {
                          style: 'currency',
                          currency: 'RWF',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        }).format(order.total)}
                      </strong>
                    </div>
                    
                    <div className="col-md-2">
                      <select
                        className="form-select form-select-sm"
                        value={getOrderStatus(order.id)}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    
                    <div className="col-md-2">
                      <span className={`badge ${getStatusBadgeClass(getOrderStatus(order.id))}`}>
                        {getOrderStatus(order.id).charAt(0).toUpperCase() + getOrderStatus(order.id).slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  {order.specialInstructions && (
                    <div className="mt-2">
                      <small className="text-muted">
                        <strong>Special Instructions:</strong> {order.specialInstructions}
                      </small>
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <small className="text-muted">
                      <strong>Delivery Address:</strong> {order.deliveryAddress}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="fas fa-seedling me-2"></i>Product Management
              </h5>
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleAddProduct}
              >
                <i className="fas fa-plus me-1"></i>Add Product
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {globalProducts.map(product => (
                      <tr key={product.id}>
                        <td>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            className="rounded"
                          />
                        </td>
                        <td>
                          <strong>{product.name}</strong>
                          <br />
                          <small className="text-muted">{product.description}</small>
                        </td>
                        <td>
                          <span className="badge bg-secondary">{product.category}</span>
                        </td>
                        <td>
                          <strong className="text-primary">
                            {new Intl.NumberFormat('rw-RW', {
                              style: 'currency',
                              currency: 'RWF',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                            }).format(product.price)}
                          </strong>
                        </td>
                        <td>
                          <span className={`badge ${product.inStock ? 'bg-success' : 'bg-danger'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td>
                          {product.featured && (
                            <i className="fas fa-star text-warning"></i>
                          )}
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-primary"
                              onClick={() => handleEditProduct(product)}
                              title="Edit Product"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn btn-outline-danger"
                              onClick={() => handleDeleteProduct(product.id)}
                              title="Delete Product"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {showEditModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="fas fa-edit me-2"></i>Edit Product
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={handleCancelEdit}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Product Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Price (RWF) *</label>
                        <input
                          type="number"
                          className="form-control"
                          value={editForm.price || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Original Price (RWF)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={editForm.originalPrice || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Discount (%)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={editForm.discount || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, discount: parseInt(e.target.value) }))}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select
                          className="form-select"
                          value={editForm.category || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="Bouquets">Bouquets</option>
                          <option value="Arrangements">Arrangements</option>
                          <option value="Plants">Plants</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Product Image</label>
                        <div className="mb-2">
                          <img 
                            src={editForm.image || ''} 
                            alt="Product preview" 
                            className="img-fluid rounded"
                            style={{ maxHeight: '200px', width: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <small className="text-muted">Or enter image URL:</small>
                        <input
                          type="url"
                          className="form-control mt-1"
                          placeholder="https://example.com/image.jpg"
                          value={editForm.image || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.value }))}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={editForm.description || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={editForm.inStock || false}
                              onChange={(e) => setEditForm(prev => ({ ...prev, inStock: e.target.checked }))}
                            />
                            <label className="form-check-label">In Stock</label>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={editForm.featured || false}
                              onChange={(e) => setEditForm(prev => ({ ...prev, featured: e.target.checked }))}
                            />
                            <label className="form-check-label">Featured</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleSaveEdit}
                  >
                    <i className="fas fa-save me-2"></i>Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
