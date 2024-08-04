import React from 'react';
import { Plus } from 'lucide-react';

function SideBar({
  setShowSidebar = () => {},
} : {
  setShowSidebar?: (show: boolean) => void;
}) {
  return (
    <div className="w-80 bg-sidebar p-3">
      <div className="flex gap-2 border border-x-gray-200 border-solid text-gray-200 p-1 rounded-sm w-max text-sm items-center">
        <Plus size={15} />New Chat
      </div>
    </div>
  )
}

export default SideBar