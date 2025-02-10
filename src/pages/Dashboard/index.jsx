import { Button, Input } from "../../components";
import Header from "../../components/Header";
import throttle from "lodash.throttle";
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
import {
  setBoocking,
  setRoomID,
  setRooms as setRoomsState,
} from "Reduser/ChatReduser";
import useWebSocket from "./useWebSoket";

export default function ChatUIPageUserPage({
  bookingState,
  setBookingState = () => {},
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("userId");

  const [rooms, setRooms] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newChatMessages, setNewChatMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const [offset, setOffset] = useState(0);

  const connectionStatus = useSelector(
    ({ chatSlice }) => chatSlice.connectionStatus
  );

  const chatContainerRef = useRef(null);

  const getRoomId = () => {
    const params = new URLSearchParams(location.search);
    return params.get("roomId");
  };

  const roomId = getRoomId();

  useWebSocket(roomId, setNewChatMessages, setRooms, setBookingState);

  const handleSendMessage = async () => {
    if (sendMessage.trim() === "") {
      alert("Please enter a message before submitting.");
      return;
    }

    const toUserId = new URLSearchParams(location.search).get("toUserId");

    const resp = await sendMessageToChat({
      message: sendMessage,
      to_user: toUserId,
      room: roomId,
    });

    if (resp.status === 200) {
      setNewChatMessages((prev) => [...prev, resp.data]);
      setSendMessage("");

      const chatEndRef = document.querySelector("#chat-end");
      if (chatEndRef) {
        chatEndRef.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      const container = chatContainerRef.current;
      if (container && container.scrollTop === 0) {
        setOffset((prevOffset) => prevOffset + 1);
      }
    }, 200);

    const container = chatContainerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          setRooms(
            resp.data?.map((el) => ({
              ...el,
              messageCount: 0,
            }))
          );
        }
      }
    };

    fetchRooms();
  }, [userId]);
  console.log("rooms", rooms);

  useEffect(() => {
    const markMessagesAsViewed = async () => {
      if (roomId) {
        try {
          await postViewed(roomId);
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
          setRooms((prev) =>
            prev.map((el) =>
              el.chat_room_id === roomId ? { ...el, messageCount: 0 } : el
            )
          );
        }
      };

      fetchChats();
    }
    dispatch(setRoomID(roomId));
  }, [roomId, offset, dispatch]);

  useEffect(() => {
    if (newChatMessages.length > 0) {
      setChatMessages((prev) => [...prev, ...newChatMessages]);
      setNewChatMessages([]);
    }
  }, [newChatMessages]);

  useEffect(() => {
    dispatch(setRoomsState(rooms));
  }, [rooms, dispatch]);

  useEffect(() => {
    console.log("bookingState", bookingState);

    dispatch(setBoocking(bookingState || []));
  }, [bookingState, dispatch]);

  console.log("rooms", rooms);

  return (
    <div className="w-full bg-white-a700 px-5 sm:py-4">
      <div className="flex w-full">
        <div className="flex flex-wrap w-full">
          {roomId && (
            <div className="flex items-center justify-evenly gap-4">
              <Header chatMessages={chatMessages} />
            </div>
          )}

          <div
            className="h-[450px] overflow-y-auto bg-[rgba(239, 239, 239, 1)] rounded-md w-full mb-10"
            ref={chatContainerRef}
          >
            {roomId && chatMessages.length > 0 ? (
              <ChatContainer
                key={roomId}
                roomId={roomId}
                messages={chatMessages}
                setChatMessages={setChatMessages}
                newMessages={newChatMessages}
                closeChat={() => navigate("/")}
                isChatOpen={false}
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
                placeholder="Send a message"
                className="w-full rounded-[10px] !border px-[18px] font-medium"
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="min-w-[192px] rounded-[10px] px-[34px] font-semibold bg-[#315266]"
              >
                Отправить
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
