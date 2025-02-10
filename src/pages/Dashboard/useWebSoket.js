import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConnectionStatus } from "Reduser/ChatReduser";

let socketInstance = null; // Глобальный экземпляр WebSocket
let messageQueue = [];

const useWebSocket = (
  roomId,
  setNewChatMessages,
  setRooms,
  setBookingState
) => {
  const dispatch = useDispatch();

  const flushMessageQueue = () => {
    while (
      messageQueue.length > 0 &&
      socketInstance.readyState === WebSocket.OPEN
    ) {
      const message = messageQueue.shift();
      socketInstance.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    const socketUrl = process.env.REACT_APP_SOCKET_URL;
    const reconnectDelay = 3000; // Задержка между попытками переподключения
    const maxReconnectAttempts = 1; // Максимальное количество попыток
    let reconnectAttempts = 0;

    const connectWebSocket = () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.warn("No access token available for WebSocket connection.");
        return;
      }

      if (socketInstance && socketInstance.readyState === WebSocket.OPEN) {
        console.log("WebSocket already connected.");
        return;
      }

      socketInstance = new WebSocket(`${socketUrl}?token=${token}`);

      socketInstance.onopen = () => {
        dispatch(setConnectionStatus("Connected"));
        reconnectAttempts = 0;

        flushMessageQueue();

        if (roomId) {
          messageQueue.push({
            event_type: "book_room",
            room_id: roomId,
          });
          flushMessageQueue();
        }
      };

      socketInstance.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          switch (message.event_type) {
            case "chat_msg":
              console.log("message", message, "event", event);

              setNewChatMessages((prevMessages) => [
                message.data,
                ...prevMessages,
              ]);
              console.log(roomId);

              setRooms((prevRooms) =>
                prevRooms.map((room) => {
                  console.log(room.chat_room_id === message.data.chat_room_id);

                  if (room.chat_room_id === message.data.chat_room_id) {
                    console.log(room);
                    if (roomId) {
                      return { ...room, messageCount: 0 };
                    } else {
                      console.log(room);

                      return {
                        ...room,
                        messageCount: (room.messageCount || 0) + 1,
                      };
                    }
                  }
                  return room;
                })
              );
              break;

            case "book_room":
              setBookingState((prev) => [...prev, message.data]);
              break;

            case "clear_room":
              setBookingState((prev) =>
                prev.filter((el) => el.room_id !== message.data.room_id)
              );
              break;

            default:
              console.warn("Unhandled event type:", message.event_type);
              break;
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socketInstance.onerror = (error) => {
        console.error("WebSocket Error:", error);
        dispatch(setConnectionStatus("Reconnecting"));
      };

      socketInstance.onclose = () => {
        dispatch(setConnectionStatus("Reconnecting"));

        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          setTimeout(connectWebSocket, reconnectDelay);
        } else {
          dispatch(setConnectionStatus("Disconnected"));
          console.warn("Max reconnect attempts reached.");
        }
      };
    };

    connectWebSocket();

    if (roomId) {
      messageQueue.push({
        event_type: "book_room",
        room_id: roomId,
      });
      flushMessageQueue();
    }

    return () => {
      if (roomId && socketInstance.readyState === WebSocket.OPEN) {
        socketInstance.send(
          JSON.stringify({
            event_type: "clear_room",
            room_id: roomId,
          })
        );
      }
    };
  }, [roomId, dispatch, setNewChatMessages, setBookingState]);
};

export default useWebSocket;
