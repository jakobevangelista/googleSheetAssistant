"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";

const pb = new PocketBase("http://45.33.6.9");

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/login");
    }
    setUsername(pb.authStore.model.username);
  });

  function logout() {
    pb.authStore.clear();
    router.push("/login");
  }

  return (
    <>
      <div className="flex">
        <div className="flex flex-col w-1/6 bg-[#343541] h-screen">
          <div className="text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer">
            bots.ai
          </div>
          <div className="text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer">
            Signed in as {username}
          </div>
          <div className="text-center py-3 px-3 rounded-md mt-64 text-white hover:bg-grey-500  cursor-pointer">
            Settings
          </div>
          <button onClick={logout}>Sign out</button>
          <div className=""></div>
        </div>
        <div className="flex flex-col w-5/6 bg-[#202123] h-screen">
          <iframe
            className="flex pl-64 px bg-[#202123] w-1/2 h-screen"
            src="https://docs.google.com/spreadsheets/d/12Qocr5PiUQUKxaxaf4fbur1DFNslKjUuH2hoCaOaGGE/edit?usp=sharing"
          ></iframe>
        </div>
      </div>
    </>
  );
}
