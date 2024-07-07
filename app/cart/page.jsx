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
    <div className="flex items-center justify-center min-h-screen">
      <p style={{fontSize:18,fontWeight:'bold'}}>Due to Time Constraint. We have only built Backend for Cart</p>
    </div>
  );
};

export default CartPage;
