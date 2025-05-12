import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
const ProductDetail = () => {
    const [posts , setPosts] = useState({})
    const {id} = useParams();
    const fetchPostApi = async () => {
    try {
      const result = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const response = await result.json();
      console.log("response detail:", response);
      setPosts(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchPostApi()
  },[id])
  return (
    <div>
      <h1>userId :{posts.userId}</h1>
      <h2>Title : {posts.title}</h2>
      <h3>Body : {posts.body}</h3>
    </div>
  )
}

export default ProductDetail
