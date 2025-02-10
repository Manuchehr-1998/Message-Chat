import { useSelector } from "react-redux";
import React from "react";

export default function Header({ chatMessages }) {
  const rooms = useSelector(({ chatSlice }) => chatSlice.rooms);
  const dataBoocking = useSelector(({ chatSlice }) => chatSlice.isBooked);
  const connectionStatus = useSelector(
    ({ chatSlice }) => chatSlice.connectionStatus
  );

  // Получаем текущую комнату
  const currentRoom = rooms[0] || {};
  const currentRoomId = currentRoom?.chat_room_id;

  // Проверяем, забронирована ли комната
  const isRoomBooked = dataBoocking.some((e) => e?.room_id === currentRoomId);

  // Компонент для отображения статуса соединения
  const ConnectionStatus = () => {
    const statusMessages = {
      Connecting: "Connecting",
      Reconnecting: "Reconnecting ",
      Connected: "Successfully",
      Disconnected: "Connection lost",
    };

    const statusColors = {
      Connecting: "text-yellow-600",
      Reconnecting: "text-orange-500",
      Connected: "text-green-600",
      Disconnected: "text-red-600",
    };

    return (
      chatMessages &&
      connectionStatus && (
        <p className={`${statusColors[connectionStatus]} font-semibold`}>
          {statusMessages[connectionStatus]}
        </p>
      )
    );
  };

  return (
    <header>
      <div className="flex w-full items-center justify-between gap-5 sm:flex-col mt-8">
        <div className="w-[100%] items-start flex flex-wrap">
          {/* Номер телефона текущей комнаты */}
          <h1>
            {currentRoom.client_data?.phone_number || "Unknown phone number"}
          </h1>

          {/* Индикатор онлайн-статуса */}
          <div className="relative flex items-center gap-3 w-full">
            {isRoomBooked && (
              <>
                <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                <h1 className="text-gray-500">Online</h1>
              </>
            )}
          </div>
        </div>
        {/* Статус соединения
        <div className="text-center mb-1">
          <ConnectionStatus />
        </div> */}
      </div>
    </header>
  );
}
