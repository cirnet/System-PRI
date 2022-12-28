import React, { useState } from 'react';
import swal from 'sweetalert';

async function loginUser(credentials) {
  return fetch('http://localhost:8000/dj-rest-auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Signin() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password
    });
    if ('key' in response) {
      swal({
        text: "Zalogowano",
        icon: "success",
        buttons: false,
        timer: 1000,
      })

      .then((value) => {
        localStorage.setItem('accessToken', response['key']);
        // localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/profile";
      });
    } 
    else {
      swal({
        icon: "error",
        text: "Błędny email lub hasło!",
        buttons: false,
        timer: 2000,
      })
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
              
              <label>email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Wpsiz swój email"
                onChange={e => setEmail(e.target.value)}
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
            <div className="text-center mt-2">
             <a href="#">Zapomniałeś hasła?</a>
             <p>Konto testowe</p>
        
              admin@admin.pl / 12345 <br/>
              test@test.pl / 123456
            </div>
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