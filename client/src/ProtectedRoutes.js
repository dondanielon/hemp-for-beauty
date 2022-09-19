import React from "react";
import useAuth from "./hooks/useAuth";
import { Outlet } from "react-router-dom";

export function UserProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <label>Aqui va el redirect al login</label>
  );
}

export function AdminProtectedRoutes() {
  const { isAuthenticated, permissions } = useAuth();

  return isAuthenticated && permissions ? (
    <Outlet />
  ) : isAuthenticated && !permissions ? (
    <label>Aqui va el componente de no tener permisos</label>
  ) : (
    <label>Aqui va el redirect al login</label>
  );
}

