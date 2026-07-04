import { Button } from "@/components/button";
import { Section } from "@/components/section";

const pillars = [
  {
    title: "Clear",
    body: "Plain language, no jargon. Every service explains what it does and who it is for.",
  },
  {
    title: "Open",
    body: "Built in the open, source available. What the government ships, the public can read.",
  },
  {
    title: "Fast",
    body: "Pages load instantly and work on any device, on any connection, anywhere.",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero — the signature giant serif headline on warm paper. */}
        <Section className="pt-28 pb-20">
          <p className="eyebrow mb-8">A modern civic platform</p>
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl max-w-4xl">
            Public services,
            <br />
            <span className="text-gold-deep">built for the people.</span>
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted">
            Republic brings the country&apos;s essential services into one
            clear, trustworthy place — designed to be understood at a glance.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#services">Explore services</Button>
            <Button href="#about" variant="outline">
              Learn more
            </Button>
          </div>
        </Section>

        {/* Three pillars. */}
        <div className="border-y border-line bg-white/40">
          <Section eyebrow="Why it works" id="about">
            <div className="grid gap-12 sm:grid-cols-3">
              {pillars.map((p) => (
                <div key={p.title}>
                  <h3 className="font-display text-4xl">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Closing call to action. */}
        <Section eyebrow="Get started" id="services" className="text-center">
          <h2 className="font-display text-5xl sm:text-7xl max-w-3xl mx-auto">
            One republic. Every service.
          </h2>
          <div className="mt-10">
            <Button href="#">Find a service</Button>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <span className="font-display text-2xl">Republic</span>
        <nav className="flex gap-8 text-sm text-muted">
          <a href="#about" className="hover:text-ink">
            About
          </a>
          <a href="#services" className="hover:text-ink">
            Services
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-muted sm:flex-row sm:justify-between">
        <span className="font-display text-lg text-ink">Republic</span>
        <span>An open civic platform.</span>
      </div>
    </footer>
  );
}
