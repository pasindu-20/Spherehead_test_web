import Link from "next/link";
import WhiteLargeRightArrow from "@/components/ui/white-large-right-arrow";

export default function ConsultationCTA() {
  return (
    <Link
      href="/contact-us"
      className="group inline-flex items-center gap-4 text-white  "
    >
      <WhiteLargeRightArrow hover />

      <span className="body-large text-white inline-block whitespace-nowrap">
        Get a Free Consultation
      </span>
    </Link>
  );
}