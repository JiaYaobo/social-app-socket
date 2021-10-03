import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const username = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password not match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social app</h3>
          <span className="loginDesc">make friends share ideas</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              className="loginInput"
              ref={username}
              required
            ></input>
            <input
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
              type="email"
            ></input>
            <input
              placeholder="Password"
              className="loginInput"
              ref={password}
              type="password"
              required
              minLength="6"
            ></input>
            <input
              placeholder="Password again"
              className="loginInput"
              ref={passwordAgain}
              type="password"
              required
              minLength="6"
            ></input>
            <button className="loginButton" type="submit">
              Sign up
            </button>
            <span className="loginForgot">Forgot password?</span>
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              className="loginRegisterButtonLink"
            >
              <button className="loginRegisterButton">Log into account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
