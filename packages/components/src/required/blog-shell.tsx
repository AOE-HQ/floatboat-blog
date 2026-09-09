import { cn } from "../utils";

/**
 * Outer page shell. Spans the same max-w-[1440px] band as the site
 * header/footer (px matches the header chrome); inner sections opt into a
 * narrower reading column (e.g. max-w-[720px]) as needed.
 */
export function BlogShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-10", className)}>
      {children}
    </div>
  );
}
