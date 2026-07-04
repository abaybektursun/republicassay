import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
};

const styles = {
  solid: "bg-ink text-paper hover:bg-gold-deep",
  outline: "border border-line text-ink hover:border-ink",
};

export function Button({ href, children, variant = "solid" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-colors ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
