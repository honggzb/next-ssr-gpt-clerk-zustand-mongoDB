import { create } from 'zustand';

const chatsGlobalStore  = create((set) => ({
  selectedChat: null,
  setLoggedInUserData: (data:any) => set({selectedChat: data}),
}))

export default chatsGlobalStore;