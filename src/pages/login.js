import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";

import * as ROUTES from "../constants/routes";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (err) {
      setEmail("");
      setPassword("");
      setError(err.message);
    }
  };

  useEffect(() => {
    document.title = "Login - DKstagram";
  }, []);

  return (
    <div className="container flex items-center h-screen max-w-screen-md mx-auto">
      <div className="hidden md:flex md:justify-center md:items-center md:w-3/5">
        <img
          src="/images/iphone-with-profile.jpeg"
          alt="iPhone with instagram app"
        />
      </div>
      <div className="flex flex-col w-full p-3 md:p-0 md:w-2/5">
        <div className="flex flex-col items-center p-3 mb-4 bg-white border rounded shadow-md border-gray-primary">
          <h1 className="flex items-center justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="w-6/12 mt-2 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handelLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="w-full h-2 px-4 py-5 mb-2 text-sm border rounded md:mx-0 text-gray-base border-gray-primary"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="w-full h-2 px-4 py-5 mb-2 text-sm border rounded md:mx-0 text-gray-base border-gray-primary"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white rounded w-full h-8  font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2 text-gray-700 bg-white border rounded shadow-md border-gray-primary">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.REGISTER} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
