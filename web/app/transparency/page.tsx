import type { Metadata } from "next";
import Link from "next/link";
import { VoicesExplorer } from "@/components/voices-explorer";
import { OpennessSpectrum } from "@/components/openness-spectrum";
import { SiteFooter } from "@/components/site-footer";
import { actionPlan, champions, distinction } from "@/lib/sources";

export const metadata: Metadata = {
  title: "The case for open models — Republic Assay",
  description:
    "Why America's leaders argue for open models founded on American values — in their own words — and why transparency keeps them true to the Republic.",
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
            —{" "}
            <a
              href={actionPlan.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-ink"
            >
              {actionPlan.work}
            </a>
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

        {/* PART THREE — the mandate (dark finale). */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-5xl px-6 py-40">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-gold reveal">
              Part three · The mandate
            </p>
            <h2 className="font-display text-5xl sm:text-7xl max-w-3xl reveal">
              Open, transparent, and true to the Republic.
            </h2>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-paper/70 reveal">
              The record is united. America&apos;s future runs on open models,
              founded on American values — and a model the people can inspect is
              the only kind a republic can trust with its work. Openness makes
              accountability possible; transparency makes it real; American
              values make it ours.
            </p>
            <p className="mt-16 max-w-3xl font-display text-3xl sm:text-5xl reveal">
              Republic Assay is the instrument that holds every model to that
              standard —{" "}
              <span className="text-gold">
                in public, so the claim can always be checked.
              </span>
            </p>
            <div className="mt-12 flex flex-wrap gap-4 reveal">
              <Link
                href="/act"
                className="inline-flex items-center rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold"
              >
                Take action
              </Link>
              <Link
                href="/#observatory"
                className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-paper"
              >
                See the observatory
              </Link>
              <Link
                href="/#mcp"
                className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-paper"
              >
                Query the open server
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
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

