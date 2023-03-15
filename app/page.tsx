// "use client";
import PocketBase from "pocketbase";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const pb = new PocketBase("http://45.33.6.9");
  let currentUser = pb.authStore.model;
  pb.authStore.onChange((auth) => {
    console.log("authStore Changed", auth);
  });
  async function login() {
    await pb.collection("users").authWithPassword(userName, password);
  }
  async function logout() {
    await pb.authStore.clear();
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
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
            <button onClick={logout}>Sign out</button>
            <div className=""></div>
          </div>
          <div className="flex flex-col w-5/6 bg-[#202123] h-screen"></div>
        </div>
      </>
    );
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
  );
}
