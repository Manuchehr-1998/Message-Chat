import { privateApiRoute } from "utils/GlobalRequest";

export const getRooms = async () => {
  const resp = await privateApiRoute.get(`rooms`);

  return resp;
};

export const getChatHistory = async (roomId) => {
  const resp = await privateApiRoute.get(`chat_history?room_id=${roomId}`);

  return resp;
};

export const sendMessageToChat = async (body) => {
  const resp = await privateApiRoute.post(`chat_message`, body);

  return resp;
};
export const postViewed = async (roomId) => {
  const resp = await privateApiRoute.post(`message/viewed?room_id=${roomId}`);

  return resp;
};
