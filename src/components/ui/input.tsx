import * as React from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const check =
      type === "search" ||
      type === "phone" ||
      type === "date" ||
      type === "time";

    // Add phone number formatting logic
    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "phone") {
        let value = e.target.value;

        // Remove all formatting first
        value = value.replace(/\D/g, "");

        // Remove the prefix if exists
        value = value.replace(/^998/, "");

        // Limit to 9 digits (excluding country code)
        value = value.slice(0, 9);

        // Format the number with parentheses
        if (value) {
          if (value.length <= 2) {
            value = `+998 (${value}`;
          } else {
            value = `+998 (${value.slice(0, 2)}) ${value.slice(2)}`;
          }
        }

        // Always maintain the prefix and opening parenthesis
        if (!value || value.length < 6) {
          value = "+998 (";
        }

        e.target.value = value;
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === "phone") {
        // Prevent backspace from deleting the prefix and parenthesis
        if (e.key === "Backspace" && e.currentTarget.value.length <= 6) {
          e.preventDefault();
        }
      }
    };

    return (
      <div className={`${check && ""} relative`}>
        <input
          type={
            check
              ? type === "date"
                ? "date"
                : type === "time"
                ? "time"
                : "text"
              : type
          }
          className={cn(
            `flex h-9 ${
              check ? "py-5 rounded-full" : "py-1 rounded-md"
            } w-full border border-input bg-transparent ${
              type === "phone" || type === "date" || type === "time"
                ? "ps-12"
                : "px-3"
            } text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
            className
          )}
          ref={ref}
          onInput={type === "phone" ? handlePhoneInput : undefined}
          onKeyDown={type === "phone" ? handleKeyDown : undefined}
          defaultValue={type === "phone" ? "+998 (" : undefined}
          {...props}
        />
        {type === "search" && (
          <div className="absolute right-2 top-1 flex items-center justify-center h-8 w-8 rounded-full bg-[#9C0B35]">
            <SearchIcon className="text-white" />
          </div>
        )}
        {type === "time" && (
          <div></div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
