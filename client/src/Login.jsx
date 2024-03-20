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

      //const responseData = await response.json();
    } catch (error) {
      // Handle error
    }
  };

  console.log(registerMode);
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div> { registerMode ?
        (<div className='max-w-md w-full space-y-8 p-10 absolute -left-12 inset-y-0 border-e-2 border-e-indigo-200 transition translate-x-12'>
          <h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Register</h1>
            <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            <div>
              <label htmlFor="username" className='sr-only' >Username</label>
              <input placeholder='Username' type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'/>
            </div>
            <div>
              <label htmlFor="email" className='sr-only' >Email</label>
              <input placeholder='Email' type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'/>
            </div>
            <div>
              <label htmlFor="password" className='sr-only'>Password</label>
              <input placeholder='Password' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'/>
            </div>
            <button type="submit" className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Register Now</button>
            <span onClick={toggleRegister} className='text-center mt-4 cursor-pointer hover:bg-sky-700'>Need an account?</span>
            </form>
        </div> ) : ( <div className='max-w-md w-full space-y-8 p-10 absolute -left-12 inset-y-0 border-e-2 border-e-indigo-200 transition translate-x-12 '>
          <h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Login</h1>
            <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            <div>
              <label htmlFor="username" className='sr-only' >Username</label>
              <input placeholder='Username' type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'/>
            </div>
            <div>
              <label htmlFor="password" className='sr-only'>Password</label>
              <input placeholder='Password' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'/>
            </div>
            <button type="submit" className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Login Now</button>
            <span onClick={toggleRegister} className='text-center mt-4 cursor-pointer hover:bg-sky-700'>Already have an account?</span>
            </form>
          </div>
           )
    } </div>
    </div>
  );
};

export default Login;
