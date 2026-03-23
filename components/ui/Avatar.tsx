import Image from "next/image";
import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const imageSizes = { sm: 32, md: 40, lg: 48 };

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={imageSizes[size]}
        height={imageSizes[size]}
        className={cn("rounded-full object-cover", sizes[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-brand-100 text-brand-700 font-semibold flex items-center justify-center",
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
