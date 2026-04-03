import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ConsultationCTA() {
  return (
    <Link
      href="/contact-us"
      className="group inline-flex items-center gap-4 text-white"
    >
      {/* <span
        className="grid h-14 w-14 place-items-center bg-white text-[#2666D2] shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:translate-x-1"
        style={{
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }}
      >
        <ArrowRight className="h-6 w-6" strokeWidth={2.8} />
      </span>

      <span className="text-[clamp(1.2rem,1.8vw,2rem)] font-light leading-none tracking-[-0.02em]">
        Get a Free Consultation
      </span> */}
    </Link>
  );
}