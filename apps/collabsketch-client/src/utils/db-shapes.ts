import axios from "axios";
import { HTTP_BACKEND_URL } from "@repo/common/HTTP_BACKEND_URL";

export const getShapes = async (roomid: any) => {
    const slug = roomid.split("%20").join(" ");
    const room = await axios.get(
      `${HTTP_BACKEND_URL}/room/slugroom?slug=${slug}`,
    );
    const chats = await axios.get(
      `${HTTP_BACKEND_URL}/chat/messages?roomid=${room.data.response.id}`,
    );
    if (!chats) return;
    const parsedChat = chats.data.chats.map((data: any) => {
      return JSON.parse(data.message);
    });
    return parsedChat;
  };
  