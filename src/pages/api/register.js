import React, { useState } from "react";
import { useRouter } from "next/router";

export const Register = () => {

  const handleRegister = async (Name, Email, Username, Password) => {
    // Regular XMLHttpRequest call
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/register");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
      } else {
        console.log("Request failed with status", xhr.status);
      }
    };
    xhr.onerror = function () {
      console.log("Request failed");
    };
    xhr.send(JSON.stringify({ username: "johndoe", password: "password123" }));


    // Equivalent fetch call
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: "johndoe", password: "password123" })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });

  };
};

