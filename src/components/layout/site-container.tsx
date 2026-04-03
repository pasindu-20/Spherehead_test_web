import { cn } from "@/lib/utils";

type SiteContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SiteContainer({
  children,
  className,
}: SiteContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20",
        className
      )}
    >
      {children}
    </div>
  );
}