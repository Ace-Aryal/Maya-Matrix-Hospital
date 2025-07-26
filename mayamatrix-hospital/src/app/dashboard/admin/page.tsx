"use client";
import MaxWidth from "@/components/templates/max-width";
import { useAuthContext } from "@/components/templates/providers";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React from "react";
import { getAppointments } from "./actions";
import { toast } from "sonner";

function AdminDashboard() {
  const { roles } = useAuthContext();
  const isAdmin = roles?.includes("admin");
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["get-appointments", isAdmin],
    queryFn: async () => {
      try {
        if (!isAdmin) {
          return;
        }
        const res = await getAppointments();
        if (!res.success) {
          throw new Error(res.error);
        }
        console.log(res, "res");
        return res;
      } catch (error) {
        console.error(error);
        const errorMessage =
          error instanceof Error ? error.message : "Internal server error";
        toast.error(errorMessage);
        return null;
      }
    },
  });
  if (!isAdmin) {
    return (
      <div className="flex-1 h-full w-full flex justify-center">
        <p>Unauthorized</p>
      </div>
    );
  }
  return (
    <MaxWidth>
      <section
        id="top"
        className="flex max-w-6xl mx-auto px-4  flex-col sm:flex-row sm:items-center justify-between mt-6 sm:mt-12"
      >
        <h1 className="text-7xl font-semibold  ">Welcome Admin</h1>
        <Button
          variant={"modern"}
          className="w-fit my-6 sm:my-0 py-5  flex items-center text-md"
        >
          Add New Appointment <Plus className="w-6 h-6" />
        </Button>
      </section>
      <section id="bottom"></section>
    </MaxWidth>
  );
}

export default AdminDashboard;
