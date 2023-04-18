import React, { useContext, useEffect, useState } from 'react'
import { Link, redirect } from 'react-router-dom'
import { UserContext } from '../UserContext';
const Header = () => {
  // const [username, setUsername] = useState('');

  const {userInfo,setUserInfo}=useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response => {
      response.json().then(info => {
        // setUsername(userinfo.username);
        setUserInfo(info);
        
      });
    })
  }, []);

  const logout = ()=>{
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method:'POST'
    })
    // setUsername(null);
    setUserInfo(null);
    
  }

const username=userInfo?.username;


  return (
    <header>
      <a href="/" className="logo">MyBlog</a>
      <nav>
        {username && (<>
          <Link to="/create"> Add Post</Link>
          <a onClick={logout} style={{cursor: "pointer"}}>Logout</a>
        </>)}
        {
          !username && (
            <>
              <Link to="/login"> Login</Link>
              <Link to="/register">Register</Link>
            </>
          )
        }

      </nav>
    </header>
  )
}

export default Header