import Register from "./api/register";
import styles from "./registerPage.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ username: username, password: password }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        alert(data.error?.message);
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  return (
    <div className="text-center">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <input
          id="submit"
          type="submit"
          value="Submit"
          onClick={() => handleRegister(username, password)}
        />
      </form>
    </div>
  );
};

export default RegisterPage;
