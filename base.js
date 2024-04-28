import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    alert("Logout Successfully");
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('userInfo');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
