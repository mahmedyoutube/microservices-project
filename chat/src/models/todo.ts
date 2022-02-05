import mongoose from "mongoose";

interface TodoAttr {
  heading: string;
  description: string;
  userId: string;
}

// an interface that describe
//the properties of the usermodel

interface TodoModel extends mongoose.Model<TodoDoc> {
  build(attrs: TodoAttr): TodoDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface TodoDoc extends mongoose.Document, TodoAttr {}

const todoSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

todoSchema.statics.build = (attrs: TodoAttr) => {
  return new Todo(attrs);
};

const Todo = mongoose.model<TodoDoc, TodoModel>("todo", todoSchema);

export { Todo };
