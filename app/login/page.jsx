"use client";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { useState } from "react";
import React from 'react'

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const pb = new PocketBase("http://45.33.6.9");
  let currentUser = pb.authStore.model;
  pb.authStore.onChange((auth) => {
    console.log("authStore Changed", auth);
  });
  async function login() {
    await pb.collection("users").authWithPassword(userName, password);
    router.push('/')

  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          placeholder="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={login}>Submit</button>
      </form>
    </>
  )
}

export default Login