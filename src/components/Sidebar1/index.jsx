import { Img, Heading } from "./..";
import React, { useState } from "react";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { destroyToken } from "utils/GlobalRequest";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setProfileSidebarOpen, setShowMessages } from "Reduser/ChatReduser";
import "./style.css";
import Icon from "components/svg/Icon";
import MessagesIcon from "components/svg/MessagesIcon";
import MenuIcon from "components/svg/MenuIcon";

export default function Sidebar1({ ...props }) {
  const rooms = useSelector(({ chatSlice }) => chatSlice.rooms || []);
  const roomId = useSelector(({ chatSlice }) => chatSlice.roomID);

  const dispatch = useDispatch();

  const dataBoocking = useSelector(({ chatSlice }) => chatSlice.isBooked);
  console.log("dataBoocking", dataBoocking);

  const showMessages = useSelector(({ chatSlice }) => chatSlice.showMessages);
  const profileSidebarOpen = useSelector(
    ({ chatSlice }) => chatSlice.profileSidebarOpen
  );

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // const [showMessages, setShowMessages] = useState(false);
  // const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  // console.log("showMessages", showMessages);

  const toggleMessages = () => {
    dispatch(setShowMessages(!showMessages));

    dispatch(setProfileSidebarOpen(false));
  };

  const toggleProfile = () => {
    dispatch(setProfileSidebarOpen(!profileSidebarOpen));
    dispatch(setShowMessages(false));
    navigate("/");
  };

  // Close both sidebars
  const closeSidebars = () => {
    dispatch(setShowMessages(false));
    setProfileSidebarOpen(false);
  };

  // Toggle hamburger menu
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  console.log("rooms", rooms);

  return (
    <div className="flex">
      <Sidebar
        {...props}
        roomId={roomId}
        width="312px !important"
        collapsedWidth="80px !important"
        collapsed={collapsed || !hamburgerOpen}
        className="flex bg-[#EBECEE] flex-col h-screen pt-[26px] gap-[42px] top-0 sm:pt-4 shadow-sm !sticky overflow-auto transition-all duration-300 ease-in-out"
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex p-4" onClick={toggleHamburger}>
            <button className="space-y-2">
              {hamburgerOpen ? (
                <div className="flex gap-x-40 items-center justify-center">
                  <img src="logo.svg" alt="logo" />
                  <div className="relative w-6 h-6">
                    <div className="w-6 h-1 bg-slate-900 transform rotate-45 absolute top-1/2 left-0 -translate-y-1/2"></div>
                    <div className="w-6 h-1 bg-slate-900 transform -rotate-45 absolute top-1/2 left-0 -translate-y-1/2"></div>
                  </div>
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
            <div className="flex justify-center items-center">
              <Heading
                size="headings"
                as="h2"
                className="!font-poppins text-[26px] font-bold flex gap-x-3"
              >
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
                boxShadow: "14px 17px 40px 4px #7090b014",
                transition: "all 0.3s ease",
              },
            },
          }}
          rootStyles={{ ["&>ul"]: { gap: "400px" } }}
          className="flex w-full flex-col self-stretch px-[26px] sm:px-5"
        >
          {hamburgerOpen && (
            <div className="flex flex-wrap gap-2">
              <Menu
                className="hover:bg-[#adcce0] hover:p-2 hover:rounded-md hover:text-white-a700 "
                onClick={toggleMessages}
              >
                <div className="flex gap-2">
                  <MessagesIcon />
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

          {!hamburgerOpen && (
            <div className="flex flex-wrap gap-2">
              <Menu
                className="hover:bg-[#315266] hover:p-2 hover:rounded-md hover:text-white-a700"
                onClick={toggleMessages}
              >
                <MenuIcon />
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
          className="flex bg-[#EBECEE] flex-col h-screen pt-[26px] gap-[42px] top-0 sm:pt-4 bg-white-a700 shadow-sm !sticky overflow-auto  transition-all duration-300 ease-in-out"
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
                <Icon />
              </button>
              <span>Users</span>
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
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "5px",
                marginTop: "5px",
                [`&:hover, &.ps-active`]: {
                  backgroundColor: "#EBECEE !important",
                  boxShadow: "14px 17px 40px 4px #7090b014",
                  transition: "all 0.3s ease",
                  width: "100%",
                },
              },
            }}
            className="px-2 w-full"
          >
            {rooms?.map((el) => {
              return (
                <Badge
                  key={el?.chat_room_id}
                  count={el?.messageCount}
                  className="w-full antBadge"
                >
                  <MenuItem
                    onClick={() => {
                      navigate(
                        `?roomId=${el?.chat_room_id}&toUserId=${el?.client_uuid}`
                      );
                    }}
                    active={el?.chat_room_id === roomId}
                  >
                    <span className="relative flex h-4 w-4 mx-2">
                      {dataBoocking.find(
                        (e) => e?.room_id === el?.chat_room_id
                      ) ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </>
                      ) : null}
                    </span>
                    <p>
                      {el?.client_data || null
                        ? el.client_data.phone_number
                        : "Неизвестно"}
                    </p>
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
          className="flex bg-[#EBECEE] flex-col h-screen pt-[26px] gap-[42px] top-0 sm:pt-4 bg-white-a700 shadow-sm !sticky overflow-auto transition-all duration-300 ease-in-out"
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
