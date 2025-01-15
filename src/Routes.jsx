import React from "react";
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

  return (
    <div>
      <Routes>
        <Route index element={<GlassEffectLoginPageBlue />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<ChatUIPageUserPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default ProjectRoutes;
