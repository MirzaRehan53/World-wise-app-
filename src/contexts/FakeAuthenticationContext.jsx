import { createContext, useContext, useReducer } from "react";
/* eslint-disable react/prop-types */

const FAKE_USER = {
  name: "Rehan",
  email: "Rehan@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("invalid action");
  }
};

const FakeAuthenticationContext = createContext();

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <FakeAuthenticationContext.Provider
      value={{ login, logout, user, isAuthenticated }}
    >
      {children}
    </FakeAuthenticationContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(FakeAuthenticationContext);
  if (context === undefined) {
    throw new Error("context was used outside the provider");
  }
  return context;
};

export { AuthProvider, useAuth };
