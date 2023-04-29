import React from 'react';
import { useForm } from "react-hook-form";

const LoginPage = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
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
    .then(data => {
      console.log('Success:', data);
      localStorage.setItem('token', data.access_token);
      window.location.href = 'https://andrewstech-supreme-goggles-vqg554q5gggfq4v-3000.preview.app.github.dev/profile';
    }
    // if response is bad, display error message
    ).catch((error) => {
      console.error('Error:', error);
      alert("Invalid username or password");
    }
  );


}

export default LoginPage;
