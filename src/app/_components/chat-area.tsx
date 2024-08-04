import React, { useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Menu, Send } from 'lucide-react';
import SideBar from './sidebar';
import { Drawer, message } from 'antd';
import { useChat } from 'ai/react';
import Messages from './messages';
import { createNewChat, updateChat } from "@/actions/chats";
import chatsGlobalStore from "@/store/chats-store";
import usersGlobalStore from "@/store/users-store";

function ChatArea() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "api/chat"
  });
  const { selectedChat, setSelectedChat } = chatsGlobalStore() as any;
  const { loggedInUserData } = usersGlobalStore() as any;

  const addOrUpdateChat = async () => {
    try {
      if(!selectedChat) {
        const response = await createNewChat({
          user: loggedInUserData._id,
          messages: messages,
          title: messages[0].content,
        });
        if(response.success) {
          setSelectedChat(response.data);
        }
      } else {
        await updateChat({ chatId: selectedChat._id, messages });
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if(messages.length > 0) addOrUpdateChat();
  }, [messages]);

  return (
    <div className='bg-chatarea h-full p-2 flex flex-col'>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Menu className="text-white flex lg:hidden"
                onClick={() => setShowSidebar(true)} />
          <h1 className="text-xl font-bold text-yellow-500">My-GPT</h1>
        </div>
        <UserButton />
      </div>
      {/* -- Chat GPT start -- */}
      <div className="flex flex-col justify-between flex-1 m-3 p-3">
        <div className="text-white">
          <Messages messages={messages} isLoading={isLoading} />
        </div>
        <form onSubmit={handleSubmit}>
          <input className='bg-sidebar p-5 w-full text-gray-500 focus:outline-none focus:border-gray-300' name="prompt" value={input} onChange={handleInputChange} />
          <button type="submit">
            <Send className='absolute right-10 bottom-10 text-gray-500 cursor-pointer' />
          </button>
        </form>
      </div>
      {/* -- Chat GPT end -- */}
      {showSidebar && (
        <Drawer
          onClick={() => setShowSidebar(false)}
          open={showSidebar}
          placement="left">
          <SideBar setShowSidebar={setShowSidebar} />
        </Drawer>)}
    </div>
  )
}

export default ChatArea;