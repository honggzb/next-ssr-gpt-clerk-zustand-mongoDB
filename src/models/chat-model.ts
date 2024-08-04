import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      default: [],
    },
  },
  {timestamps: true}
);

if(mongoose?.models?.chats) {
  delete mongoose.models.chats;
}

const UserModel = mongoose.model('chats', ChatSchema);
export default ChatSchema;