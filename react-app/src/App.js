import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import DeleteTeamCommentConfirmationForm from './components/DeleteTeamCommentConfirmationForm';
import DeletePostCommentConfirmationForm from './components/DeletePostCommentConfirmationForm';
import { getAllPosts } from './store/post';
import { getAllFollowedTeams } from './store/team';
import NewTeamForm from './components/NewTeamForm';
import NewPostForm from './components/NewPostForm';
import EditTeamCommentConfirmationForm from './components/EditTeamCommentForm';
import EditPostCommentForm from './components/EditPostCommentForm';
import DeletePostConfirmationForm from './components/DeletePostConfirmationForm';
import DeleteTeamConfirmationForm from './components/DeleteTeamConfirmationForm';
import EditTeamForm from './components/EditTeamForm';
import EditPostForm from './components/EditPostForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllPosts())
      await dispatch(getAllFollowedTeams())
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
          <Posts />
        </ProtectedRoute>
        <ProtectedRoute path='/teams' exact={true} >
          <h1>Teams</h1>
          <Teams />
        </ProtectedRoute>
        <ProtectedRoute path='/players/:playerId' exact={true} >
          <PlayerDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/teams/new' exact={true} >
          <NewTeamForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/new' exact={true} >
          <NewPostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/edit' exact={true} >
          <EditPostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/delete' exact={true} >
          <DeletePostConfirmationForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/comments/:commentId/delete' exact={true} >
          <DeletePostCommentConfirmationForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/comments/:commentId/edit' exact={true} >
          <EditPostCommentForm />
        </ProtectedRoute>
        <ProtectedRoute path='/teams/:teamId' exact={true} >
          <TeamDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/teams/:teamId/delete' exact={true} >
          <DeleteTeamConfirmationForm />
        </ProtectedRoute>
        <ProtectedRoute path='/teams/:teamId/edit' exact={true} >
          <EditTeamForm />
        </ProtectedRoute>
        <ProtectedRoute path='/teams/:teamId/comments/:commentId/delete' exact={true} >
          <DeleteTeamCommentConfirmationForm />
        </ProtectedRoute>
        <ProtectedRoute path='/teams/:teamId/comments/:commentId/edit' exact={true} >
          <EditTeamCommentConfirmationForm />
        </ProtectedRoute>
        <ProtectedRoute path='/players/:playerId/posts/:postId' exact={true} >
          <PostDetail />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
