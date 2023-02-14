import React, { useState } from "react";
import { useRouter } from "next/router";

export const Register = () => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
  };

  const handleRegister = (Username, Password) => {
    const url = `/api/register?username=${Username}&password=${Password}`;
    // const encodedUrl = encodeURIComponent(url);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        // console.info(error);
      });
  };
};