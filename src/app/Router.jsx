import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { PublicBoards } from "../pages/boards/PublicBoards";
import { AccessBoards } from "../pages/boards/AccessBoards";
import { BoardPage } from "../pages/boardPage/BoardPage";

const Logout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/login" replace />;
};

export const Router = () => {
  const { isAuth } = useAuth();

  return (
    <Routes>
      {isAuth && (
        <Route element={<Layout />}>
          <Route path="/" element={<PublicBoards />} />
          <Route path="/my" element={<AccessBoards />} />
          <Route path="/my/:boardId" element={<BoardPage />} />
        </Route>
      )}

      <Route path="/board/:boardHash" element={<BoardPage publicBoard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route
        path="*"
        element={
          isAuth ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};
