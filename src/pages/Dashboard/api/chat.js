import { privateApiRoute } from "utils/GlobalRequest";

export const getRooms = async () => {
  const resp = await privateApiRoute.get(`rooms`);

  return resp;
};

export const getChatHistory = async (roomId, offset, firstMessageId) => {
  try {
    const params = new URLSearchParams({
      room_id: roomId,
      limit: 20,
      offset: offset,
    });

    if (firstMessageId !== null && firstMessageId !== undefined) {
      params.append("last_message", firstMessageId);
    }

    const resp = await privateApiRoute.get(`chat_history?${params.toString()}`);
    return resp;
  } catch (error) {
    // console.error("Ошибка API-запроса:", error);
    throw error;
  }
};

export const sendMessageToChat = async (body) => {
  const resp = await privateApiRoute.post(`chat_message`, body);

  return resp;
};

export const postViewed = async (roomId) => {
  const resp = await privateApiRoute.post(`message/viewed?room_id=${roomId}`);

  return resp;
};
