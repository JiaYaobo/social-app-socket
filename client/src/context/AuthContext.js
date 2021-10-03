import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";
const jwt = require("jsonwebtoken");

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  isLoggedIn: false,
  error: false,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwt.decode(localStorage.getItem("jwtToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    INITIAL_STATE.user = decodedToken.user;
    INITIAL_STATE.isLoggedIn = true;
  }
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    if (state.isLoggedIn) {
      let token = jwt.sign(
        {
          user: state.user,
        },
        "secretkey",
        { expiresIn: "1h" }
      );
      localStorage.setItem("jwtToken", token);
    } else {
      localStorage.removeItem("jwtToken");
    }
  }, [state.isLoggedIn]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        isLoggedIn: state.isLoggedIn,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
