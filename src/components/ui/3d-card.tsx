"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export const CardContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { containerClassName?: string }
>(({ className, containerClassName, ...props }, ref) => (
  <div
    className={cn(
      "relative flex flex-col items-center justify-center",
      containerClassName
    )}
  >
    <div
      ref={ref}
      className={cn(
        "transition-transform duration-300 ease-in-out will-change-transform",
        className
      )}
      {...props}
    />
  </div>
));
CardContainer.displayName = "CardContainer";

export const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex flex-col items-center justify-center w-full h-full",
      className
    )}
    {...props}
  />
));
CardBody.displayName = "CardBody";

export const CardItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex flex-col items-center justify-center w-full h-full",
      className
    )}
    {...props}
  />
));
CardItem.displayName = "CardItem";
