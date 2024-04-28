import React, { useEffect, useState } from 'react';

const UserListing = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const filterUsers = (text) => {
    setSearchText(text);
    const filtered = users.filter(user => user.fullName.toUpperCase().includes(text.toUpperCase()));
    setFilteredUsers(filtered);
  };

  const resetFilter = () => {
    setSearchText('');
    setFilteredUsers(users);
  };

  return (
    <div>
      <form id="search-container" onSubmit={(e) => e.preventDefault()}>
        <input
          id="search-box"
          type="text"
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => filterUsers(e.target.value)}
        />
        <button id="reset-btn" type="button" onClick={resetFilter}>Reset</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody id="user-rows">
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td><img src={user.profilePic} alt="Avatar" /></td>
              <td>{user.fullName}</td>
              <td className="primary-text">{user.dob}</td>
              <td>{user.gender}</td>
              <td>{`${user.currentCity}, ${user.currentCountry}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListing;
