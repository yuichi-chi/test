import { About } from "@/components/About";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WorkList } from "@/components/WorkList";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WorkList />
        <About />
      </main>
    </>
  );
}
