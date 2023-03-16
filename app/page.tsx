"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  const pb = new PocketBase("http://45.33.6.9");
  let currentUser = pb.authStore.model;
  pb.authStore.onChange((auth) => {
    console.log("authStore Changed", auth);
  });

  async function logout() {
    await pb.authStore.clear();
    router.push("/login");
  }

  if (!currentUser) {
    router.push("/login");
  } else {
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
}
