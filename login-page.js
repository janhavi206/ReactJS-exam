import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === password) {
      alert('Login Successfully');
      localStorage.setItem('isLoggedIn', true);
      const userInfo = {
        username: username,
        password: password
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      window.location.assign('orders-page.html'); // Note: This is not a typical React way to navigate. You should use React Router for navigation in a React app.
    } else {
      alert('Please enter valid credentials!');
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" id="login-btn">Login</button>
    </form>
  );
};

export default LoginForm;
