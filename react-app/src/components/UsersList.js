import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './UsersList.css'

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    let teams = Object.values(user.teams)
    let posts = Object.values(user.posts)
    return (
      <li className='user-list-user' key={user.id}>
        <NavLink className='ul-username' to={`/users/${user.id}`}>{user.username}</NavLink>
        <div className='user-list-info'>
          {teams.length === 1 && <div>{teams.length} team</div>}
          {teams.length !== 1 && <div>{teams.length} teams</div>}
          <div>|</div>
          {posts.length === 1 && <div>{posts.length} post</div>}
          {posts.length !== 1 && <div>{posts.length} posts</div>}
        </div>
      </li>
    );
  });

  return (
    <>
      <h1>Users</h1>
      <div >
        <ul className='users'>{userComponents}</ul>

      </div>
    </>
  );
}

export default UsersList;
