import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../components/HelperFunctions';
import './index.css';

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
    errors: {},
  });

  let history = useHistory();

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setLoginUser((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: loginUser.email,
      password: loginUser.password,
    };

    login(user).then((res) => {
      if (res) {
        // Same redirection for both roles
        // for demo purposes
        if (localStorage.userrole === 'Admin') {
          history.push('/transaction');
        } else {
          history.push('/transaction');
        }
      }
    });
  };

  return (
    <div className="container fadeIn">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form onSubmit={onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={loginUser.email}
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={loginUser.password}
                required
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-secondary btn-block"
            >
              Sign in
            </button>
          </form>
          <div>
            <h5 className="mt-4">Demo Accounts:</h5>
            <h6>Admin:</h6>
            <span>Email: admin-login@gmail.com</span>
            <br />
            <span>Password: 12345678</span>
            <br />
            <br />
            <h6>Cashier:</h6>
            <span>Email: cashier-login@gmail.com</span>
            <br />
            <span>Password: 87654321</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
