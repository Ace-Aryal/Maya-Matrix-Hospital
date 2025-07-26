// based on the action this component performs either updation or creation of appointment
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
type UserDialogProps = {
  TriggerButton: React.JSX.Element;
  title: string;
};
export function UserDialog({ TriggerButton, title }: UserDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{TriggerButton}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl w-fit sm:min-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="w-full overflow-y-scroll"></div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
