"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import ChatMessage from "../components/Chatmessage";
import { AlertDialogFooter, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";

// import { useSession, signIn, signOut } from "next-auth/react";

const pb = new PocketBase("http://45.33.6.9:80");

export default function Home() {
  const router = useRouter();
  // const [username, setUsername] = useState("");
  const [userInput, setUserInput] = useState("");
  const [sheetLink, setSheetLink] = useState("");
  const [fontSize, setFontSize] = useState("flex text-base");
  const [realLink, setRealLink] = useState(
    "https://docs.google.com/spreadsheets/d/11oC81VbhDhRqE8NY2ZNrlEXIrdsAummmLxihhPqctmw/edit#gid=0"
  );
  const [chatLog, setChatLog] = useState([
    {
      role: "system",
      content: `Hello, how can I help you today?`,
    },
  ]);
  const [darkMode, setDarkMode] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    fetch("https://botaiwebsitebackend.herokuapp.com/setKey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: "11oC81VbhDhRqE8NY2ZNrlEXIrdsAummmLxihhPqctmw",
      }),
    });
  });

  async function handleSubmit(event) {
    event.preventDefault();
    let chatLogNew = [...chatLog, { role: "user", content: `${userInput}` }];

    const response = await fetch(
      "https://botaiwebsitebackend.herokuapp.com/fix",
      // "http://127.0.0.1:5000/fix",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }), // takes only the user input for now, use more advanced prompt engineering to mimic chatgpt
      }
    );
    const data = await response.json();
    console.log(data);
    setUserInput("");
    setChatLog([
      ...chatLogNew,
      { role: "assistant", content: `${data.content}` },
    ]);
  }

  async function handleSheetLink(event) {
    event.preventDefault();
    setRealLink(sheetLink);
    const reg = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
    const str = sheetLink;
    const match = str.match(reg);
    let sheetId = match && match[1];
    console.log(sheetId);
    const response = await fetch(
      "https://botaiwebsitebackend.herokuapp.com/setKey",
      // "http://127.0.0.1:5000/setKey",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: sheetId }), // takes only the user input for now, use more advanced prompt engineering to mimic chatgpt
      }
    );
    setSheetLink("");
  }

  function clearChat() {
    setChatLog([
      {
        role: "system",
        content: `Hello, how can I help you today?`,
      },
    ]);
  }
  function increaseTextSize() {
    // setFontSize("flex text-xl");
    switch (fontSize) {
      case "flex text-sm":
        setFontSize("flex text-base");
        break;
      case "flex text-base":
        setFontSize("flex text-lg");
        break;
      default:
        break;
    }
  }
  function decreaseTextSize() {
    // setFontSize("flex text-base");
    switch (fontSize) {
      case "flex text-lg":
        setFontSize("flex text-base");
        break;
      case "flex text-base":
        setFontSize("flex text-sm");
        break;
      default:
        break;
    }
  }
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* <div className={`${darkMode ? "dark" : ""}`}> */}
      <div className={`${darkMode ? "dark" : ""} ${fontSize}`}>
        <div className="flex flex-col relative w-1/6 bg-[#343541] h-screen">
          <div className="text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer">
            bots.ai
          </div>
          <a
            className="text-center py-3 px-3 rounded-md hover:bg-gray-500 border border-white text-white cursor-pointer"
            onClick={clearChat}
          >
            Clear Chat
          </a>
          <div className="text-center py-3 px-3 rounded-md mt-64 text-white">
            Settings
          </div>
          <form onSubmit={handleSheetLink} className="p-3">
            <input
              className="w-full bg-[#40414f] rounded-md text-white outline-none p-3"
              value={sheetLink}
              onChange={(e) => setSheetLink(e.target.value)}
              placeholder="Input sheet link here"
            ></input>
          </form>
          <a
            className="text-center py-3 px-3 rounded-md hover:bg-gray-500 border border-white text-white cursor-pointer"
            onClick={increaseTextSize}
          >
            Increase Text Size
          </a>
          <a
            className="text-center py-3 px-3 rounded-md hover:bg-gray-500 border border-white text-white cursor-pointer"
            onClick={decreaseTextSize}
          >
            Decrease Text Size
          </a>
          <button
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mx-2"
            onClick={toggleDarkMode}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <Button onClick={onOpen} className="absolute w-full bottom-0">
            ? Help
          </Button>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Help</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody textAlign="center">
                To use the chat bot, insert a the task you wish to do into the
                "ask me anything" text box. The action will either be executed,
                or it will give you easy to follow steps to in order to carry
                out the task you would like to do.
              </AlertDialogBody>
              <AlertDialogFooter textAlign="center">
                Try it out!
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex flex-row w-5/6 h-screen dark:bg-[#202123]">
          {/* <div
          className={`flex flex-row w-5/6 h-screen ${
            darkMode ? "bg-[#202123]" : "bg-white"
          }`}
        > */}
          <div className="flex-col overflow-y-auto w-1/2 h-screen">
            <div className="flex overflow-y-auto relative flex-col pb-14">
              {chatLog.map((content, index) => (
                <ChatMessage
                  key={index}
                  message={content}
                  darkmode={darkMode}
                />
              ))}
            </div>
            <div className="p-3 bottom-0">
              <form onSubmit={handleSubmit} className="flex flex-row ">
                <input
                  className="w-11/12 bg-[#40414f] rounded-md text-white outline-none p-3"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask me anything"
                ></input>
                <button
                  type="submit"
                  className="w-1/12 text-white border border-white rounded-md hover:bg-gray-500"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <iframe
            className="px-8 py-16 bg-[#202123] w-1/2 h-screen"
            src={realLink}
          ></iframe>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
