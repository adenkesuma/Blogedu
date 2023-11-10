import {useState} from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }
  return (
    <form className="auth" onSubmit={register}>
      <h1 className="auth__heading">Register</h1>
      <div className="auth__box">
        <label htmlFor="username" className="auth__label">Username</label>
        <input 
          className="auth__username" 
          id="username"
          type="text"
          placeholder="eg: smith"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
      </div>
      <div className="auth__box">
        <label className="auth__label" htmlFor="password">Password</label>
        <input 
          className="auth__password" 
          id="password" 
          type="password"
          placeholder="eg: s92mit321"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
      </div>
      <button className="auth__button" type="submit">Register</button>
    </form>
  );
}
