import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "pages/NotFound";
import GlassEffectLoginPageBlue from "pages/Auth";
import Layout from "components/Layout/Layout";
import ChatUIPageUserPage from "pages/Dashboard";

const ProjectRoutes = () => {
  // let element = useRoutes([
  //   { path: "/", element: <GlassEffectLoginPageBlue /> },
  //   { path: "*", element: <NotFound /> },
  //   {
  //     path: "/dashboard",

  //     element: <Layout />,
  //     childrens: [{ index: true, element: <ChatUIPageUser /> }],
  //   },
  // ]);
  const [bookingState, setBookingState] = useState([]);

  return (
    <div>
      <Routes>
        <Route index element={<GlassEffectLoginPageBlue />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route
            index
            element={
              <ChatUIPageUserPage
                bookingState={bookingState}
                setBookingState={setBookingState}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default ProjectRoutes;
