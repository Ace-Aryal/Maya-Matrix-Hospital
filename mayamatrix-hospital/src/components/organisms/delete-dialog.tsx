// resuable dialog component for deletion
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteAppointment } from "@/app/dashboard/admin/actions";
import { toast } from "sonner";
import { useAuthContext } from "../templates/providers";

// zod validatiion schema

export function DeleteDialog({
  TriggerButton,
  id,
}: {
  TriggerButton: React.ReactElement;
  id: string;
}) {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLButtonElement | null>(null);
  const { roles } = useAuthContext();
  const isAdmin = roles?.includes("admin");
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!isAdmin) {
        throw new Error("Unauthorized");
      }
      await deleteAppointment(id);
    },
    onSuccess: async () => {
      ref.current?.click();

      await queryClient.invalidateQueries({
        queryKey: ["get-appointments"],
        refetchType: "all",
      });
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
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className=" min-w-xs overflow-auto max-h-[80vh] sm:max-h-[90vh]  sm:max-w-2xl w-fit sm:min-w-md "
      >
        <DialogHeader>
          <DialogTitle className="text-xl">
            Sure want to delete this item ?
          </DialogTitle>
          <DialogDescription>
            This action is irreversible and cannot be recovered!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="w-full" asChild>
            <Button
              ref={ref}
              type="button"
              className="bg-red-100 text-red-600 hover:bg-red-200 w-full sm:w-32"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={() => mutate()}
            disabled={isPending}
            variant={"destructive"}
            className="w-full sm:w-32"
            type="submit"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Delete Record"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
