import React, { useState, useEffect } from 'react';
import './ProductList.scss'
export const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Apple",
      price: 10,
      details: "Fresh,  apples"
    },
    {
      id: 2,
      name: "Banana",
      price: 30,
      details: "Ripe, yellow bananas"
    },
    {
      id: 3,
      name: "Milk",
      price: 5,
      details: "1L of fresh milk"
    },
    {
      id: 4,
      name: "Bread",
      price: 2,
      details: "Loaf of whole wheat bread"
    },
    {
      id: 5,
      name: "Eggs",
      price: 2,
      details: "Dozen eggs from free-range chickens"
    },
    {
      id: 6,
      name: "Chicken",
      price: 2,
      details: "Boneless, skinless chicken "
    },
    {
      id: 7,
      name: "Tomato",
      price: 15,
      details: "Fresh, ripe tomatoes"
    },
    {
      id: 8,
      name: "Potato",
      price: 10,
      details: "Bag of medium-sized potatoes"
    },
    {
      id: 9,
      name: "Cucumber",
      price: 5,
      details: "Crisp, green cucumbers"
    },
    {
      id: 10,
      name: "Yogurt",
      price: 6,
      details: "500g of creamy yogurt"
    }
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const cartData = localStorage.getItem('cartItems');
    if (cartData) {
      const parsedCartData = JSON.parse(cartData);
      setCartItems(parsedCartData.cartItems);
      setTotalCost(parsedCartData.totalCost);
    }
  }, []);

  useEffect(() => {
    const cartData = { cartItems, totalCost };
    localStorage.setItem('cartItems', JSON.stringify(cartData));
  }, [cartItems, totalCost]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }

    setTotalCost(totalCost + product.price);
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
    setTotalCost(totalCost - item.price * item.quantity);
  };

  const changeQuantity = (item, newQuantity) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    const priceDifference = item.price * (newQuantity - item.quantity);
    setCartItems(updatedCartItems);
    setTotalCost(totalCost + priceDifference);
  };

  return (
    <div className='productListMainContainer'>
      <h1>Product List</h1>
        <table>
          <thead>
            <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Details</th>
            <th>Add To Cart</th>
            </tr>
          </thead>
          <tbody>
          {products.map(product => (
            <tr  key={product.id}>
              <td>{product?.name}</td>
              <td>${product?.price}</td>
              <td>{product?.details}</td>
              <td><button onClick={() => addToCart(product)}>Add to Cart</button></td>
            </tr>
                  ))}
          </tbody>
        </table>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <>
        <table>
          <thead>
            <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
            <th>changeQuantity</th>
            </tr>
          </thead>
          <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item?.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price * item.quantity}</td>
              <td>  <button onClick={() => removeFromCart(item)}>Remove</button></td>
              <td> <input
                type="number"
                value={item.quantity}
                onChange={(e) => changeQuantity(item, parseInt(e.target.value))}
              /></td>
            </tr>
                    ))}
          </tbody>
        </table>
          <h3>Total Cost: ${totalCost}</h3>
        </>
      )}
    </div>
  );
};

