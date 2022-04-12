
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/posts' exact={true} activeClassName='active'>
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink to='/teams' exact={true} activeClassName='active'>
            Teams
          </NavLink>
        </li>
        <li>
          <NavLink to='/teams/new' exact={true} activeClassName='active'>
            Build a new team
          </NavLink>
        </li>
        <li>
          <NavLink to='/posts/new' exact={true} activeClassName='active'>
            Make a new post
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
