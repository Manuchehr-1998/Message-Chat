import { Button, Input } from "../../components";
import Header from "../../components/Header";
import Sidebar1 from "../../components/Sidebar1";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getRooms,
  getChatHistory,
  sendMessageToChat,
  postViewed,
} from "./api/chat";
import ChatContainer from "components/ChatContainer/ChatContainer";
import { useDispatch, useSelector } from "react-redux";
import { setRoomID, setRooms as setRoomsState } from "Reduser/ChatReduser";
export default function ChatUIPageUserPage() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("userId");
  const [rooms, setRooms] = useState([]);
  const [chatMessages, setChatMessages] = useState(null);
  const [newChatMessages, setNewChatMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [sendMessage, setSendMessage] = useState("");
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const chatContainerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const getRoomId = () => {
    const params = new URLSearchParams(location.search);
    return params.get("roomId");
  };

  const roomId = getRoomId();

  console.log("rooms", rooms);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchRooms = async () => {
      if (userId) {
        const resp = await getRooms();

        if (resp.status === 200) {
          setRooms(resp.data?.map((el) => ({ ...el, messageCount: 0 })));
        }
        setRooms((prev) => [...prev.map((el) => ({ ...el, messageCount: 0 }))]);
      }
    };

    fetchRooms();
  }, [userId]);

  useEffect(() => {
    const markMessagesAsViewed = async () => {
      if (roomId) {
        try {
          const resp = await postViewed(roomId);
          if (resp.status === 200) {
            console.log(`Messages in room ${roomId} marked as viewed.`);
          } else {
            console.error(
              `Failed to mark messages as viewed for room ${roomId}`
            );
          }
        } catch (error) {
          console.error("Error marking messages as viewed:", error);
        }
      }
    };

    markMessagesAsViewed();
  }, [roomId, chatMessages]);

  useEffect(() => {
    if (roomId) {
      const fetchChats = async () => {
        const resp = await getChatHistory(roomId, offset);

        if (resp.status === 200) {
          setChatMessages(resp.data);
          setRooms((prev) => [
            ...prev?.map((el) => {
              if (el.chat_room_id === roomId) {
                return { ...el, messageCount: 0 };
              }
              return el;
            }),
          ]);
        }
      };

      fetchChats();
    }
    dispatch(setRoomID(roomId));
  }, [roomId]);

  // console.log("roomId: ", roomId);

  useEffect(() => {
    const handleScroll = () => {
      const container = chatContainerRef.current;
      if (container && container.scrollTop === 0) {
        setOffset((prevOffset) => prevOffset + 1);
        console.log(setOffset((prevOffset) => prevOffset + 1));
      }
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    let socket;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 1;
    const reconnectDelay = 3000; // 1 минута
    const socketUrl = process.env.REACT_APP_SOCKET_URL;
    console.log(reconnectAttempts);

    const connectWebSocket = () => {
      const updatedAccessToken = localStorage.getItem("access_token");

      if (!updatedAccessToken) {
        console.warn("No access token found, cannot connect to WebSocket");
        return;
      }

      socket = new WebSocket(`${socketUrl}?token=${updatedAccessToken}`);

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          console.log("message", message);

          if (message.event_type !== "chat_msg") {
            console.warn(`Unexpected event type: ${message.event_type}`);
            return;
          }

          const currentRoomId = new URLSearchParams(location.search).get(
            "roomId"
          );

          if (currentRoomId === message.chat_room_id) {
            // Обновляем сообщения в текущем чате
            setChatMessages((prev) => [
              ...prev,
              { ...message.data, msg_position: "left" },
            ]);
            setNewChatMessages((prev) => [
              ...prev,
              { ...message, msg_position: "left" },
            ]);

            // Сбрасываем счётчик новых сообщений для текущей комнаты
            setRooms((prev) =>
              prev.map((el) => {
                if (el.chat_room_id === message.chat_room_id) {
                  return { ...el, messageCount: 0 };
                }
                return el;
              })
            );
          } else {
            // Увеличиваем счётчик новых сообщений для других комнат
            setRooms((prev) =>
              prev.map((el) => {
                if (el.chat_room_id === message.chat_room_id) {
                  return { ...el, messageCount: el.messageCount + 1 };
                }
                return el;
              })
            );
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socket.onopen = () => {
        setConnectionStatus("Connected");
        console.log("Connected to the WebSocket server");
        if (roomId) {
          // Отправляем сообщение о том, что чат открыт
          socket.send(
            JSON.stringify({
              event_type: "book_room",
              room_id: roomId,
            })
          );
        }
        reconnectAttempts = 0;
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error: ", error);
        setConnectionStatus("Reconnecting");
      };

      socket.onclose = () => {
        setConnectionStatus("Reconnecting");
        console.log("Disconnected from the WebSocket server");

        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          setTimeout(connectWebSocket, reconnectDelay);
        } else {
          setConnectionStatus("Disconnected");
          console.warn("Max reconnect attempts reached");
        }
      };
    };

    connectWebSocket();
    return () => {
      if (socket && roomId) {
        socket.send(
          JSON.stringify({
            event_type: "clear_room",
            room_id: roomId,
          })
        );
        console.log("sokect close");

        // socket.close();
      }
    };
  }, [location.search, roomId]);

  useEffect(() => {
    dispatch(setRoomsState(rooms));
  }, [rooms, token]);
  return (
    <>
      <div className="w-full bg-white-a700 px-5 sm:py-4">
        <div className="flex items-start">
          <div className="flex flex-wrap">
            {roomId && (
              <div className="flex items-center justify-evenly  gap-4">
                <Header />
                <div className="text-center mb-1">
                  {chatMessages && (
                    <>
                      {connectionStatus === "Connecting" && (
                        <p className="text-yellow-600 font-semibold">
                          Connecting to the chat...
                        </p>
                      )}
                      {connectionStatus === "Reconnecting" && (
                        <p className="text-orange-500 font-semibold">
                          Reconnecting to the chat...
                        </p>
                      )}
                      {connectionStatus === "Connected" && (
                        <p className="text-green-600 font-semibold">
                          Successfully connected to the chat!
                        </p>
                      )}
                      {connectionStatus === "Disconnected" && (
                        <p className="text-red-600 font-semibold">
                          Connection lost. Please check your network.
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="h-[450px] overflow-y-auto bg-[rgba(239, 239, 239, 1)] rounded-md w-full mb-10">
              {roomId && chatMessages ? (
                <ChatContainer
                  messages={chatMessages}
                  newMessages={newChatMessages}
                  closeChat={() => navigate("/")}
                  isChatOpen={true}
                  // handleScroll={() =>
                  //   setNewChatMessages((prev) =>
                  //     prev.map((el) => ({ ...el, viewed: 1 }))
                  //   )
                  // }
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p className="text-lg font-medium">
                    Выберите чат для отображения сообщений
                  </p>
                </div>
              )}
            </div>
            {roomId && (
              <div className="flex justify-center gap-2.5 px-14 lg:py-8 md:flex-col md:p-5 sm:p-4 w-full">
                <Input
                  color="indigo_50_02"
                  size="md"
                  variant="outline"
                  name="message"
                  placeholder={`Send a message`}
                  className="w-full rounded-[10px] !border px-[18px] font-medium md:w-full"
                  value={sendMessage}
                  onChange={(e) => {
                    setSendMessage(e.target.value);
                  }}
                />
                <Button
                  onClick={async () => {
                    if (sendMessage.trim() === "") {
                      alert("Please enter a message before submitting.");
                      return;
                    }

                    const roomId = new URLSearchParams(location.search).get(
                      "roomId"
                    );
                    const toUserId = new URLSearchParams(location.search).get(
                      "toUserId"
                    );

                    const resp = await sendMessageToChat({
                      message: sendMessage,
                      to_user: toUserId,
                      room: roomId,
                    });

                    if (resp.status === 200) {
                      const newMessage = {
                        ...resp.data,
                        msg_position: "right",
                      };
                      setNewChatMessages((prev) => [...prev, newMessage.data]);
                      setSendMessage("");

                      const chatEndRef = document.querySelector("#chat-end");
                      if (chatEndRef) {
                        chatEndRef.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  size="sm"
                  className="min-w-[192px] rounded-[10px] px-[34px] font-semibold sm:px-4 bg-[#315266]"
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
