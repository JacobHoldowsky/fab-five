import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import './User.css'

function User() {
  const [user, setUser] = useState({});
  const [teams, setTeams] = useState([])
  const [posts, setPosts] = useState([])
  const { userId } = useParams()


  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();

    (async () => {
      const response = await fetch(`/api/users/${userId}/teams`);
      const teams = await response.json()
      setTeams(teams.teams);
    })();

    (async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const posts = await response.json()
      setPosts(posts.posts);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='user-page'>
      <ul className='user-info'>
        <li>
          <h1>{user.username}</h1>
        </li>
        
        <div className='posts-and-teams'>
          <li>
            {teams.length === 1 && <h3>{teams.length} team</h3>}
            {teams.length !== 1 && <h3>{teams.length} teams</h3>}
          </li>
          <h3>|</h3>
          <li>
            {posts.length === 1 && <h3>{posts.length} post</h3>}
            {posts.length !== 1 && <h3>{posts.length} posts</h3>}
          </li>
        </div>
      </ul>
      {teams.length > 0 && <h1>Teams</h1>}

      <div className='user-content'>
        {teams && teams.map(team => {
          let teamOverallRating = 0
          team?.players.forEach((player) => teamOverallRating += player.overall_rating)
          return (
            <div key={team.id} className='team-header-user'>

              <div className='team-info-and-overall-user'>
                <NavLink to={`/teams/${team.id}`}>
                  <img className='team-logo-user' src={team?.logo_src} alt="" />
                </NavLink>
                <NavLink className='team-info-user' to={`/teams/${team.id}`}>
                  {team.city} {team.name}
                </NavLink>
                <div className='overall-team-rating'>
                  <div>
                    Overall {Math.round(teamOverallRating / 5)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <h1>Posts</h1>
      <div className='posts'>
        {posts && posts.map((post) => (
          <div key={post.id} className='post-container'>
            <NavLink to={`/players/${post.player_id}/posts/${post.id}`}>
              <img className='post-img' src={post.img_src} alt="" />
            </NavLink>
            <NavLink to={`/players/${post.player_id}`}>
              {post.player_first_name} {post.player_last_name}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
export default User;
