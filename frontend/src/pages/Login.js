export const LoginPage = () => (
  <div className="column">
  <form className="box">
    <h1 className="title has-text-centered">Login</h1>
    <div className="field">
      <label className="label">Email Address</label>
      <div className="control">
        <input
          type="email"
          placeholder="Enter email"
          className="input"
          required
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