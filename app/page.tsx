"use client";
import PocketBase from "pocketbase";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="flex">
          <div className="flex flex-col w-1/6 bg-[#343541] h-screen">
            <div className="text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer">
              bots.ai
            </div>
            <div className="text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer">
              Signed in as {session.user.email}
            </div>
            <div className="text-center py-3 px-3 rounded-md mt-64 text-white hover:bg-grey-500  cursor-pointer">
              Settings
            </div>
            <button onClick={() => signOut()}>Sign out</button>
            <div className=""></div>
          </div>
          <div className="flex flex-col w-5/6 bg-[#202123] h-screen"></div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex">
        <div className="flex flex-col w-screen bg-[#202123] h-screen">
          <div className="text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer">
            bots.ai
          </div>
          <div className="text-center py-3 px-3 rounded-md mt-64 text-white hover:bg-grey-500  cursor-pointer">
            <button onClick={() => signIn()}>Sign in</button>
          </div>
        </div>
      </div>
    </>
  );
}
