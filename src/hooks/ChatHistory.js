import { getChatHistory } from "pages/Dashboard/api/chat";

const fetchChatHistory = async (
  roomId,
  offset,
  firstMessageId,
  setChatMessages
) => {
  if (!firstMessageId) return; // Avoid fetching if no first message ID

  try {
    const response = await getChatHistory(roomId, offset, firstMessageId);
    if (Array.isArray(response?.data)) {
      setChatMessages((prevMessages) => {
        const newMessages = response.data.filter(
          (msg) => !prevMessages.some((prevMsg) => prevMsg.id === msg.id)
        );
        return [...newMessages, ...prevMessages];
      });
    } else {
      console.warn("Некорректный формат данных:", response?.data);
    }
  } catch (error) {
    console.error("Ошибка при получении истории чата:", error);
  }
};

export default fetchChatHistory;
