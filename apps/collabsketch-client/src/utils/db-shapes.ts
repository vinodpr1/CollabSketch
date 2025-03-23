import axios from "axios";
import { HTTP_BACKEND_URL } from "@repo/common/HTTP_BACKEND_URL";

export const getShapes = async (roomid: any) => {
  const slug = roomid.split("%20").join(" ");
  const shapes = await axios.get(
    `http://localhost:3000/api/shapes?slug=${slug}`,
  );

  if (!shapes) return;
  const parsedChat = shapes.data.response.map((data: any) => {
    return JSON.parse(data.message);
  });
  console.log("parsedChat", parsedChat);
  return parsedChat;
};
