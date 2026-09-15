import { Preloader } from "@/components/Preloader";
import { ScrollBall } from "@/components/ScrollBall";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Research } from "@/components/sections/Research";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <div
        aria-hidden="true"
        className="backdrop-grid pointer-events-none fixed inset-0 -z-10"
      />
      <Preloader />
      <ScrollBall />
      <Nav />
      <main>
        <Hero />
        <About />
        <Research />
        <Projects />
        <Experience />
        <Footer />
      </main>
    </>
  );
}
