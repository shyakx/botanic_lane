import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/mockData';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // Load products from localStorage or use default
  const [globalProducts, setGlobalProducts] = useState(() => {
    const savedProducts = localStorage.getItem('botanic-lane-products');
    return savedProducts ? JSON.parse(savedProducts) : products;
  });

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('botanic-lane-products', JSON.stringify(globalProducts));
  }, [globalProducts]);

  const updateProduct = (productId, updatedProduct) => {
    setGlobalProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const addProduct = (newProduct) => {
    setGlobalProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const deleteProduct = (productId) => {
    setGlobalProducts(prevProducts =>
      prevProducts.filter(product => product.id !== productId)
    );
  };

  const resetProducts = () => {
    setGlobalProducts(products);
    localStorage.removeItem('botanic-lane-products');
  };

  const value = {
    products: globalProducts,
    updateProduct,
    addProduct,
    deleteProduct,
    resetProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
