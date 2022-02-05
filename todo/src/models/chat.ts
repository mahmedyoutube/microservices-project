import mongoose from "mongoose";

interface ChatAttr {
  message: string;
  fromUserId: string;
  toUserId: string;
  todoId: string;
  chatId: string;
}

// an interface that describe
//the properties of the usermodel

interface ChatModel extends mongoose.Model<ChatDoc> {
  build(attrs: ChatAttr): ChatDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface ChatDoc extends mongoose.Document, ChatAttr {}

const chatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    todoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "todo",
    },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chatId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// build user is used to strictly check
// type checking and properties of object

chatSchema.statics.build = (attrs: ChatAttr) => {
  return new Chat(attrs);
};

const Chat = mongoose.model<ChatDoc, ChatModel>("chat", chatSchema);

export { Chat };
