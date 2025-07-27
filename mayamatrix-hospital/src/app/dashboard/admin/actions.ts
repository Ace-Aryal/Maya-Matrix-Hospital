"use server";

// server actions for admin dashboard crud operations
// invoked from client components using react query
import { prisma } from "@/lib/prisma";
import { userSchema, UserSchema } from "@/lib/validators";
export async function getAppointments() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return { success: true, data: users };
  } catch (error) {
    console.error("Prisma error:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}
export async function addAppointment(userData: UserSchema) {
  const validation = userSchema.safeParse(userData);
  if (!validation.success) {
    throw new Error("Invalid shape of data");
  }
  const {
    fullName,
    address,
    appointmentTime,
    doctorAssigned,
    email,
    gender,
    phoneNumber,
    role,
  } = userData;
  const res = await prisma.user.create({
    data: {
      name: fullName,
      address,
      appointmentTime,
      doctorAssigned,
      email,
      gender,
      phoneNumber,
      role,
    },
  });
  if (!res.id) {
    throw new Error("User creation failed ");
  }
  return res;
}

export async function updateAppointment(userData: UserSchema, id: string) {
  const validation = userSchema.safeParse(userData);
  if (!validation.success) {
    throw new Error("Invalid shape of data");
  }
  const {
    fullName,
    address,
    appointmentTime,
    doctorAssigned,
    email,
    gender,
    phoneNumber,
    role,
  } = userData;
  const res = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: fullName,
      address,
      appointmentTime,
      doctorAssigned,
      email,
      gender,
      phoneNumber,
      role,
    },
  });
  if (!res.id) {
    throw new Error("User creation failed ");
  }
  return res;
}

export async function deleteAppointment(id: string) {
  if (!id) {
    throw new Error("Bad request");
  }
  const res = await prisma.user.delete({
    where: {
      id,
    },
  });
  return res;
}
