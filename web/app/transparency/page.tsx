import type { Metadata } from "next";
import { Button } from "@/components/button";
import { models } from "@/lib/project";

export const metadata: Metadata = {
  title: "Open weights, hidden values — Republic Assay",
  description:
    "An exposition on open-weight AI transparency: why models the public cannot inspect are a threat to the republic.",
};

// Facts derived from the same data the observatory tracks — never invented.
const total = models.length;
const undisclosed = models.filter((m) => m.data === "Undisclosed").length;
const foreign = models.filter((m) => m.origin !== "United States").length;

// Each threat is tied to the republican value it erodes.
const threats = [
  {
    n: "01",
    value: "Free expression",
    title: "Censorship you can't see.",
    body: "A model can be trained to soften, skip, or slant whole subjects. If the weights are all you have, the bias is invisible — it just feels like the answer.",
  },
  {
    n: "02",
    value: "Self-government",
    title: "Values shaped elsewhere.",
    body: "Most of the world's leading open models are trained under other systems of government. Their priorities arrive pre-installed, and they don't announce themselves.",
  },
  {
    n: "03",
    value: "Security",
    title: "Behavior that hides until it's triggered.",
    body: "A model can pass every public test and still carry a conditioned response waiting for the right prompt. Without the weights-level view, you cannot rule it out.",
  },
  {
    n: "04",
    value: "Accountability",
    title: "No one can be held to account.",
    body: "When an opaque model shapes a benefits decision or a filing, there is no record of why. The chain of accountability a republic runs on simply breaks.",
  },
];

export default function Transparency() {
  return (
    <>
      {/* Reading-progress bar. */}
      <div className="fixed inset-x-0 top-0 z-20 h-1">
        <div className="scroll-progress h-full w-full bg-gold" />
      </div>

      <Header />

      <main>
        {/* ACT ONE — the setup, on warm paper. */}
        <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-32">
          <p className="eyebrow mb-8 reveal">An exposition</p>
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl reveal">
            You can hold
            <br />
            the weights.
            <br />
            <span className="text-gold-deep">You can&apos;t see</span>
            <br />
            <span className="text-gold-deep">the values.</span>
          </h1>
          <p className="mt-12 max-w-xl text-lg leading-relaxed text-muted reveal">
            &ldquo;Open-weight&rdquo; sounds like open. It isn&apos;t. You get the
            numbers a model runs on — not the choices that made it, and not the
            values buried inside. Scroll.
          </p>
        </section>

        {/* What you get vs. what stays sealed. */}
        <section className="mx-auto max-w-5xl px-6 py-32">
          <p className="eyebrow mb-10 reveal">What &ldquo;open&rdquo; actually means</p>
          <div className="grid gap-16 md:grid-cols-2">
            <div className="reveal">
              <h2 className="font-display text-4xl sm:text-5xl">What you get</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                The weights — billions of numbers you can download and run on
                your own machines. Genuinely useful. Genuinely open.
              </p>
            </div>
            <div className="reveal">
              <h2 className="font-display text-4xl sm:text-5xl text-gold-deep">
                What stays sealed
              </h2>
              <ul className="mt-5 space-y-3 text-lg leading-relaxed text-muted">
                <li>The training data — what it learned from.</li>
                <li>The alignment choices — what it was told to prefer.</li>
                <li>The values — what it will quietly push.</li>
                <li>The intent — who shaped it, and toward what.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Stat band — real numbers from the observatory. */}
        <section className="border-y border-line bg-white/40">
          <div className="mx-auto max-w-5xl px-6 py-32">
            <p className="eyebrow mb-12 reveal">The gap, in the models we tracked</p>
            <div className="grid gap-14 sm:grid-cols-2">
              <Stat value={`${total - undisclosed} / ${total}`} label="disclose their training data — not one of them." />
              <Stat value={`${foreign} / ${total}`} label="are trained outside the United States, under other systems of government." />
            </div>
            <p className="mt-14 max-w-xl leading-relaxed text-muted reveal">
              These are the most-run open-weight models in the world. The public
              institutions adopting them cannot see what is inside — because no
              one has been asked to look.
            </p>
          </div>
        </section>

        {/* ACT TWO — the threat, in the dark. */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-5xl px-6 py-40">
            <p className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-gold reveal">
              The threat
            </p>
            <h2 className="font-display text-5xl sm:text-7xl max-w-3xl reveal">
              What you can&apos;t inspect, you can&apos;t hold to account.
            </h2>

            <div className="mt-24 space-y-24">
              {threats.map((t) => (
                <div key={t.n} className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-12 reveal">
                  <div className="font-mono text-sm text-gold">
                    {t.n}
                    <div className="mt-2 uppercase tracking-[0.2em] text-paper/40">
                      {t.value}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-4xl sm:text-5xl">{t.title}</h3>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/70">
                      {t.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-32 max-w-3xl font-display text-4xl sm:text-6xl reveal">
              A republic runs on institutions its citizens can see into. Place a
              model no one can inspect inside those institutions, and the chain
              of accountability quietly breaks.
            </p>
          </div>
        </section>

        {/* ACT THREE — the remedy, back on paper. */}
        <section className="mx-auto max-w-5xl px-6 py-40">
          <p className="eyebrow mb-10 reveal">The remedy</p>
          <h2 className="font-display text-5xl sm:text-7xl max-w-3xl reveal">
            Transparency isn&apos;t a courtesy. It&apos;s the safeguard.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted reveal">
            The answer is not to ban open models — it is to measure them in the
            open. Publish what they value. Show the method. Let anyone contest
            the result. That is exactly what Republic Assay is built to do.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 reveal">
            <Button href="/#observatory">See the observatory</Button>
            <Button href="/#mcp" variant="outline">
              Query the open server
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="reveal">
      <div className="font-display text-7xl sm:text-8xl text-gold-deep">{value}</div>
      <p className="mt-4 max-w-sm leading-relaxed text-muted">{label}</p>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a href="/" className="font-display text-2xl">
          Republic Assay
        </a>
        <a href="/#observatory" className="text-sm text-muted hover:text-ink">
          Observatory
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-muted sm:flex-row sm:justify-between">
        <a href="/" className="font-display text-lg text-ink">
          Republic Assay
        </a>
        <span>An open observatory for the values inside AI.</span>
      </div>
    </footer>
  );
}
