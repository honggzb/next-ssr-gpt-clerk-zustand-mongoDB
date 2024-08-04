import usersGlobalStore from '@/store/users-store';
import { Spin } from 'antd';
import { Bot } from 'lucide-react';
import React, { useEffect } from 'react';
import Markdown from 'react-markdown';

function Messages({messages, isLoading}: { messages: any[], isLoading: boolean }) {
  const { loggedInUserData  } = usersGlobalStore() as any;
  const messagesRef = React.useRef<any>(null);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);
  if(!isLoading && messages.length === 0) {
    return (
      <div className='h-[72vh] flex items-center'>
        <div className='flex flex-col text-gray-300 text-sm justify-center'>
          <span>Hei, {loggedInUserData?.name} </span>
          <span>I am your personal assistant. How can I help you?</span>
        </div>
      </div>
    )
  }
  return (
    <div
      className="flex flex-col gap-5 text-gray-300 mt-7 text-sm h-[75vh] overflow-auto"
      ref={messagesRef}
    >
      { messages.map((message) => {
          if(message.role === 'user') {
            return (
              <div className="flex justify-end mr-5">
                <span className="bg-gray-500 p-2 rounded">{ message.content }</span>
              </div>
            );
          }
          return (
            <div className='flex'>
              <div className='border border-gray-300 border-solid rounded-full h-6 w-6 flex items-center justify-center'>
                <Bot size={16} />
              </div>
              <span className="flex-1 p-2">
                <Markdown>{ message.content }</Markdown>
              </span>
            </div>
          )
      })}
      <div className="flex justify-start">
        {isLoading && ( <Spin size='small' />)}
      </div>
    </div>
  );
}

export default Messages;