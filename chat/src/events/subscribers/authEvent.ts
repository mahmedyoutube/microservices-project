import { User } from "../../models/user";
import { eventTypes } from "../eventTypes";
import con from "../connection";

interface contentType {
  email: string;
  userId: string;
  type: eventTypes;
}

class AuthEvent {
  constructor(private content: contentType, private ack: () => void) {
    this.perfomeOperations(this.content.type);
  }

  async perfomeOperations(type: eventTypes) {
    switch (type) {
      case eventTypes.CREATED: {
        await this.insertRecord();
      }
      default:
        return;
    }
  }

  async insertRecord() {
    const user = User.build({
      email: this.content.email,
      userId: this.content.userId,
    });
    await user.save();
    this.ack();
  }
}

export default AuthEvent;
