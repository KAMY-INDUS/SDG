// components/CartPage.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { userdb } from '@/firebaseConfig'; // Update this path according to your project structure

const CartPage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const userRef = doc(userdb, "users", session.user.name, "profile", "info");

    const fetchUser = async () => {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData);
        setCart(userData.cart);
        calculateTotalAmount(userData.cart); // Calculate total amount initially
      }
      setLoading(false);
    };

    fetchUser();

    return () => {
      // Clean up if necessary
    };
  }, [session]);

  const calculateTotalAmount = (cartItems) => {
    let total = 0;

    if (!Array.isArray(cartItems)) {
      console.error('Cart items is not an array:', cartItems);
      return;
    }

    cartItems.forEach((item) => {
      if (item.price && item.quantity) { // Check if price and quantity are defined
        total += (item.price * item.quantity);
      }
    });

    setTotalAmount(total);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div id='cart'>
      <h1>Cart Page</h1>
      <div>
        <h2>Cart</h2>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="post" key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
        <p>Total Amount: ${totalAmount}</p>
      </div>
    </div>
  );
};

export default CartPage;
