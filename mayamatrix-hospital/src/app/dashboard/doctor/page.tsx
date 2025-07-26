// doctor dashboard page
"use client";
import { useAuthContext } from "@/components/templates/providers";
import React from "react";

function DoctorDashboard() {
  const { roles } = useAuthContext();
  console.log("roles", roles);
  if (!roles || !roles?.includes("doctor")) {
    return (
      <div className="flex-1 h-full w-full flex justify-center items-center">
        <p>Unauthorized</p>
      </div>
    );
  }
  return <div>This is doctor dashboard</div>;
}

export default DoctorDashboard;
