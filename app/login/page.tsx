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
    <div className="w-full flex flex-col items-center justify-center mt-12">
      {currentUser ? (
        <h1>Logged in as {currentUser.user.email}</h1>
      ) : (
        <div className="w-80 flex flex-col">
          <h1 className="text-3xl">Login</h1>
          <form
            onSubmit={handleSubmit}
            className="w-full h-[400px] flex flex-col gap-4 p-4 bg-gray-100"
          >
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="h-6 p-4"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="h-6 p-4"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                required
                onChange={handleChange}
                value={password}
              />
            </div>
            <button
              type="submit"
              className="w-20 h-8 bg-black text-white cursor-pointer text-sm"
            >
              Sign In
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
