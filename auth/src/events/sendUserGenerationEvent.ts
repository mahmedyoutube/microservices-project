import axios from "axios";

export const sendUserGenerationEvent = async (body: { email: string }) => {
  try {
    axios.post("http://localhost:3001/events", body); // chat service
    axios.post("http://localhost:3002/events", body); // todo service
  } catch (err) {
    console.log("event did not send. Please try again later ", err);
  }
  return;
};
