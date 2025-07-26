"use server";

import { prisma } from "@/lib/prisma";

export async function getAppointments() {
  try {
    const users = await prisma.user.findMany();
    return { success: true, data: users };
  } catch (error) {
    console.error("Prisma error:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}
