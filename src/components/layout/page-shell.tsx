import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageShell({ children, className }: PageShellProps) {
  return (
    <div
      className={cn(
        "relative isolate min-h-screen overflow-hidden bg-[#06142E] text-white",
        className
      )}
    >
      {/* Visible gradient layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute left-[-12%] top-0 h-full w-[125%]"
          style={{
            background:
              "linear-gradient(90deg, #06142E 10%, #0A2F76 45%, #184AA3 65%, #2666D2 90%, #A6C4FA 100%)",
          }}
        />
      </div>

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}