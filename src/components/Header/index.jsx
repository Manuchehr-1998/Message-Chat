import { useSelector } from "react-redux";
import { CloseSVG } from "../Input/close";
import { Img, Input, Heading } from "./..";
import React from "react";

export default function Header({ roles, ...props }) {
  const rooms = useSelector(({ chatSlice }) => chatSlice.rooms);

  const currentRoom = rooms[0] || {};

  return (
    <header {...props} className={`${props.className} ml-8 md:ml-0`}>
      <div className="flex w-full items-center justify-between gap-5 sm:flex-col mt-8">
        {/* <Heading
          size="headingmd"
          as="h2"
          className="self-end text-[34px] font-bold lg:text-[28px] md:text-[28px] sm:text-[26px]"
        >
          Chat
        </Heading> */}
        <div className="w-[100%] items-start">
          {/* <Input
            color="gray_50"
            size="sm"
            name="search"
            placeholder={`Search`}
            value={searchBarValue}
            onChange={(e) => setSearchBarValue(e.target.value)}
            prefix={
              <Img
                src="images/img_rewind.svg"
                alt="Rewind"
                className="my-1 h-[10px] w-[10px] object-contain"
              />
            }
            suffix={
              searchBarValue?.length > 0 ? (
                <CloseSVG
                  onClick={() => setSearchBarValue("")}
                  height={10}
                  width={10}
                  fillColor="#1b2559ff"
                />
              ) : null
            }
            className="mb-2 w-[62%] gap-2.5 rounded-[20px] font-medium tracking-[-0.28px] text-gray-600"
          /> */}
          {/* <a href="#">
            <Img
              src="images/img_notifications_none.svg"
              alt="Notifications"
              className="mb-2.5 ml-5 h-[24px] self-end"
            />
          </a> */}

          {/* <Img
            src="images/img_elipse_5_40x40.png"
            alt="Elipsefive"
            className="ml-10 h-[40px] self-center rounded-[20px] object-cover"
          /> */}
          <h1>{currentRoom.client_data?.phone_number}</h1>
          <h1 className="text-gray-500">был(а) недавно</h1>
        </div>
      </div>
    </header>
  );
}
