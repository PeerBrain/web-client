import React from 'react';
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => handleauth(data);
  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title has-text-centered">Login</h1>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              type="text"
              placeholder="Enter username"
              className="input"
              required
              {...register("username")}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              className="input"
              required
              {...register("password")}
            />
          </div>
        </div>
        <br />
        <button className="button is-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

async function handleauth(data) {
  //auth endpoint https://peerbrain.teckhawk.be/token post username and password using application/x-www-form-urlencoded
  await fetch('https://peerbrain.teckhawk.be/token' , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'username': data.username,
        'password': data.password,
        }),
    })
    .then(response => response.json())
    .then(async data => {
      localStorage.setItem('token', data.access_token);
      await fetch('https://peerbrain.teckhawk.be/api/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
          'accept': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('username', data.username);
      })
      window.location.href = 'https://web.peerbrain.net/profile';
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Invalid username or password');
    }
  );


}

export default LoginPage;
