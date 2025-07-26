"use client";
import { useAuthContext } from "@/components/templates/providers";
import { notFound } from "next/navigation";
import React from "react";

function UserDashboard() {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn) {
    return (
      <div className="flex-1 h-full w-full flex justify-center items-center">
        <p>Unauthorized</p>
      </div>
    );
  }
  return <div>This is user dashboard</div>;
}

export default UserDashboard;
