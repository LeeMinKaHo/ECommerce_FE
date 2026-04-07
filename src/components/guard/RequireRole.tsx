import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireRole = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const user = useSelector((state : RootState) => state.user);
  
  if (!user || !allowedRoles.includes(user.role)) {
    console.log("Access denied. User role:", user?.role);
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default RequireRole;
