import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { VoicesExplorer } from "@/components/voices-explorer";
import { OpennessSpectrum } from "@/components/openness-spectrum";
import { actionPlan, champions, distinction, counter } from "@/lib/sources";

export const metadata: Metadata = {
  title: "The case for open weights — Republic Assay",
  description:
    "Why America's leaders argue for open models founded on American values — in their own words — and the strongest counter, answered.",
};

export default function Transparency() {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-20 h-1">
        <div className="scroll-progress h-full w-full bg-gold" />
      </div>

      <Header />

      <main>
        {/* HERO — the policy line, verbatim. */}
        <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-32">
          <p className="eyebrow mb-10 reveal">The written record</p>
          <blockquote className="font-display text-5xl leading-tight sm:text-6xl md:text-7xl max-w-4xl reveal">
            &ldquo;We need to ensure America has leading open models founded on{" "}
            <span className="text-gold-deep">American values.</span>&rdquo;
          </blockquote>
          <p className="mt-10 font-mono text-sm uppercase tracking-[0.15em] text-muted reveal">
            — {actionPlan.work}
          </p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted reveal">
            {actionPlan.note} What follows is the case for that policy, argued by
            the leaders who set it — and the strongest objection, answered.
          </p>
        </section>

        {/* PART ONE — the champions, in their words. */}
        <section className="mx-auto max-w-5xl px-6 py-32">
          <p className="eyebrow mb-8 reveal">Part one · The case, in their words</p>
          <h2 className="font-display text-5xl sm:text-7xl max-w-3xl reveal">
            Why the Nation chose open.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted reveal">
            The argument for open models is not fringe advocacy. It is made, on
            the record, by the officials who set national policy and the
            companies that ship the models.
          </p>
          <div className="mt-14 reveal">
            <VoicesExplorer sources={champions} />
          </div>
        </section>

        {/* PART TWO — Lambert's distinction (interactive spectrum). */}
        <section className="border-y border-line bg-white/40">
          <div className="mx-auto max-w-5xl px-6 py-32">
            <p className="eyebrow mb-8 reveal">
              Part two · The distinction that guts the marketing
            </p>
            <h2 className="font-display text-5xl sm:text-7xl max-w-3xl reveal">
              Open weights are not open.
            </h2>
            <blockquote className="mt-10 max-w-3xl font-display text-3xl leading-tight sm:text-4xl reveal">
              &ldquo;{distinction.quote}&rdquo;
            </blockquote>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted reveal">
              — {distinction.name} · {distinction.work}
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted reveal">
              Llama and DeepSeek are open weights: you can run and tune them, but
              you cannot rebuild or fully verify them. {distinction.note}
            </p>

            <div className="mt-12 reveal">
              <OpennessSpectrum />
            </div>

            <p className="mt-12 max-w-2xl text-lg leading-relaxed text-muted reveal">
              Lambert&apos;s warning is blunt: &ldquo;This is a world where the
              most available models are the hardest to trust.&rdquo; His
              answer — the American DeepSeek Project — is to make the fully-open,
              reproducible model the American default.
            </p>
            <a
              href={distinction.url}
              className="mt-6 inline-block text-sm text-gold-deep underline underline-offset-4 hover:text-ink reveal"
            >
              Read the source →
            </a>
          </div>
        </section>

        {/* PART THREE — the counter, answered (dark). */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-5xl px-6 py-40">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-gold reveal">
              Part three · The counter we must beat
            </p>
            <h2 className="font-display text-5xl sm:text-7xl max-w-3xl reveal">
              The strongest republic voice is on the closed side.
            </h2>

            <div className="mt-12 max-w-3xl reveal">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gold">
                Position
              </p>
              <p className="text-2xl leading-snug text-paper/90">{counter.paraphrase}</p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-paper/40">
                {counter.name} · {counter.work}
              </p>
            </div>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/70 reveal">
              {counter.note}
            </p>

            <p className="mt-20 max-w-3xl font-display text-3xl sm:text-5xl reveal">
              Karp is right that technology must serve the Republic. The record
              above shows why it must be <span className="text-gold">open</span> to
              do it.
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/70 reveal">
              A republic governs by the oversight of the governed. A closed model
              placed inside a public institution cannot be inspected by the
              people it rules — and, as Zuckerberg warns, it concentrates the
              substrate in &ldquo;a small number of big companies plus our
              geopolitical adversaries.&rdquo; As Lambert shows, it cannot even be
              reproduced or verified. The Nation&apos;s own policy does not
              conclude for the black box. It concludes for leading open models
              founded on American values.
            </p>
            <a
              href={counter.url}
              className="mt-8 inline-block text-sm text-gold underline underline-offset-4 hover:text-paper reveal"
            >
              Read the counter →
            </a>
          </div>
        </section>

        {/* PART FOUR — the mandate. */}
        <section className="mx-auto max-w-5xl px-6 py-40">
          <p className="eyebrow mb-8 reveal">Part four · The standard the record demands</p>
          <h2 className="font-display text-5xl sm:text-7xl max-w-3xl reveal">
            Open, and proven so.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted reveal">
            The leaders agree on the goal: American open models, founded on
            American values. Republic Assay is the instrument that holds them to
            it — measuring each model against that standard, in public, so the
            claim can be checked.
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

function Header() {
  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-10 border-b border-line bg-paper/80 backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-2xl">
          Republic Assay
        </Link>
        <Link href="/#observatory" className="text-sm text-muted hover:text-ink">
          Observatory
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-muted sm:flex-row sm:justify-between">
        <Link href="/" className="font-display text-lg text-ink">
          Republic Assay
        </Link>
        <span>A public initiative in the service of the American Republic.</span>
      </div>
    </footer>
  );
}
