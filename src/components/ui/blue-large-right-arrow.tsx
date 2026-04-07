import { ArrowRight } from "lucide-react";

type BlueLargeRightArrowProps = {
  className?: string;
  size?: string;
  iconSize?: string;
  iconColor?: string;
  hover?: boolean;
};

export default function BlueLargeRightArrow({
  className = "",
  size = "h-12 w-12",
  iconSize = "h-5 w-5",
  iconColor = "text-white",
  hover = false,
}: BlueLargeRightArrowProps) {
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
          "grid place-items-center bg-[#2666D2] shadow-[0_10px_24px_rgba(38,102,210,0.28)]",
          size,
        ].join(" ")}
        style={{
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          animation: "spinClockwise 15s linear infinite",
          scale: 0.85,
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