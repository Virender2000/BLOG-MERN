import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  async  function register(e) {
        e.preventDefault();
        // sending the response to the server
     const response= await  fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // JSON.stringify converts the js obj into JSON string
            body: JSON.stringify({ username,password })
        });
if(response.status!==200){
    alert('registration failed')
}
else{
    alert('registration sucessful')
}
}


    return (
        <form className='register' onSubmit={register}>
            <h1>Register..</h1>
            <input type="text" name="username"
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />

            <input type="password" name="password"
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

            <button>Register</button>
        </form>
    )
}

export default Register