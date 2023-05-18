import React from 'react';
import { useForm } from "react-hook-form";

function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => RegisterUser(data);
  return (
    <div className="column">
    <form className="box"  onSubmit={handleSubmit(onSubmit)}>
      <h1 className="title has-text-centered">Register</h1>
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
        <label className="label">Email</label>
        <div className="control">
          <input
            type="email"
            placeholder="Enter your email"
            className="input"
            required
            {...register("email")}
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
      <div className="field">
        <label className="label">Confirm Password</label>
        <div className="control">
          <input
            type="password"
            placeholder="Enter password again"
            className="input"
            required
            {...register("ConfirmPassword")}
          />
        </div>
      </div>
      <br />
      <button className="button is-primary" type="submit">
        Register
      </button>
    </form>
  </div>
  );
}

function RegisterUser(data) {
  console.log(data);
  if (data.password !== data.ConfirmPassword) {
    alert('Passwords do not match');
    return;
  }
  fetch('https://peerbrain.teckhawk.be/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': data.username,
        'email': data.email,
        'password': data.password,
        }),
    })
    // if status is 200 then redirect to login page
    .then(response => {
      if (response.ok) {
        //window.location.href = 'https://web.peerbrain.net/login';
        alert('User created successfully. Check your email for a confirmation link.');
      } else {
        alert('Error: ' + response.status);
      }
    }
    )

}

export default RegisterPage;