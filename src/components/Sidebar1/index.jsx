import { Img, Heading } from "./..";
import React, { useState } from "react";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { destroyToken } from "utils/GlobalRequest";
import { Badge } from "antd";
import { useSelector } from "react-redux";

export default function Sidebar1({ ...props }) {
  const rooms = useSelector(({ chatSlice }) => chatSlice.rooms);
  const roomId = useSelector(({ chatSlice }) => chatSlice.roomID);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const currentRoom = rooms[0] || {};

  const toggleMessages = () => {
    setShowMessages(!showMessages);
    setProfileSidebarOpen(false);
  };

  // Toggle profile sidebar visibility
  const toggleProfile = () => {
    setProfileSidebarOpen(!profileSidebarOpen);
    setShowMessages(false); // Close the message sidebar when opening profile
  };

  // Close both sidebars
  const closeSidebars = () => {
    setShowMessages(false);
    setProfileSidebarOpen(false);
  };

  // Toggle hamburger menu
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <div className="flex">
      <Sidebar
        {...props}
        roomId={roomId}
        width="312px !important"
        collapsedWidth="80px !important"
        collapsed={collapsed || !hamburgerOpen}
        className="flex bg-[#EBECEE] flex-col h-screen pt-[26px] gap-[42px] top-0 sm:pt-4 shadow-sm !sticky overflow-auto md:hidden transition-all duration-300 ease-in-out"
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex md:hidden p-4" onClick={toggleHamburger}>
            <button className="space-y-2">
              {hamburgerOpen ? (
                <div className="relative w-6 h-6">
                  <div className="w-6 h-1 bg-slate-900 transform rotate-45 absolute top-1/2 left-0 -translate-y-1/2"></div>
                  <div className="w-6 h-1 bg-slate-900 transform -rotate-45 absolute top-1/2 left-0 -translate-y-1/2"></div>
                </div>
              ) : (
                <>
                  <div className="w-6 h-1 bg-slate-900"></div>
                  <div className="w-6 h-1 bg-slate-900"></div>
                  <div className="w-6 h-1 bg-slate-900"></div>
                </>
              )}
            </button>
          </div>
          {hamburgerOpen && (
            <div className="flex justify-center">
              <Heading
                size="headings"
                as="h2"
                className="!font-poppins text-[26px] font-bold flex gap-x-3"
              >
                <img src="logo.svg" alt="logo" />
                <span>STANDART MOLIYA</span>
              </Heading>
            </div>
          )}
          {/* Logo only for closed sidebar */}
          {!hamburgerOpen && (
            <div className="flex justify-center items-center">
              <Heading
                size="headings"
                as="h3"
                className="!font-poppins text-[26px] font-bold flex gap-x-3"
              >
                <img src="logo.svg" alt="logo" />
              </Heading>
            </div>
          )}

          {/* Separator */}
          <Img
            src="images/img_separator.svg"
            alt="Separator"
            className="h-px w-full"
          />
        </div>
        <Menu
          menuItemStyles={{
            button: {
              color: "#1b2559",
              fontWeight: 700,
              fontSize: "16px",
              borderRadius: "30px",
              [`&:hover, &.ps-active`]: {
                backgroundColor: "#EBECEE !important",
                padding: "10px",
                boxShadow: "14px 17px 40px 4px #7090b014",
                transition: "all 0.3s ease",
              },
            },
          }}
          rootStyles={{ ["&>ul"]: { gap: "400px" } }}
          className="flex w-full flex-col self-stretch px-[26px] sm:px-5"
        >
          {/* Menu items with text (for expanded sidebar) */}
          {hamburgerOpen && (
            <div className="flex flex-wrap gap-2">
              <Menu
                className="hover:bg-[#adcce0] hover:p-2 hover:rounded-md hover:text-white-a700 "
                onClick={toggleMessages}
              >
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="26"
                    height="25"
                    viewBox="0 0 32 32"
                  >
                    <path d="M 16 3 C 12.210938 3 8.765625 4.113281 6.21875 5.976563 C 3.667969 7.835938 2 10.507813 2 13.5 C 2 17.128906 4.472656 20.199219 8 22.050781 L 8 29 L 14.746094 23.9375 C 15.15625 23.96875 15.570313 24 16 24 C 19.789063 24 23.234375 22.886719 25.78125 21.027344 C 28.332031 19.164063 30 16.492188 30 13.5 C 30 10.507813 28.332031 7.835938 25.78125 5.976563 C 23.234375 4.113281 19.789063 3 16 3 Z M 16 5 C 19.390625 5 22.445313 6.015625 24.601563 7.589844 C 26.757813 9.164063 28 11.246094 28 13.5 C 28 15.753906 26.757813 17.835938 24.601563 19.410156 C 22.445313 20.984375 19.390625 22 16 22 C 15.507813 22 15.015625 21.972656 14.523438 21.925781 L 14.140625 21.894531 L 10 25 L 10 20.859375 L 9.421875 20.59375 C 6.070313 19.019531 4 16.386719 4 13.5 C 4 11.246094 5.242188 9.164063 7.398438 7.589844 C 9.554688 6.015625 12.609375 5 16 5 Z"></path>
                  </svg>
                  <h1>Message</h1>
                </div>
              </Menu>
              <Menu
                className="hover:bg-[#adcce0] hover:p-2 hover:rounded-md hover:text-white-a700"
                onClick={toggleProfile}
              >
                <div className="flex gap-2">
                  <Img
                    src="images/profile.png"
                    alt="Profile"
                    className="w-6 h-6"
                  />
                  <h1>Profile</h1>
                </div>
              </Menu>
            </div>
          )}

          {/* Menu items with icons (for collapsed sidebar) */}
          {!hamburgerOpen && (
            <div className="flex flex-wrap gap-2">
              <Menu
                className="hover:bg-[#315266] hover:p-2 hover:rounded-md hover:text-white-a700"
                onClick={toggleMessages}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="26"
                  height="25"
                  viewBox="0 0 32 32"
                >
                  <path d="M 16 3 C 12.210938 3 8.765625 4.113281 6.21875 5.976563 C 3.667969 7.835938 2 10.507813 2 13.5 C 2 17.128906 4.472656 20.199219 8 22.050781 L 8 29 L 14.746094 23.9375 C 15.15625 23.96875 15.570313 24 16 24 C 19.789063 24 23.234375 22.886719 25.78125 21.027344 C 28.332031 19.164063 30 16.492188 30 13.5 C 30 10.507813 28.332031 7.835938 25.78125 5.976563 C 23.234375 4.113281 19.789063 3 16 3 Z M 16 5 C 19.390625 5 22.445313 6.015625 24.601563 7.589844 C 26.757813 9.164063 28 11.246094 28 13.5 C 28 15.753906 26.757813 17.835938 24.601563 19.410156 C 22.445313 20.984375 19.390625 22 16 22 C 15.507813 22 15.015625 21.972656 14.523438 21.925781 L 14.140625 21.894531 L 10 25 L 10 20.859375 L 9.421875 20.59375 C 6.070313 19.019531 4 16.386719 4 13.5 C 4 11.246094 5.242188 9.164063 7.398438 7.589844 C 9.554688 6.015625 12.609375 5 16 5 Z"></path>
                </svg>
              </Menu>
              <Menu
                className="hover:bg-[#315266] hover:p-2 hover:rounded-md hover:text-white-a700"
                onClick={toggleProfile}
              >
                <Img
                  src="images/profile.png"
                  alt="Profile"
                  className="w-6 h-6"
                />
              </Menu>
            </div>
          )}

          {/* MenuItem for user profile */}
          <div>
            <MenuItem
              onClick={() => destroyToken(navigate)}
              icon={
                <Img
                  src="images/img_elipse_5.png"
                  alt="Elipsefive"
                  className="h-[34px] w-[34px] rounded-[16px] object-cover"
                />
              }
              suffix={
                <Img
                  src="images/img_thumbs_up.svg"
                  alt="logout"
                  className="h-[20px] w-[20px] object-cover"
                />
              }
            >
              {hamburgerOpen ? (
                "Adela Parkson"
              ) : (
                <Img
                  src="images/icon_user.svg"
                  alt="User"
                  className="w-6 h-6"
                />
              )}
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>

      {/* Message Sidebar */}
      {showMessages && (
        <Sidebar
          width="312px"
          collapsedWidth="80px"
          collapsed={false}
          rootStyles={{ [`.${sidebarClasses.container}`]: { gap: 42 } }}
          className="flex bg-[#EBECEE] flex-col h-screen pt-[26px] gap-[42px] top-0 sm:pt-4 bg-white-a700 shadow-sm !sticky overflow-auto md:hidden transition-all duration-300 ease-in-out"
        >
          <div className="mt-4 flex flex-col items-center gap-[30px] self-stretch">
            <Heading
              size="headings"
              as="h4"
              className="!font-poppins text-[26px] font-bold flex gap-4"
            >
              <button
                onClick={closeSidebars}
                className="text-[20px] font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="transition-all duration-300 ease-in-out" // Smooth transition for icon
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M19 11H7.41l5.29-5.29a1 1 0 1 0-1.42-1.42l-7 7a1 1 0 0 0 0 1.42l7 7a1 1 0 0 0 1.42-1.42L7.41 13H19a1 1 0 0 0 0-2z" />
                </svg>
              </button>
              <span>Users Messages</span>
            </Heading>
            <Img
              src="images/img_separator.svg"
              alt="Separator"
              className="h-px w-full"
            />
          </div>
          <Menu
            menuItemStyles={{
              button: {
                color: "#1b2559",
                fontWeight: 700,
                fontSize: "16px",
                borderRadius: "30px",
                [`&:hover, &.ps-active`]: {
                  backgroundColor: "#EBECEE !important",
                  padding: "10px",
                  boxShadow: "14px 17px 40px 4px #7090b014",
                  transition: "all 0.3s ease", // Smooth transition
                },
              },
            }}
            rootStyles={{ ["&>ul"]: { gap: "400px" } }}
            className="flex w-full flex-col self-stretch px-[26px] sm:px-5"
          >
            {rooms?.map((el, i) => {
              return (
                <Badge key={el?.chat_room_id} count={el?.messageCount}>
                  <MenuItem
                    onClick={() => {
                      navigate(
                        `?roomId=${el?.chat_room_id}&toUserId=${el?.client_uuid}`
                      );
                    }}
                    active={el?.chat_room_id === roomId}
                    icon={
                      <Img
                        src="images/img_auto_awesome_fi.svg"
                        alt="Autoawesomefi"
                        className="h-[22px] w-[24px]"
                      />
                    }
                  >
                    <p>{currentRoom.client_data?.phone_number}</p>
                  </MenuItem>
                </Badge>
              );
            })}
          </Menu>
        </Sidebar>
      )}

      {profileSidebarOpen && (
        <Sidebar
          width="312px"
          collapsedWidth="80px"
          collapsed={false}
          rootStyles={{ [`.${sidebarClasses.container}`]: { gap: 42 } }}
          className="flex bg-[#EBECEE] flex-col h-screen pt-[26px] gap-[42px] top-0 sm:pt-4 bg-white-a700 shadow-sm !sticky overflow-auto md:hidden transition-all duration-300 ease-in-out"
        >
          <div className="mt-4 flex flex-col items-center gap-[30px] self-stretch">
            <Heading
              size="headings"
              as="h4"
              className="!font-poppins text-[26px] font-bold flex gap-4"
            >
              <span>Profile Information</span>
            </Heading>
            <Img
              src="images/img_separator.svg"
              alt="Separator"
              className="h-px w-full"
            />
          </div>
          <Menu
            menuItemStyles={{
              button: {
                color: "#1b2559",
                fontWeight: 700,
                fontSize: "16px",
                borderRadius: "30px",
                [`&:hover, &.ps-active`]: {
                  backgroundColor: "#EBECEE !important",
                  padding: "10px",
                  boxShadow: "14px 17px 40px 4px #7090b014",
                  transition: "all 0.3s ease", // Smooth transition
                },
              },
            }}
            rootStyles={{ ["&>ul"]: { gap: "400px" } }}
            className="flex w-full flex-col self-stretch px-[26px] sm:px-5"
          >
            <MenuItem
              onClick={() => {
                destroyToken(navigate);
              }}
              icon={
                <Img
                  src="images/img_elipse_5.png"
                  alt="Elipsefive"
                  className="h-[34px] w-[34px] rounded-[16px] object-cover"
                />
              }
            >
              {"UserName"}
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
    </div>
  );
}
