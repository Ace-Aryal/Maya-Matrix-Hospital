// based on the action this component performs either updation or creation of appointment
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
type UserDialogProps = {
  TriggerButton: React.JSX.Element;
  title: string;
  action: "add" | "update";
};
import { DOCTORS } from "@/lib/doctors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Loader2 } from "lucide-react";
import "react-clock/dist/Clock.css";
import { addAppointment } from "@/app/dashboard/admin/actions";
import { userSchema, UserSchema } from "@/lib/validators";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAuthContext } from "../templates/providers";
import { useRouter } from "next/navigation";
// zod validatiion schema

export function UserDialog({ TriggerButton, title, action }: UserDialogProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });
  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: async (formData: UserSchema) => {
      if (action === "add") {
        const res = await addAppointment(formData);
        return res;
      }
    },
    onSuccess: async () => {
      toast.success("Record added sucessfully");
      await queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === "get-appointments",
      });
      reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error adding record");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{TriggerButton}</div>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className=" min-w-xs overflow-auto max-h-[80vh] sm:max-h-[90vh]  sm:max-w-2xl w-fit sm:min-w-md "
      >
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <form
            className="space-y-6 "
            onSubmit={handleSubmit((formData) => {
              onSubmit(formData);
            })}
          >
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" {...register("fullName")} />
                {errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone</Label>
              <Input
                id="phoneNumber"
                type="text"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="text" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Appointment Date & Time */}
            <div className="space-y-2 ">
              <Label htmlFor="appointmentTime">Date & Time</Label>
              <Controller
                name="appointmentTime"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    calendarIcon={<Calendar />}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />

              {errors.appointmentTime && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.appointmentTime.message}
                </p>
              )}
            </div>

            {/* Assigned Doctor */}
            <div className="space-y-2">
              <Label htmlFor="doctorAssigned">Assigned Doctor</Label>
              <Controller
                control={control}
                name="doctorAssigned"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="doctorAssigned">
                      <SelectValue placeholder="Choose a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {DOCTORS.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.doctorAssigned && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.doctorAssigned.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" rows={3} {...register("address")} />
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            <DialogFooter className="">
              <DialogClose>
                <div>
                  <Button className="w-full" variant={"modern"}>
                    Close
                  </Button>
                </div>
              </DialogClose>
              <Button className="w-full sm:w-32" type="submit">
                {isPending || isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : action === "add" ? (
                  "Add Record"
                ) : (
                  "Update Record"
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
