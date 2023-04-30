"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
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
  Spinner,
  useToast,
} from "@chakra-ui/react";

const pb = new PocketBase("http://45.33.6.9:80");

export default function Home() {
  const toast = useToast();
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
  const [loading, setLoading] = useState(false);
  const cancelRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let chatLogNew = [...chatLog, { role: "user", content: `${userInput}` }];

    // setRealLink(sheetLink);
    const reg = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
    const str = realLink;
    const match = str.match(reg);
    let sheetId = match && match[1];

    const response = await fetch(
      "https://botaiwebsitebackend.herokuapp.com/fix",
      // "http://127.0.0.1:5000/fix",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput, id: sheetId }), // takes only the user input for now, use more advanced prompt engineering to mimic chatgpt
      }
    );
    const data = await response.json();
    setLoading(false);
    console.log(data);
    let rawString = String(data.content);
    let parseResponse = rawString
      .substring(2)
      .replace(/(\d\.\s)/g, "$1")
      .replace(/\n/g, "<br>");
    console.log(parseResponse);

    setUserInput("");
    setChatLog([
      ...chatLogNew,
      { role: "assistant", content: `${parseResponse}` },
    ]);
  }

  async function handleSheetLink(event) {
    event.preventDefault();
    setRealLink(sheetLink);
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
  function copyEmail() {
    navigator.clipboard.writeText(
      "service-account@sheets-translator-382119.iam.gserviceaccount.com"
    );
    toast({
      title: "Copied!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <>
      <div className={`${fontSize}`}>
        <div className="flex flex-col relative w-1/6 bg-[#343541] h-screen">
          <div className="text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer">
            bots.ai
          </div>
          <a
            className="text-center py-3 px-3 mx-3 rounded-md hover:bg-gray-500 border border-white text-white cursor-pointer"
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
            className="text-center p-3 mx-3 mb-3 rounded-md hover:bg-gray-500 border border-white text-white cursor-pointer"
            onClick={increaseTextSize}
          >
            Increase Text Size
          </a>
          <a
            className="text-center p-3 mx-3 rounded-md hover:bg-gray-500 border border-white text-white cursor-pointer"
            onClick={decreaseTextSize}
          >
            Decrease Text Size
          </a>
          <button
            className="text-gray-600 mt-3 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mx-2"
            onClick={toggleDarkMode}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <Button onClick={onOpen} className="absolute mb-3 w-full bottom-0">
            Help / FAQ
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
              <AlertDialogHeader>Help / FAQ</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                To use the chat bot, insert a the task you wish to do into the
                'ask me anything' text box. The action will either be executed,
                or it will give you easy to follow steps to in order to carry
                out the task you would like to do.
              </AlertDialogBody>
              <AlertDialogHeader>FAQ</AlertDialogHeader>
              <AlertDialogHeader className="text-base">
                My sheet does not show up / is not able to be edited?
              </AlertDialogHeader>
              <AlertDialogBody>
                In order for your sheet to be viewed within the software, you
                need to:
                <div>
                  1. share the click the share icon in the top right corner of
                  your sheet
                  <div>
                    2. In the "General Access" tab, make sure "Anyone with the
                    link" is selected, this will allow your sheet to be viewed
                    within the website
                  </div>
                </div>
                <div>
                  3. Give access to your sheet with the following account, click
                  to copy:
                </div>
                <span
                  className="text-align-center hover:underline cursor-pointer"
                  onClick={copyEmail}
                >
                  service-account@sheets-translator-382119.iam.gserviceaccount.com
                </span>
              </AlertDialogBody>
              <AlertDialogFooter textAlign="center">
                <Button onClick={onClose}>Try it out!</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex flex-row w-5/6 h-screen bg-[#202123]">
          <div className="flex-col overflow-y-auto w-1/2 h-screen">
            <div className="flex overflow-y-auto pl-3 pr-3 relative flex-col pb-1">
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
                  className="w-5/6 bg-[#40414f] rounded-md text-white outline-none p-3"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask me anything"
                ></input>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="w-1/6 px-4 align-center text-sm font-medium text-white bg-[#343541] rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  isLoading={loading} // set isLoading to the loading state variable
                >
                  {loading ? (
                    <Spinner size="sm" color="white" mr={2} /> // show spinner while loading
                  ) : (
                    "Submit" // show "Submit" text when not loading
                  )}
                </Button>
              </form>
            </div>
          </div>
          <iframe
            className="px-8 py-16 bg-[#202123] w-1/2 h-screen"
            src={realLink}
          ></iframe>
        </div>
      </div>
    </>
  );
}
