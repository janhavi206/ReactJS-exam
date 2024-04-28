import React, { useEffect, useState } from 'react';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const filterProducts = (filterType) => {
    setRowCount(products.filter(product => {
      if (filterType === 'Expired') {
        const expiryYear = new Date(product.expiryDate).getFullYear();
        return expiryYear < new Date().getFullYear();
      } else if (filterType === 'LowStock') {
        return product.stock < 100;
      }
      return false;
    }).length);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Expiry Date</th>
            <th>Unit Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td className="primary-text">{product.medicineName}</td>
              <td>{product.medicineBrand}</td>
              <td className="primary-text">{product.expiryDate}</td>
              <td>${product.unitPrice}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>Count: {rowCount}</div>
      <div>
        <input type="checkbox" name="product-expired" onChange={() => filterProducts('Expired')} /> Expired
        <input type="checkbox" name="product-stock" onChange={() => filterProducts('LowStock')} /> Low Stock
      </div>
    </div>
  );
};

export default ProductListing;
