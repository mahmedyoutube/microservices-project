import amqp from "amqplib";
import configs from "../configs";
import Subscribe from "./subscribers";

class Connection {
  private _amqp?: amqp.Connection;
  private _channel?: amqp.Channel;
  private _url = configs.brokerUrl;
  private exchangeName = configs.exchangeName;
  private qName = configs.queuryName;
  private myServiceName = configs.myServiceName;

  constructor() {
    this.setup();
  }

  async setup() {
    await this.connect();
    await this.createChannel();
    await this.assertExchange();
    await this.assertQueue();
    await this.bindQueue();
    await this.subscribe();
  }

  get con() {
    return this._amqp;
  }

  get channel() {
    return this._channel;
  }

  async connect() {
    this._amqp = await amqp.connect(this._url || "amqp://localhost");
    console.log(
      " ============ rabbitmq connected successfully ============== "
    );
  }

  async createChannel() {
    this._channel = await this.con?.createChannel();
  }

  async assertExchange() {
    await this.channel?.assertExchange(this.exchangeName, "fanout", {
      durable: true,
    });
  }

  async publish(msg: string) {
    const isPublish = await this.channel?.publish(
      this.exchangeName,
      "",
      Buffer.from(msg),
      { persistent: true }
    );

    console.log(
      ` ======== is message published to ${this.qName} ? ${isPublish}`
    );
  }

  async assertQueue() {
    this.channel?.assertQueue(this.qName);
  }

  async bindQueue() {
    this.channel!.bindQueue(this.qName, this.exchangeName, "");
  }

  async subscribe() {
    this.channel!.consume(
      this.qName,
      (msg: amqp.ConsumeMessage | null) => {
        if (!msg) {
          console.log(" ========== null message error occured =========== ");
          return;
        }
        if (msg.content) {
          const content = JSON.parse(msg.content.toString());
          if (content.fromService === this.myServiceName) {
            console.log(" ========= same service sent this event =========");
            return this.channel!.ack(msg);
          }
          console.log(
            `message content for this ${this.qName} = `,
            msg.content.toString()
          );
          new Subscribe(msg);
        }
      },
      {
        noAck: false,
      }
    );
  }
}

const con = new Connection();

export default con;
