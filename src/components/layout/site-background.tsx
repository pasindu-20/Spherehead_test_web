import { cn } from "@/lib/utils";

type SiteBackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SiteBackground({
  children,
  className,
}: SiteBackgroundProps) {
  return (
    <div className={cn("site-background-root", className)}>
      <div aria-hidden="true" className="site-background-fixed" />
      <div className="site-background-content">{children}</div>
    </div>
  );
}