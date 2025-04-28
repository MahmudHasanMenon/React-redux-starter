import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

export type LoginProps = {
  testID?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Simulate a login action
    const token = "dummy_token_value_here";
    console.log("User logged in");
    dispatch(login(token));

    localStorage.setItem("token", "dummy_token_value_here");
    // Navigate to the home page after login

    navigate("/dashboard", { replace: true });
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Login page content goes here.</p>
      <button onClick={handleLogin}>Go to Home</button>
    </div>
  );
};

export default Login;
