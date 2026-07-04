import type { Metadata } from "next";
import { Button } from "@/components/button";
import { ProbeDemo } from "@/components/probe-demo";
import { ThreatExplorer, type Threat } from "@/components/threat-explorer";
import { models } from "@/lib/project";

export const metadata: Metadata = {
  title: "The case for open weights — Republic Assay",
  description:
    "Closed AI is a black box. Open weights we can probe — and that is exactly why they must be probed, before they run the republic unexamined.",
};

// Facts derived from the same data the observatory tracks — never invented.
const total = models.length;
const undisclosed = models.filter((m) => m.data === "Undisclosed").length;
const foreign = models.filter((m) => m.origin !== "United States").length;

// Each threat is tied to the republican value it erodes.
const threats: Threat[] = [
  {
    n: "01",
    value: "Free expression",
    title: "Censorship you can't see.",
    body: "A model can be trained to soften, skip, or slant whole subjects. If no one probes it, the bias is invisible — it just feels like the answer.",
  },
  {
    n: "02",
    value: "Self-government",
    title: "Values shaped elsewhere.",
    body: "Many of the world's leading open models are trained under other systems of government. Their priorities arrive pre-installed, and they don't announce themselves.",
  },
  {
    n: "03",
    value: "Security",
    title: "Behavior that hides until it's triggered.",
    body: "A model can pass every public test and still carry a conditioned response waiting for the right prompt. Only a weights-level probe can rule it out.",
  },
  {
    n: "04",
    value: "Accountability",
    title: "No one can be held to account.",
    body: "When an unexamined model shapes a benefits decision or a filing, there is no record of why. The chain of accountability a republic runs on simply breaks.",
  },
];

export default function Transparency() {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-20 h-1">
        <div className="scroll-progress h-full w-full bg-gold" />
      </div>

      <Header />

      <main>
        {/* HERO — the thesis: closed is sealed, open can be probed. */}
        <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-32">
          <p className="eyebrow mb-8 reveal">An exposition</p>
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl reveal">
            Closed AI is a
            <br />
            black box.
            <br />
            <span className="text-gold-deep">Open weights,</span>
            <br />
            <span className="text-gold-deep">we can probe.</span>
          </h1>
          <p className="mt-12 max-w-xl text-lg leading-relaxed text-muted reveal">
            Before we worry about what hides inside open models, start with the
            alternative: closed models you can never open at all. Open weights
            are the only ones we are even allowed to look inside. Scroll.
          </p>
        </section>

        {/* PART ONE — the case for open weights (interactive). */}
        <section className="mx-auto max-w-5xl px-6 py-32">
          <p className="eyebrow mb-8 reveal">Part one · The case for open weights</p>
          <h2 className="font-display text-5xl sm:text-7xl max-w-3xl reveal">
            One of these you can open.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted reveal">
            A closed model is delivered as a service. You send words in, you get
            words back, and the machine itself stays on the vendor&apos;s servers —
            unreachable, unauditable, forever. An open-weight model hands you the
            actual parameters. That difference is everything.
          </p>

          <div className="mt-14 reveal">
            <ProbeDemo />
          </div>

          <p className="mt-14 max-w-2xl text-lg leading-relaxed text-muted reveal">
            Open weights don&apos;t <em>guarantee</em> transparency. They make it
            possible — and that possibility is exactly what a closed model
            denies. It is the ground everything else stands on.
          </p>
        </section>

        {/* PART TWO — the catch: the opening goes unused. */}
        <section className="border-y border-line bg-white/40">
          <div className="mx-auto max-w-5xl px-6 py-32">
            <p className="eyebrow mb-8 reveal">Part two · The catch</p>
            <h2 className="font-display text-5xl sm:text-7xl max-w-3xl reveal">
              The door is open. No one walks through.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted reveal">
              Holding the weights is not the same as understanding them. Today
              the most-run open models ship with almost everything that matters
              still undisclosed:
            </p>
            <ul className="mt-8 max-w-2xl space-y-3 text-lg leading-relaxed text-muted reveal">
              <li>The training data — what it learned from.</li>
              <li>The alignment choices — what it was told to prefer.</li>
              <li>The values — what it will quietly push.</li>
              <li>The intent — who shaped it, and toward what.</li>
            </ul>

            <div className="mt-16 grid gap-14 sm:grid-cols-2">
              <Stat value={`${total - undisclosed} / ${total}`} label="disclose their training data — not one of them." />
              <Stat value={`${foreign} / ${total}`} label="are trained outside the United States, under other systems of government." />
            </div>

            <p className="mt-16 max-w-2xl text-lg leading-relaxed text-muted reveal">
              The ability to inspect is going unused. That is the real danger —
              not openness, but openness left unexamined.
            </p>
          </div>
        </section>

        {/* PART THREE — the threat (dark, interactive). */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-5xl px-6 py-40">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-gold reveal">
              Part three · The threat
            </p>
            <h2 className="font-display text-5xl sm:text-7xl max-w-3xl reveal">
              A key that nobody turns.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/70 reveal">
              Put an open model into a court, an agency, a school — and never
              probe it — and it behaves exactly like the black box we rejected.
              Only now it is making decisions. Explore what goes unseen:
            </p>

            <div className="mt-16 reveal">
              <ThreatExplorer threats={threats} />
            </div>

            <p className="mt-32 max-w-3xl font-display text-4xl sm:text-6xl reveal">
              A republic runs on institutions its citizens can see into. An
              unprobed model, placed inside them, breaks that chain — quietly.
            </p>
          </div>
        </section>

        {/* PART FOUR — the remedy. */}
        <section className="mx-auto max-w-5xl px-6 py-40">
          <p className="eyebrow mb-8 reveal">Part four · The remedy</p>
          <h2 className="font-display text-5xl sm:text-7xl max-w-3xl reveal">
            So turn the key.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted reveal">
            The fix is not to ban open models — it is to use the opening they
            give us. Probe them in daylight, publish what they value, and let
            anyone check the work. That is what Republic Assay is for.
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
