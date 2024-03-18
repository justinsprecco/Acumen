import React, { useState } from 'react';


const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(false);

  const toggleRegister = () => {
    setRegisterMode(!registerMode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // user submitted data
    const data = {
      username,
      email,
      password
    };

    // make API call.
    try {
      let api = registerMode ? 'http://localhost:3000/api/auth/register' : 'http://localhost:3000/api/auth/login';
      console.log(data);
      console.log(`Mode is: ${api}`);
        const response = await fetch(api, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
      });

      if(!response.ok) {
        throw new Error(`Login request failed: ${response.status}`);
      }

      const responseData = await response.json();
    } catch (error) {
      // Handle error
    }
  };

  console.log(registerMode);
  return (
    <div>
      <div> { registerMode ?
        (<div>
          <h1>Register</h1>
            <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" >Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="email" >Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="password" >Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Register Now</button>
            </form>
        </div>) : (<div><h1>Login</h1>
            <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" >Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="password" >Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Login Now</button>
            </form>
          </div>
           )
    } </div>
            <span onClick={toggleRegister}>{registerMode ? 'Already have an account?' : 'Need an account?'} </span>
    </div>
  );
};

export default Login;
