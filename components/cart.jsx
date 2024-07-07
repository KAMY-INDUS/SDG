
"use client"
import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { userdb } from '@/firebaseConfig';
import Image from 'next/image';

const CartItems = ({ cartItems }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const fetchedItems = [];
      for (const itemId of cartItems) {
        const itemDoc = await getDoc(doc(userdb, 'products', itemId));
        if (itemDoc.exists()) {
          fetchedItems.push({ id: itemDoc.id, ...itemDoc.data() });
        }
      }
      setItems(fetchedItems);
    };

    fetchCartItems();
  }, [cartItems]);

  return (
    <div className="cart-items">
      <h2>Your Cart Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="item-image">
              <Image src={item.image} alt={item.name} height={100} width={100} />
            </div>
            <div className="item-details">
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              {/* Additional item details if needed */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItems;