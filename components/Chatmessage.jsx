function ChatMessage({ message, darkmode }) {
  return (
    <>
      <div
        class={`flex flex-row p-[24px] text-left rounded-full ${
          message.role === "assistant" || message.role === "system"
            ? `${darkmode ? "bg-[#444654]" : "bg-neutral-400"}`
            : `${darkmode ? "bg-[#343541]" : "bg-[#ffffff]"}`
        }`}
      >
        <div
          className={`flex-none w-[40px] h-[40px] rounded-[50%] align-middle ${
            message.role === "assistant" || message.role === "system"
              ? "bg-green-500"
              : "bg-sky-500"
          }`}
        ></div>
        <div
          class={`flex  ${
            darkmode ? "text-white" : "text-black"
          } pl-3 items-center w-5/6`}
        >
          {message.content}
        </div>
      </div>
    </>
  );
}
export default ChatMessage;
