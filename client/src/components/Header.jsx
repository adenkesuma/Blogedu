import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "../UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="navbar">
      <nav className="navbar__container">
        <Link to="/" className="navbar__logo">Blogedu</Link>
        {username && (
          <div className="navbar__box-navigate">
            <p className="navbar__profile">{username}</p>
            <Link className="navbar__link add-post" to="/create">+ Add new post</Link>
            <button className="navbar__button" onClick={logout}>
              Logout
            </button>
          </div>
        )}

        {!username && (
          <div className="navbar__box-navigate">
            <Link className="navbar__link" to="/register">Register</Link>
            <Link className="navbar__auth" to="/login">Login</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
