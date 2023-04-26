export const RegisterPage = () => (
    <div className="column">
    <form className="box">
      <h1 className="title has-text-centered">Register</h1>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            type="text"
            placeholder="Enter username"
            className="input"
            required
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
      <div className="field">
        <label className="label">Confirm Password</label>
        <div className="control">
          <input
            type="password"
            placeholder="Enter password again"
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