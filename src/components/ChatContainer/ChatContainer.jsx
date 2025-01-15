import React, { useEffect, useRef } from "react";
import avatar from "../../images/avatar.jpg";
import dayjs from "dayjs";

function ChatContainer({ messages, newMessages, closeChat, isChatOpen }) {
  const chatEndRef = useRef(null);

  // Scroll to the bottom of the chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, newMessages]);

  // Close chat on pressing "Esc"
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeChat(); // Call the closeChat function
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeChat]);

  return (
    <div className="w-full flex flex-col space-y-5 items-start ">
      {messages?.map((elem) => (
        <div
          key={elem.id}
          className={`w-full flex flex-row ${
            elem.msg_position === "left" ? "justify-start" : "justify-end"
          }`}
        >
          <div className="flex flex-row items-center space-x-3 bg-slate-50 rounded-2xl">
            <img
              className="rounded-full"
              src={avatar}
              alt="avatar"
              width={40}
            />
            <div className="flex flex-col space-y-2 items-start p-2">
              <p className="text-[16px] text-gray-800">{elem.message_text}</p>
              <div className="flex items-center space-x-2">
                <p className="text-[14px] text-gray-600">
                  {dayjs(elem.created_at).format("DD-MM-YYYY HH:mm")}
                </p>
                {isChatOpen && (
                  <div>
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {newMessages?.map((elem) => (
        <div
          key={elem.id}
          className={`w-full flex flex-row ${
            elem.msg_position === "left" ? "justify-start" : "justify-end"
          }`}
        >
          <div className="flex flex-row items-center space-x-3 bg-slate-50 rounded-2xl">
            <img
              className="rounded-full"
              src={avatar}
              alt="avatar"
              width={40}
            />
            <div className="flex flex-col space-y-2 items-end p-2">
              <p className="text-[18px] text-gray-800">{elem.message_text}</p>
              <div className="flex items-center space-x-2">
                <p className="text-[12px] text-gray-600">
                  {dayjs(elem.created_at).format("DD-MM-YYYY HH:mm")}
                </p>
                {isChatOpen && (
                  <div>
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div ref={chatEndRef}></div>
    </div>
  );
}

export default ChatContainer;
