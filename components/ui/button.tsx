import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-accent text-white shadow-glow hover:bg-accent-dark border border-accent",
  secondary:
    "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10",
  ghost: "text-white/80 hover:text-white"
};

export function Button({ href, children, variant = "primary" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
