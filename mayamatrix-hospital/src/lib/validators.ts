import { Gender, Roles } from "@/generated/prisma";
import z from "zod";

export const userSchema = z.object({
  fullName: z.string().min(3, "Enter valid name"),
  gender: z.enum(Gender, "Select valid input"),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  role: z.enum(Roles, "Select valid option"),
  appointmentTime: z.date("Invalid Date"),
  phoneNumber: z
    .string()
    .regex(/^(?:98|97)\d{8}$|^0\d{1,2}\d{6,7}$/, "Enter vaild phone number"),
  doctorAssigned: z.string("Select valid input"),
  address: z.string().min(5, "Enter valid address"),
});
export type UserSchema = z.infer<typeof userSchema>;
