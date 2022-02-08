import amqp from "amqplib";
import configs from "../configs";

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
      Buffer.from(msg)
    );

    console.log(` ======== is message published ? ${isPublish}`);
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
            return this.channel!.ack(msg);
          }
          console.log(
            `message content for this ${this.qName} = `,
            msg.content.toString()
          );
          return this.channel!.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );
  }

  async setup() {
    await this.connect();
    await this.createChannel();
    await this.assertExchange();
    await this.assertQueue();
    await this.bindQueue();
    await this.subscribe();
  }
}

const con = new Connection();

export default con;
