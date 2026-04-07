import WhiteLargeRightArrow from "@/components/ui/white-large-right-arrow";

type AboutUsButtonProps = {
    className?: string;
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset";
};

export default function AboutUsButton({
    className = "",
    children = "About US",
    type = "button",
}: AboutUsButtonProps) {
    return (
        <button
            type={type}
            className={[
                "group relative inline-flex h-[68px] w-[194px] items-center justify-center overflow-hidden rounded-[8px]",
                "transition-all duration-400 ease-out hover:w-[230px]",
                className,
            ].join(" ")}
            style={{
                background:
                    "linear-gradient(90deg, #06142E 0%, #0A2F76 1%, #184AA3 65%, #2666D2 99%, #A6C4FA 100%)",
            }}
        >
            <span className="body-medium relative z-[2] whitespace-nowrap text-white transition-transform duration-400 ease-out group-hover:translate-x-[30px]">
                {children}
            </span>

            <span className="absolute left-0 top-1/2 z-[1] -translate-y-1/2 -translate-x-[120%] opacity-0 transition-all duration-400 ease-out group-hover:translate-x-10 group-hover:opacity-100">
                <WhiteLargeRightArrow
                    size="h-8 w-8"
                    iconSize="h-3.5 w-3.5"
                    className="scale-[1.42]"
                />
            </span>
        </button>
    );
}