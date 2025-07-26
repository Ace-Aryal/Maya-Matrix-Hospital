"use client";
import { useAuthContext } from "@/components/templates/providers";
import React from "react";

function AdminDashboard() {
  const { roles } = useAuthContext();
  if (!roles?.includes("admin")) {
    return (
      <div className="flex-1 h-full w-full flex justify-center">
        <p>Unauthorized</p>
      </div>
    );
  }
  return <div>AdminDashboard</div>;
}

export default AdminDashboard;
