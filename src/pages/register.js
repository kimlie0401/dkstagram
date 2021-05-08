import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { doesUsernameExist } from "../services/firebase";
import * as ROUTES from "../constants/routes";

const Register = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

  const [error, setError] = useState("");
  const isInvalid =
    password === "" ||
    email === "" ||
    username === "" ||
    fullname === "" ||
    confirmPassword === "";

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password and confirm password should be match.");
      return;
    }

    const usernameExists = await doesUsernameExist(username);

    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullname,
          email: email.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Username is already taken, please try another.");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - DKstagram";
  }, []);

  return (
    <div className="container flex items-center h-screen max-w-screen-md mx-auto">
      <div className="hidden md:flex md:justify-center md:items-center md:w-3/5">
        <img
          src="/images/iphone-with-profile.jpeg"
          alt="iPhone with instagram app"
          className=""
        />
      </div>
      <div className="flex flex-col w-full p-3 md:p-0 md:w-2/5">
        <div className="flex flex-col items-center p-3 mb-4 bg-white border rounded shadow-md border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="w-6/12 mt-2 mb-4"
            />
          </h1>
          {error && (
            <p className="mb-4 text-xs text-center text-red-primary">{error}</p>
          )}
          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="w-full h-2 px-4 py-5 mb-2 text-sm border rounded md:mx-0 text-gray-base border-gray-primary"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="w-full h-2 px-4 py-5 mb-2 text-sm border rounded md:mx-0 text-gray-base border-gray-primary"
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
            />
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
            <input
              aria-label="Enter your confirm password"
              type="password"
              placeholder="Confirm Password"
              className="w-full h-2 px-4 py-5 mb-2 text-sm border rounded md:mx-0 text-gray-base border-gray-primary"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white rounded w-full h-8  font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2 text-gray-700 bg-white border rounded shadow-md border-gray-primary">
          <p className="text-sm">
            If you have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
