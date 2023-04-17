"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import ChatMessage from "../components/Chatmessage";

// import { useSession, signIn, signOut } from "next-auth/react";

const pb = new PocketBase("http://45.33.6.9:80");

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [userInput, setUserInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      role: "system",
      content: `You are a bot that is an expert at google sheets and helps users out with all things related to google sheets.`,
    },
  ]);

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/login");
    }
    setUsername(pb.authStore.model.username);
  }, [router]);

  function logout() {
    pb.authStore.clear();
    router.push("/login");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let chatLogNew = [...chatLog, { role: "user", content: `${userInput}` }];

    const response = await fetch("http://127.0.0.1:5000/fix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }), // takes only the user input for now, use more advanced prompt engineering to mimic chatgpt
    });
    const data = await response.json();
    console.log(data);
    setUserInput("");
    setChatLog([
      ...chatLogNew,
      { role: "assistant", content: `${data.content}` },
    ]);
  }

  function clearChat() {
    setChatLog([
      {
        role: "system",
        content: `You are a bot that is an expert at google sheets and helps users out with all things related to google sheets.`,
      },
    ]);
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
          <a
            className="text-center py-3 px-3 rounded-md hover:bg-gray-500 border border-white cursor-pointer"
            onClick={clearChat}
          >
            New Chat
          </a>
          <div className="text-center py-3 px-3 rounded-md mt-64 text-white hover:bg-grey-500  cursor-pointer">
            Settings
          </div>
          <button onClick={logout}>Sign out</button>
          <div className=""></div>
        </div>
        <div className="flex flex-row w-5/6 bg-[#202123] h-screen">
          <div className="flex-col overflow-y-auto w-1/2 h-screen">
            <div className="flex overflow-y-auto relative flex-col pb-14">
              {chatLog.map((content, index) => (
                <ChatMessage key={index} message={content} />
              ))}
            </div>
            <div className="p-3 bottom-0">
              <form onSubmit={handleSubmit}>
                <input
                  className="w-full bg-[#40414f] rounded-md text-white outline-none p-3 text-sm"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask me anything"
                ></input>
              </form>
            </div>
          </div>
          <iframe
            className="px-16 py-64 bg-[#202123] w-1/2 h-screen"
            src="https://docs.google.com/spreadsheets/d/11oC81VbhDhRqE8NY2ZNrlEXIrdsAummmLxihhPqctmw/edit#gid=0"
          ></iframe>
        </div>
      </div>
    </>
  );
}
