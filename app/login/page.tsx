"use client";

import { useState } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../firebase/config";
import React from "react";
import { UserCredential } from "firebase/auth";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [currentUser, setCurrentUser] = useState<UserCredential>();

  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const user = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      setCurrentUser(user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="sign-in-page">
      {currentUser ? (
        <h1>Logged in as {currentUser.user.email}</h1>
      ) : (
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="form-fields">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                required
                onChange={handleChange}
                value={password}
              />
            </div>
            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
