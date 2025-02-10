import React, { useEffect, useRef, useState } from "react";
import avatar from "../../images/avatar.jpg";
import dayjs from "dayjs";
import fetchChatHistory from "hooks/ChatHistory";
import useScrollHandler from "hooks/ScrollHandler";

function ChatContainer({
  roomId,
  messages = [],
  newMessages = [],
  setChatMessages,
  closeChat,
  isChatOpen,
}) {
  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [firstMessageId, setFirstMessageId] = useState(null);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const allMessages = [...messages, ...newMessages].reduce((unique, item) => {
    if (!item || !item.id) return unique; // Пропускаем невалидные сообщения
    return unique.some((msg) => msg.id === item.id)
      ? unique
      : [...unique, item];
  }, []);

  useScrollHandler(
    chatContainerRef,
    isScrollingUp,
    setIsScrollingUp,
    setOffset
  );

  // Загрузка истории чата при прокрутке вверх
  useEffect(() => {
    if (offset > 0 && firstMessageId) {
      fetchChatHistory(roomId, offset, firstMessageId, setChatMessages);
    }
  }, [offset]);

  // Обработчик нажатия клавиши Escape для закрытия чата
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeChat();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeChat]);

  // Установка ID первого сообщения
  useEffect(() => {
    if (messages.length > 0) {
      setFirstMessageId(messages[0].id);
    }
  }, [messages]);

  // Скролл к последнему сообщению при открытии чата
  useEffect(() => {
    if (isChatOpen) {
      const scrollTimeout = setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return () => clearTimeout(scrollTimeout);
    }
  }, [isChatOpen]);

  // Скролл к последнему сообщению при добавлении нового
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  return (
    <div
      ref={chatContainerRef}
      className="w-full flex flex-col space-y-5 items-start overflow-y-auto h-full"
    >
      {allMessages?.map(
        (elem) =>
          elem?.id && (
            <div
              key={elem.id}
              className={`w-full flex flex-row ${
                elem.msg_position === "left" ? "justify-start" : "justify-end"
              }`}
            >
              <div className="flex flex-row items-center space-x-3 bg-slate-50 rounded-2xl p-2">
                <img
                  className="rounded-full"
                  src={avatar}
                  alt="avatar"
                  width={40}
                />
                <div className="flex flex-col space-y-2 items-start">
                  <p className="text-[16px] text-gray-800">
                    {elem.message_text}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-[14px] text-gray-600">
                      {dayjs(elem.created_at).format("DD-MM-YYYY HH:mm")}
                    </p>
                    {isChatOpen && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth={2}
                        stroke="green"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10l4 4L15 3"
                          stroke="lightgreen"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
      )}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatContainer;
