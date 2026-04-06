import { ArrowRight } from "lucide-react";

export default function WhiteLargeRightArrow({
  className = "",
  size = "h-14 w-14",
  iconSize = "h-6 w-6",
  iconColor = "text-[#2666D2]",
  hover = false,
}) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center transition-transform duration-300",
        hover ? "group-hover:translate-x-1" : "",
        className,
      ].join(" ")}
    >
      <span
        className={[
          "grid place-items-center bg-white shadow-[0_12px_30px_rgba(0,0,0,0.2)] scale-[0.95]",
          size,
        ].join(" ")}
        style={{
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          animation: "spinClockwise 15s linear infinite",
        }}
      >
        <span
          className={["inline-flex", iconColor].join(" ")}
          style={{
            animation: "spinCounterClockwise 15s linear infinite",
          }}
        >
          <ArrowRight className={iconSize} strokeWidth={2.8} />
        </span>
      </span>
    </span>
  );
}