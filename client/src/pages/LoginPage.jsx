import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"

export default function LoginPage() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)

  async function login(ev) {
    ev.preventDefault()

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    })

    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        setRedirect(true)
      })
    } else {
      alert('wrong credentials')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form className="auth" onSubmit={login}>
      <h1 className="auth__heading">Login</h1>
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
      <button className="auth__button" type="submit">Login</button>
    </form>
  );
}
