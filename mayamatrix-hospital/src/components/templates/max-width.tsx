import { cn } from "@/lib/utils";
import React from "react";

function MaxWidth({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto px-2 sm:px-4 md:px-8 w-full ",
        className
      )}
    >
      {children}
    </div>
  );
}

export default MaxWidth;
