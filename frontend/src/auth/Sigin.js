import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';

// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import Typography from '@mui/material/Typography';

import swal from 'sweetalert';


async function loginUser(credentials) {
  return fetch('localhost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Signin() {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    if ('accessToken' in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/profile";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  }

  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container" onSubmit={handleSubmit}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Zaloguj się</h3>
            <div className="text-center">
              Nie masz jeszcze konta?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Zarejestruj się
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Login</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Wpsiz swój login"
                onChange={e => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Hasło</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Wpisz swoje hasło"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Zaloguj się
              </button>
            </div>
            <p className="text-center mt-2">
             <a href="#">Zapomniałeś hasła?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container" >
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Zarejestruj się</h3>
          <div className="text-center">
            Masz konto?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Zaloguj się
            </span>
          </div>
          <div className="form-group">
            <label>Nazwa</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Twoja nazwa"
            />
          </div>
          <div className="form-group mt-3">
            <label>Adres e-mail</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Adres e-mail"
            />
          </div>
          <div className="form-group mt-3">
            <label>Hasło</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Hasło"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Utwórz nowe konto
            </button>
          </div>
          <p className="text-center mt-2">
             <a href="#">Nie pamiętasz hasła?</a>
          </p>
        </div>
      </form>
    </div>
  )
}