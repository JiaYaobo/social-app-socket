import "./login.css";
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  if (error) {
    console.log(error);
  }
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social app</h3>
          <span className="loginDesc">make friends share ideas</span>
        </div>
        <form className="loginRight" onSubmit={handleClick}>
          <div className="loginBox">
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              ref={email}
              required
            ></input>
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              ref={password}
              required
              minLength="6"
              disabled={isFetching}
            ></input>
            <button className="loginButton">
              {isFetching ? <CircularProgress /> : "Log in"}
            </button>
            <span className="loginForgot">Forgot password?</span>
            <Link
              to="/register"
              style={{ textDecoration: "none" }}
              className="loginRegisterLink"
            >
              <button className="loginRegisterButton">
                {isFetching ? <CircularProgress /> : "Register"}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
