import Head from "next/head";
import HeroSection from "@/components/landing/hero-section";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Spherehead Technologies</title>
        <meta
          name="description"
          content="Smart technology operations for smoother and hassle-free operations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <HeroSection />
      </section>

    </>
  );
}