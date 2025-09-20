import React, { createContext, useContext, useState } from 'react';
import { products } from '../data/mockData';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [globalProducts, setGlobalProducts] = useState(products);

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

  const value = {
    products: globalProducts,
    updateProduct,
    addProduct,
    deleteProduct
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
