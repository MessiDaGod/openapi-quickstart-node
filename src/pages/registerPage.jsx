import Register from "./api/register";
import styles from "./registerPage.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
  };

  const handleRegister = (Username, Password) => {
    const url = `/api/register?username=${Username}&password=${Password}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.info(error);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ name: name, email: email, username: username, password: password }),
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
      alert(error.message);
    }
  };

  return (
    <div className={styles['register-container']}>
      <h2 className={styles['h2']}>Register</h2>
      <form onSubmit={onSubmit} className={styles['register-form']}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          key="name"
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          key="email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          key="username"
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          key="password"
          onChange={(event) => setPassword(event.target.value)}
        />

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
