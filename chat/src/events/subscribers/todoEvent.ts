import { Todo } from "../../models/todo";
import { NotFoundError } from "../../errors";
import { eventTypes } from "../eventTypes";

interface ContentType {
  type: eventTypes;
  heading: string;
  description: string;
  userId: string;
  todoId: string;
}

class TodoEvent {
  constructor(private content: ContentType, private ack: () => void) {
    this.perfomeOperations(this.content.type);
  }

  async perfomeOperations(type: eventTypes) {
    switch (type) {
      case eventTypes.CREATED: {
        return this.createTodo();
      }
      case eventTypes.UPDATED: {
        return this.updateTodo();
      }
      case eventTypes.DELETED: {
        return this.deleteTodo();
      }
      default:
        return;
    }
  }

  async createTodo() {
    const { heading, description, userId, todoId } = this.content;

    // or you can pass token in a request and extract userId from it, ( best for security reason also )
    const todo = Todo.build({ heading, description, userId, todoId });

    await todo.save();

    this.ack();
  }

  async updateTodo() {
    const { heading, description, todoId } = this.content;

    const todo = await Todo.findOne({ todoId });
    if (!todo) {
      throw new NotFoundError();
    }
    todo!.heading = heading;
    todo!.description = description;

    await todo!.save();
    this.ack();
  }

  async deleteTodo() {
    const { todoId } = this.content;
    await Todo.findOneAndDelete({ todoId });
    this.ack();
  }
}

export default TodoEvent;
