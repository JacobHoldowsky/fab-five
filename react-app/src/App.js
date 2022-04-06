import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Posts from './components/Posts';
import Teams from './components/Teams'
import PlayerDetail from './components/PlayerDetail';
import TeamDetail from './components/TeamDetail';
import PostDetail from './components/PostDetail';
import { getAllPosts } from './store/post';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllPosts())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <ProtectedRoute path='/posts' exact={true} >
          <h1>Posts</h1>
          <Posts />
        </ProtectedRoute>
        <ProtectedRoute path='/teams' exact={true} >
          <h1>Teams</h1>
          <Teams />
        </ProtectedRoute>
        <ProtectedRoute path='/players/:playerId' exact={true} >
          <PlayerDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/teams/:teamId' exact={true} >
          <TeamDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/players/:playerId/posts/:postId' exact={true} >
          <PostDetail />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
