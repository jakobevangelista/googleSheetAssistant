"use client";
import PocketBase from "pocketbase";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const pb = new PocketBase("http://45.33.6.9");
  const currentUser = pb.authStore.model;
  pb.authStore.onChange((auth) => {
    console.log("authStore Changed", auth);
  });
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    await pb.collection("users").authWithPassword(userName, password);
  }
  if (currentUser) {
    return (
      <>
        <div className="flex">
          <div className="flex flex-col w-1/6 bg-[#343541] h-screen">
            <div className="text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer">
              bots.ai
            </div>
            <div className="text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer">
              Signed in as {currentUser.username}
            </div>
            <div className="text-center py-3 px-3 rounded-md mt-64 text-white hover:bg-grey-500  cursor-pointer">
              Settings
            </div>
            <button onClick={pb.authStore.clear()}>Sign out</button>
            <div className=""></div>
          </div>
          <div className="flex flex-col w-5/6 bg-[#202123] h-screen"></div>
        </div>
      </>
    );
  } else {
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
          <button className="btn btn-block">Submit</button>
        </form>
      </>
    );
  }
}
