import axios from "axios";
import con from "./connection";

export const sendUserGenerationEvent = async (body: {
  email: string;
  userId: string;
}) => {
  con.publish(
    JSON.stringify({ fromService: process.env.SERVICE_NAME!, ...body })
  );
  // try {
  //   axios.post("http://chat:3001/events/user", body); // chat service
  //   axios.post("http://todo:3002/events/user", body); // todo service
  // } catch (err) {
  //   console.log("event did not send. Please try again later ", err);
  // }
  // return;
};
