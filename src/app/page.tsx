'use client'

import ChatArea from "./_components/chat-area"
import SideBar from "./_components/sidebar"

export default function Home() {

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex">
        <SideBar />
      </div>
      <div className="flex-1 h-full">
        <ChatArea />
      </div>
    </div>
  )
}
