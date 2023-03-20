function ChatMessage({message}) {
    return (
      <>
          <div class={`flex flex-row p-[24px] text-left rounded-full ${message.role === 'assistant' || message.role === 'system' ? 'bg-[#444654]' : ''}`}>
              <div className={`flex-none w-[40px] h-[40px] rounded-[50%] ${message.role === 'assistant' || message.role === 'system' ? 'bg-black' : 'bg-white'}`}>
              </div>
              <div class='flex text-white pl-3 items-center w-5/6'>
                  {message.content}
              </div>
          </div>
      </>
    )
  }
  export default ChatMessage