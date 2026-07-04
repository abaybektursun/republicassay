import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Take action — Republic Assay",
  description:
    "Open models founded on American values will not build themselves. Five measures for the American people — advance the one within your means.",
};

type Action = {
  lead: string;
  body: string;
  links?: { label: string; href: string }[];
};

type Lane = {
  id: string;
  code: string;
  title: string;
  directive: string;
  actions: Action[];
  standard: string;
};

const lanes: Lane[] = [
  {
    id: "cap",
    code: "CAP",
    title: "Capital",
    directive: "Direct capital to those who build, and those who defend.",
    actions: [
      {
        lead: "Fund the producers.",
        body: "Compute-restricted gifts carry furthest; compute, not headcount, is the constraint.",
        links: [
          { label: "Ai2", href: "https://allenai.org/" },
          { label: "EleutherAI", href: "https://www.eleuther.ai/" },
          { label: "Mozilla.ai", href: "https://www.mozilla.ai/" },
        ],
      },
      {
        lead: "Fund the defense.",
        body: "The cases determining whether open builders may be penalized protect every one of them.",
        links: [{ label: "EFF", href: "https://supporters.eff.org/donate" }],
      },
    ],
    standard: "capital that becomes training runs, data, or briefs — not a further report.",
  },
  {
    id: "cmp",
    code: "CMP",
    title: "Compute",
    directive: "Commit American compute to open training.",
    actions: [
      {
        lead: "Convert capacity into public models.",
        body: "Idle compute and credits become open models. Those situated near a cluster or an allocation are asked to route open training onto it.",
        links: [
          { label: "ATOM Project", href: "https://atomproject.ai/" },
          { label: "NAIRR Pilot", href: "https://nairrpilot.org/" },
        ],
      },
    ],
    standard: "a public model that would not exist without your compute.",
  },
  {
    id: "pol",
    code: "POL",
    title: "Position",
    directive: "Exercise the standing already vested in you.",
    actions: [
      {
        lead: "File on the open comment dockets.",
        body: "A single credible filing from a party with standing outweighs ten thousand form letters — and almost none are submitted.",
        links: [
          { label: "Open dockets", href: "https://www.regulations.gov/" },
          { label: "NTIA", href: "https://www.ntia.gov/" },
        ],
      },
      {
        lead: "Set the procurement rule.",
        body: "Where a vote is yours, require auditable or open models. Most forget this authority is theirs to exercise.",
      },
    ],
    standard: "your name on a filing, or on a procurement rule that changed.",
  },
  {
    id: "tme",
    code: "TME",
    title: "Time",
    directive: "Undertake the work that scale declines.",
    actions: [
      {
        lead: "Vet the data; close the gaps.",
        body: "License auditing, deduplication, and quality filtering — where trust resides — together with evaluations for the languages and domains the frontier neglects.",
        links: [
          { label: "Public datasets", href: "https://huggingface.co/datasets" },
          { label: "EleutherAI", href: "https://www.eleuther.ai/" },
        ],
      },
    ],
    standard: "work entered into a public dataset or evaluation, on the record.",
  },
  {
    id: "rch",
    code: "RCH",
    title: "Audience",
    directive: "Direct your reach toward the concrete, not the commentary.",
    actions: [
      {
        lead: "Move one citizen to one act.",
        body: "Point a specific reader to a single concrete thing — a released model, an open evaluation, a live docket — and secure one action this week.",
        links: [{ label: "ATOM Project", href: "https://atomproject.ai/" }],
      },
    ],
    standard: "an action taken by someone on what you published.",
  },
];

export default function Act() {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-20 h-1">
        <div className="scroll-progress h-full w-full bg-gold" />
      </div>

      <Header />

      <main>
        {/* Hero. */}
        <section className="mx-auto max-w-5xl px-6 pt-28 pb-20">
          <p className="eyebrow mb-8 reveal">A public call to action</p>
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl max-w-4xl reveal">
            The Republic asks
            <br />
            <span className="text-gold-deep">what only you can move.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted reveal">
            The case is settled in the record. Open models founded on American
            values will not build themselves, and the Republic cannot wait on
            those who merely restate the argument. Five measures are set out
            below — each citizen is asked to advance the one within their means.
          </p>
        </section>

        {/* Measures. */}
        <div className="border-t border-line">
          {lanes.map((lane, i) => (
            <section
              key={lane.id}
              id={lane.id}
              className={`scroll-mt-24 border-b border-line ${i % 2 === 1 ? "bg-white/40" : ""}`}
            >
              <div className="mx-auto max-w-3xl px-6 py-20 reveal">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-gold-deep">{lane.code}</span>
                  <h2 className="font-display text-4xl sm:text-5xl">{lane.title}</h2>
                </div>
                <p className="mt-3 text-xl text-ink">{lane.directive}</p>

                <div className="mt-10 space-y-8">
                  {lane.actions.map((a) => (
                    <div key={a.lead}>
                      <p className="leading-relaxed">
                        <span className="font-medium text-ink">{a.lead}</span>{" "}
                        <span className="text-muted">{a.body}</span>
                      </p>
                      {a.links && a.links.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {a.links.map((l) => (
                            <ExtLink key={l.href + l.label} {...l} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <p className="mt-10 border-t border-line pt-6 font-mono text-sm">
                  <span className="text-gold-deep">Standard</span>{" "}
                  <span className="text-muted">— {lane.standard}</span>
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Support this initiative directly. */}
        <section id="support" className="border-b border-line">
          <div className="mx-auto max-w-5xl px-6 py-24 reveal">
            <p className="eyebrow mb-8">Support this initiative</p>
            <h2 className="font-display text-4xl sm:text-6xl max-w-3xl">
              Back the assay directly.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Republic Assay is a public initiative. Three ways to keep the
              measurement running:
            </p>

            <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
              <div>
                <p className="font-mono text-sm text-gold-deep">01</p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl">GPU credits</h3>
                <p className="mt-3 leading-relaxed text-muted">
                  Contribute compute or credits. The assay runs directly on
                  model weights — every hour becomes another model measured.
                </p>
              </div>
              <div>
                <p className="font-mono text-sm text-gold-deep">02</p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl">Financially</h3>
                <p className="mt-3 leading-relaxed text-muted">
                  Fund the measurement program and the public record it
                  produces.
                </p>
              </div>
              <div>
                <p className="font-mono text-sm text-gold-deep">03</p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl">Spread the word</h3>
                <p className="mt-3 leading-relaxed text-muted">
                  Point others to the observatory and this call to action; one
                  credible referral moves more than a thousand impressions.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <a
                href="mailto:ab@abay.tech"
                className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-gold-deep"
              >
                Contact the initiative — ab@abay.tech
              </a>
            </div>
          </div>
        </section>

        {/* Closing — the burden of proof. */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-5xl px-6 py-40">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-gold reveal">
              On the burden of proof
            </p>
            <h2 className="font-display text-4xl sm:text-6xl max-w-3xl reveal">
              Build the model. Then measure it against what the closed camp
              promised.
            </h2>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-paper/70 reveal">
              The distance between the two is the evidence that settles the
              matter, and the burden rests with the open side. One working,
              auditable model outweighs every essay — this one included. That
              measurement is the work the{" "}
              <Link href="/#observatory" className="text-gold underline underline-offset-4 hover:text-paper">
                observatory
              </Link>{" "}
              exists to publish.
            </p>

            <div className="mt-12 flex flex-wrap gap-4 reveal">
              <ActLink href="https://supporters.eff.org/donate" primary>
                Fund
              </ActLink>
              <ActLink href="https://atomproject.ai/">Route compute</ActLink>
              <ActLink href="https://www.regulations.gov/">File</ActLink>
            </div>
          </div>
        </section>

        {/* Working record. */}
        <section className="mx-auto max-w-5xl px-6 py-12">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            A working record. Links are live as of issuance; dockets and funding
            needs shift, so verify each before acting.{" "}
            <a
              href="https://github.com/abaybektursun/republicassay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-deep underline underline-offset-4 hover:text-ink"
            >
              Fork it on GitHub
            </a>{" "}
            and enter your own targets.
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

// External link chip — leaves the site to take action, so opens in a new tab.
function ExtLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-1.5 text-sm text-gold-deep transition-colors hover:border-ink hover:text-ink"
    >
      {label}
      <span aria-hidden>↗</span>
    </a>
  );
}

// Prominent external CTA on the dark closing section.
function ActLink({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const styles = primary
    ? "bg-paper text-ink hover:bg-gold"
    : "border border-white/30 text-paper hover:border-paper";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 rounded-full px-6 py-3 text-sm font-medium transition-colors ${styles}`}
    >
      {children}
      <span aria-hidden>↗</span>
    </a>
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
        <nav className="flex gap-6 text-sm text-muted sm:gap-8">
          <Link href="/transparency" className="hover:text-ink">
            Why it matters
          </Link>
          <Link href="/#observatory" className="hover:text-ink">
            Observatory
          </Link>
        </nav>
      </div>
    </header>
  );
}
