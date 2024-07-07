"use client";
import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, updateDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore, userdb } from '@/firebaseConfig';
import { useSession } from "next-auth/react";
import { CircleCheckBig, IndianRupee, ListFilter } from "lucide-react";
import Image from "next/image";
import { FaCartPlus, FaRegHeart, FaHeart } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const Order = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const { data: session } = useSession();
  const [likes, setLikes] = useState(new Set());

  useEffect(() => {
    if (!session) return;

    const userPostsRef = collection(firestore, "products");
    const userRef = doc(userdb, "users", session.user.name, "profile", "info");

    const q = query(userPostsRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    }, (error) => {
      console.error("Error fetching posts: ", error);
    });

    const fetchUser = async () => {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData);
        setLikes(new Set(userData.likes || []));
      }
      setLoading(false);
    };

    fetchUser();

    return () => {
      unsubscribe();
    };
  }, [session]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const updateCart = async (postId) => {
    const docRef = doc(userdb, "users", session.user.name, "profile", "info");
    const userDoc = await getDoc(docRef);
    const cartItems = userDoc.data().cart || [];
    
    if (!cartItems.includes(postId)) {
      cartItems.push(postId);
    }

    await updateDoc(docRef, {
      cart: cartItems,
    });
  };

  const toggleLike = async (postId) => {
    const docRef = doc(userdb, "users", session.user.name, "profile", "info");
    const userDoc = await getDoc(docRef);
    const userLikes = new Set(userDoc.data().likes || []);

    if (userLikes.has(postId)) {
      userLikes.delete(postId);
    } else {
      userLikes.add(postId);
    }

    await updateDoc(docRef, {
      likes: Array.from(userLikes),
    });

    setLikes(userLikes);
    updatePostLikes(postId, !userLikes.has(postId));
  };

  const updatePostLikes = async (postId, isLiked) => {
    const postRef = doc(firestore, "products", postId);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      const postData = postDoc.data();
      const newLikesCount = isLiked ? postData.likes - 1 : postData.likes + 1;

      await updateDoc(postRef, {
        likes: newLikesCount,
      });
    }
  };

  const filteredPosts = posts.filter((post) => post.category.includes(filter));

  return (
    <section id="order">
      <span className="font-semibold" style={{ fontSize: 26 }}>
        Order
      </span>
      <div className="flex gap-2 items-center justify-start relative left-4">
        <span
          className="flex justify-center items-center gap-2 shadow-inner p-2 rounded-md"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <ListFilter size={18} />
          Filter
        </span>
        <select
          style={{ zIndex: 0 }}
          name="category"
          className="dropdown shadow-inner rounded-md p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="" selected>
            Select Product Category
          </option>
          <option value="recyclable-waste">Recyclable Waste</option>
          <option value="recycled-product">Recycled Product</option>
        </select>
      </div>
      <div className="posts">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post shadow-md">
            <span className="verifybtn">
              Verified<CircleCheckBig />
            </span>
            <Image src={post.image} height={1000} width={1000} className="post-image" />
            <div className="flex flex-col gap-2 px-4">
              <div>
                <p style={{ fontSize: 20 }}>
                  <strong>{post.name}</strong>
                </p>
                <p style={{ fontSize: 14 }}>
                  <i>Sold By {post.username}</i>
                </p>
              </div>
              <span
                className="atcbtn shadow-inner cursor-pointer"
                style={{ fontSize: 14 }}
                onClick={() => updateCart(post.id)}
              >
                <FaCartPlus />
                Add to Cart
              </span>
              <p className="text-justify" style={{ fontSize: 14 }}>
                {post.desc}
              </p>
              <span className="itembtn">
                <span className="flex gap-0 items-center justify-center">
                  <IndianRupee size={18} />
                  {post.price}
                </span>
                <span
                  className="flex gap-1 items-center justify-center cursor-pointer"
                  onClick={() => toggleLike(post.id)}
                >
                  {likes.has(post.id) ? <FaHeart /> : <FaRegHeart />}
                  {post.likes}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Order;
