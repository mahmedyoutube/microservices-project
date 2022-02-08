import { ConsumeMessage } from "amqplib";
import con from "../connection";
import AuthEvent from "./AuthEvent";
import TodoEvent from "./todoEvent";

class Subscribe {
  private fromService?: string;
  private content?: any;

  constructor(private msg: ConsumeMessage) {
    this.content = JSON.parse(msg.content.toString());
    this.fromService = this.content.fromService;
    this.generateEventAccordingToType();
  }

  ack() {
    con.channel?.ack(this.msg);
  }

  generateEventAccordingToType() {
    switch (this.fromService) {
      case "auth":
        return new AuthEvent({ ...this.content }, () => {
          this.ack();
        });

      case "todo":
        return new TodoEvent({ ...this.content }, () => {
          this.ack();
        });
      default:
        return;
    }
  }
}

export default Subscribe;
