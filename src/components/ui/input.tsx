import * as React from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const check = type === "search" || type === "phone";
    return (
      <div className={`${check && "w-96"}  relative`}>
        <input
          type={check ? "text" : type}
          className={cn(
            `flex h-9 ${
              check ? "py-5 rounded-full" : "py-1 rounded-md"
            } w-full border border-input bg-transparent ${
              type === "phone" ? "ps-12" : "px-3"
            } text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "search" && (
          <div className="absolute right-2 top-1 rounded-full bg-[#9C0A35] p-1">
            <SearchIcon color="white" />
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
