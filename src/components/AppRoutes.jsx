import React from "react";
import { Routes, Route } from "react-router-dom";

import RandomUsersPage from "../pages/RandomUsersPage/RandomUsersPage";
import SavedUserPage from "../pages/SavedUserPage/SavedUserPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index path="/" element={<RandomUsersPage />} />
      <Route path="/saved" element={<SavedUserPage />} />
    </Routes>
  );
};

export default AppRoutes;
