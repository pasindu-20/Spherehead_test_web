import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import BlueLargeRightArrow from "@/components/ui/blue-large-right-arrow";

const testimonials = [
    {
        role: "CEO Clara Agencies",
        name: "Eduardo Joffroy",
        image: "/images/testimonials/Eduardo_joffory.svg",
        quote: `It’s rare to find companies that
share our philosophy of making
things happen.
Our Operations runs smoothly
than ever before.`,
    },
    {
        role: "CEO Clara Agencies",
        name: "Alice Carlton",
        image: "/images/testimonials/Eduardo_joffory.svg",
        quote: `It’s rare to find companies that
share our philosophy of making
things happen.
Our Operations runs smoothly
than ever before.`,
    },
    {
        role: "CTO Clara Agencies",
        name: "Stephen Hanah",
        image: "/images/testimonials/Eduardo_joffory.svg",
        quote: `It’s rare to find companies that
share our philosophy of making
things happen.
Our Operations runs smoothly
than ever before.`,
    },
    {
        role: "CEO Clara Agencies",
        name: "Alice Carlton",
        image: "/images/testimonials/Eduardo_joffory.svg",
        quote: `It’s rare to find companies that
share our philosophy of making
things happen.
Our Operations runs smoothly
than ever before.`,
    },
];

const imageVariants = {
    enter: {
        x: 50,
        opacity: 0,
    },
    center: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: -50,
        opacity: 0,
    },
};

const SIDE_CARD_COUNT = 4;
const SIDE_CARD_WIDTH = 64;
const SIDE_CARD_GAP = 12;
const SIDE_CARD_STEP = SIDE_CARD_WIDTH + SIDE_CARD_GAP;
const SIDE_CONTAINER_WIDTH =
    SIDE_CARD_COUNT * SIDE_CARD_WIDTH + (SIDE_CARD_COUNT - 1) * SIDE_CARD_GAP;

const EXPAND_DURATION = 460;
const SHIFT_DURATION = 420;
const SHIFT_STAGGER = 90;
const EXPANDED_SCALE = 4.15;

export default function TestimonialSection() {
    const uidRef = useRef(0);
    const expandTimeoutRef = useRef<number | null>(null);
    const settleTimeoutRef = useRef<number | null>(null);

    const buildSideStack = (startIndex: number) =>
        Array.from({ length: SIDE_CARD_COUNT }, (_, index) => ({
            uid: uidRef.current++,
            testimonialIndex: (startIndex + index + 1) % testimonials.length,
        }));

    const [activeIndex, setActiveIndex] = useState(0);
    const [sideStack, setSideStack] = useState(() => buildSideStack(0));
    const [phase, setPhase] = useState<"idle" | "expanding" | "shifting">("idle");
    const [movingItem, setMovingItem] = useState<{
        uid: number;
        testimonialIndex: number;
    } | null>(null);
    const [incomingUid, setIncomingUid] = useState<number | null>(null);

    const activeCard = testimonials[activeIndex];

    useEffect(() => {
        return () => {
            if (expandTimeoutRef.current) {
                window.clearTimeout(expandTimeoutRef.current);
            }
            if (settleTimeoutRef.current) {
                window.clearTimeout(settleTimeoutRef.current);
            }
        };
    }, []);

    const handlePrev = () => {
        if (phase !== "idle") return;

        const prevIndex =
            activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;

        setActiveIndex(prevIndex);
        setSideStack(buildSideStack(prevIndex));
        setMovingItem(null);
        setIncomingUid(null);
        setPhase("idle");
    };

    const handleNext = () => {
        if (phase !== "idle" || sideStack.length === 0) return;

        const leadItem = sideStack[0];

        setMovingItem(leadItem);
        setPhase("expanding");

        expandTimeoutRef.current = window.setTimeout(() => {
            const nextTailItem = {
                uid: uidRef.current++,
                testimonialIndex:
                    (leadItem.testimonialIndex + SIDE_CARD_COUNT) %
                    testimonials.length,
            };

            setActiveIndex(leadItem.testimonialIndex);
            setIncomingUid(nextTailItem.uid);
            setSideStack((prev) => [...prev.slice(1), nextTailItem]);
            setPhase("shifting");

            settleTimeoutRef.current = window.setTimeout(() => {
                setPhase("idle");
                setMovingItem(null);
                setIncomingUid(null);
            }, SHIFT_DURATION + SHIFT_STAGGER * (SIDE_CARD_COUNT - 1) + 80);
        }, EXPAND_DURATION);
    };

    return (
        <section className="w-full -mt-28 pt-20 pb-10 lg:-mt-32 lg:pt-0 lg:pb-16">
            <div className="mb-5 flex items-center gap-5">
                <BlueLargeRightArrow
                    size="h-[40px] w-[40px]"
                    iconSize="h-6 w-6"
                />
                <p className="inter-tight text-[#01030B]">Testimonials</p>
            </div>

            <div className="w-full flex justify-start">
                <h2 className="heading-2 !text-[#01030B] block w-full max-w-[980px] text-left">
                    Building Lasting Relationships
                    <br />
                    Through Results Our Clients Value
                </h2>
            </div>

            <div className="mt-14 flex flex-col gap-10 lg:mt-16 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8 lg:shrink-0">
                    <div className="relative w-full max-w-[248px] shrink-0">
                        <div className="relative h-[330px] overflow-hidden bg-[#ECECEC]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    variants={imageVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.45, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={activeCard.image}
                                        alt={activeCard.name}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute right-0 top-0 z-10 flex h-[40px] w-[40px] items-center justify-center bg-[#2666D2] text-[28px] leading-none text-white">
                                ”
                            </div>
                        </div>

                        <div className="flex h-[70px] items-center justify-between bg-white px-7">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="text-[34px] font-light leading-none text-[#01030B]"
                                aria-label="Previous testimonial"
                            >
                                ‹
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="text-[34px] font-light leading-none text-[#01030B]"
                                aria-label="Next testimonial"
                            >
                                ›
                            </button>
                        </div>
                    </div>

                    <div className="flex w-full flex-col justify-between pt-2 text-left lg:w-[330px] lg:min-h-[330px] lg:shrink-0">
                        <p className="inter-tight w-full !text-[#01030B] !leading-[1.4] whitespace-pre-line">
                            {activeCard.quote}
                        </p>

                        <div className="relative">
                            <div className="absolute top-[-120px] left-0">
                                <h3
                                    className="whitespace-nowrap text-[22px] font-[500] leading-[1.2] text-[#01030B]"
                                    style={{
                                        fontFamily:
                                            "var(--font-archivo), Arial, Helvetica, sans-serif",
                                    }}
                                >
                                    {activeCard.name}
                                </h3>

                                <p className="inter-tight mt-1 whitespace-nowrap !text-[#01030B]">
                                    {activeCard.role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="relative hidden lg:block"
                    style={{
                        width: `${SIDE_CONTAINER_WIDTH}px`,
                        height: "385px",
                    }}
                >
                    {sideStack.map((item, index) => {
                        const card = testimonials[item.testimonialIndex];
                        const isLeadCard =
                            phase === "expanding" && movingItem?.uid === item.uid;
                        const isIncoming = incomingUid === item.uid;

                        return (
                            <motion.div
                                key={item.uid}
                                initial={
                                    isIncoming
                                        ? {
                                              x: SIDE_CARD_COUNT * SIDE_CARD_STEP,
                                              opacity: 0,
                                          }
                                        : false
                                }
                                animate={{
                                    x: index * SIDE_CARD_STEP,
                                    opacity: isLeadCard ? 0 : 1,
                                }}
                                transition={
                                    phase === "shifting"
                                        ? {
                                              duration: SHIFT_DURATION / 1000,
                                              delay: index * (SHIFT_STAGGER / 1000),
                                              ease: [0.22, 1, 0.36, 1],
                                          }
                                        : {
                                              duration: 0.2,
                                              ease: "easeOut",
                                          }
                                }
                                className="absolute top-0 h-[385px] w-[64px] shrink-0 rounded-[4px] bg-[#F2F2F2]"
                            >
                                <span className="absolute top-4 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[12px] text-[#818181]">
                                    {card.role}
                                </span>

                                <span
                                    className="absolute bottom-6 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[18px] leading-none text-[#0A0D0F]"
                                    style={{
                                        fontFamily:
                                            "var(--font-archivo), Arial, Helvetica, sans-serif",
                                    }}
                                >
                                    {card.name}
                                </span>
                            </motion.div>
                        );
                    })}

                    {phase === "expanding" && movingItem && (
                        <motion.div
                            initial={{ scaleX: 1, opacity: 1 }}
                            animate={{ scaleX: EXPANDED_SCALE, opacity: 1 }}
                            transition={{
                                duration: EXPAND_DURATION / 1000,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{ transformOrigin: "right center" }}
                            className="absolute top-0 left-0 z-20 h-[385px] w-[64px] rounded-[4px] bg-[#F2F2F2] shadow-[0_14px_40px_rgba(0,0,0,0.08)]"
                        >
                            <span className="absolute top-4 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[12px] text-[#818181]">
                                {testimonials[movingItem.testimonialIndex].role}
                            </span>

                            <span
                                className="absolute bottom-6 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[18px] leading-none text-[#0A0D0F]"
                                style={{
                                    fontFamily:
                                        "var(--font-archivo), Arial, Helvetica, sans-serif",
                                }}
                            >
                                {testimonials[movingItem.testimonialIndex].name}
                            </span>
                        </motion.div>
                    )}
                </div>

                <div className="flex gap-2 lg:hidden">
                    {sideStack.map((item) => {
                        const card = testimonials[item.testimonialIndex];

                        return (
                            <div
                                key={item.uid}
                                className="relative h-[360px] w-[62px] shrink-0 rounded-[4px] bg-[#F2F2F2]"
                            >
                                <span className="absolute top-4 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[12px] text-[#818181]">
                                    {card.role}
                                </span>

                                <span
                                    className="absolute bottom-6 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[18px] leading-none text-[#0A0D0F]"
                                    style={{
                                        fontFamily:
                                            "var(--font-archivo), Arial, Helvetica, sans-serif",
                                    }}
                                >
                                    {card.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}