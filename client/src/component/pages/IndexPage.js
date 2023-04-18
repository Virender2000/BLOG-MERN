import React, { useEffect, useState } from 'react'
import Post from '../Post'
const IndexPage = () => {
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/post').then( response =>{
            response.json().then(posts =>{
                setPosts(posts);
            }).catch((error) => {
              console.error('Error:', error);
              console.log("server is down!!")   
            });
        });
    },[]);
  return (
    <>
   {posts.length >0 && posts.map(post =>(
   <div  key={posts.id}>
 <Post data={post} />
   </div>
  ))}
    </>
  )
}

export default IndexPage