import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Take action — Republic Assay",
  description:
    "Move the resource only you can move. Capital, compute, standing, time, or audience — pick your lane and start in five minutes.",
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
  bar: string;
  skip: string;
};

const lanes: Lane[] = [
  {
    id: "cap",
    code: "CAP",
    title: "Capital",
    directive: "Fund who ships or sues.",
    actions: [
      {
        lead: "Fund the producers.",
        body: "Compute-restricted gifts go furthest; that is the bottleneck, not headcount.",
        links: [
          { label: "Ai2", href: "https://allenai.org/" },
          { label: "EleutherAI", href: "https://www.eleuther.ai/" },
          { label: "Mozilla.ai", href: "https://www.mozilla.ai/" },
        ],
      },
      {
        lead: "Fund the defense.",
        body: "The cases deciding whether a company can be punished for setting use limits cover everyone building open.",
        links: [{ label: "EFF", href: "https://supporters.eff.org/donate" }],
      },
      {
        lead: "Back founders on open weights.",
        body: "Making the open stack pay is what makes it self-sustaining.",
      },
    ],
    bar: "becomes training runs, data, or briefs — not a report.",
    skip: "sponsoring another “future of AI” panel",
  },
  {
    id: "cmp",
    code: "CMP",
    title: "Compute",
    directive: "Point silicon at open training.",
    actions: [
      {
        lead: "Sponsor training compute.",
        body: "Idle capacity and credits convert straight into public models.",
        links: [
          { label: "ATOM Project", href: "https://atomproject.ai/" },
          { label: "EleutherAI", href: "https://www.eleuther.ai/" },
        ],
      },
      {
        lead: "Route institutional access.",
        body: "Near a cluster or allocation? Get open training onto it, and back shared public compute.",
        links: [{ label: "NAIRR Pilot", href: "https://nairrpilot.org/" }],
      },
    ],
    bar: "a public model exists that would not without your compute.",
    skip: "pledging “in principle” for a future run",
  },
  {
    id: "pol",
    code: "POL",
    title: "Position",
    directive: "Use the standing you have.",
    actions: [
      {
        lead: "File on open comment dockets.",
        body: "These windows moved the open-weight report. A credible filing outweighs ten thousand form letters — and almost no one with standing sends one.",
        links: [
          { label: "Open dockets", href: "https://www.regulations.gov/" },
          { label: "NTIA", href: "https://www.ntia.gov/" },
        ],
      },
      {
        lead: "Back named bills, not vibes.",
        body: "Specific legislation protecting open development and the right to set use limits.",
      },
      {
        lead: "Set your institution's procurement rule.",
        body: "Require auditable or open models where you have a vote; most forget they hold this.",
      },
    ],
    bar: "your name on a filing, a bill, or a policy that changed.",
    skip: "signing a letter that already has momentum",
  },
  {
    id: "tme",
    code: "TME",
    title: "Time",
    directive: "Do the vetting that scale skips.",
    actions: [
      {
        lead: "Vet data and provenance.",
        body: "License auditing, dedup, quality filtering — where trust actually lives, and wide open.",
        links: [{ label: "Public datasets", href: "https://huggingface.co/datasets" }],
      },
      {
        lead: "Cover what the frontier ignores.",
        body: "Evals in skipped languages and domains; non-English is a gap any capable contributor can close.",
        links: [{ label: "Join EleutherAI", href: "https://www.eleuther.ai/" }],
      },
    ],
    bar: "lands in a public dataset with your name on it.",
    skip: "reading every AI newsletter to “stay informed”",
  },
  {
    id: "rch",
    code: "RCH",
    title: "Audience",
    directive: "Boost artifacts, not takes.",
    actions: [
      {
        lead: "Point people at the concrete.",
        body: "A released model, an open eval, a live case, a comment window — a next click that lands on something real.",
        links: [{ label: "Send them to ATOM", href: "https://atomproject.ai/" }],
      },
      {
        lead: "Move one reader to one act.",
        body: "Get a specific person to fund, file, or free up compute this week.",
      },
    ],
    bar: "someone acted because of what you published.",
    skip: "the manifesto, the thread, the take",
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
        <section className="mx-auto max-w-5xl px-6 pt-28 pb-16">
          <p className="eyebrow mb-8 reveal">Take action</p>
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl max-w-4xl reveal">
            Move the resource
            <br />
            <span className="text-gold-deep">only you can move.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted reveal">
            Everyone repeats that open models keep a free country free. Almost no
            one moves the money, compute, or standing that would settle it. Pick
            your lane — each link starts you in five minutes.
          </p>
        </section>

        {/* Pick your lane. */}
        <section className="mx-auto max-w-5xl px-6 pb-20">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {lanes.map((lane) => (
              <a
                key={lane.id}
                href={`#${lane.id}`}
                className="group rounded-xl border border-line bg-white/40 px-5 py-5 transition-colors hover:border-ink"
              >
                <div className="font-mono text-xs text-gold-deep">{lane.code}</div>
                <div className="mt-1 font-display text-2xl">{lane.title}</div>
                <div className="mt-2 text-sm leading-snug text-muted">
                  {lane.directive}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Lanes. */}
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

                <div className="mt-10 space-y-1.5 border-t border-line pt-6 font-mono text-sm">
                  <p>
                    <span className="text-gold-deep">Bar</span>{" "}
                    <span className="text-muted">— {lane.bar}</span>
                  </p>
                  <p>
                    <span className="text-muted">Skip</span>{" "}
                    <span className="text-muted line-through">{lane.skip}</span>
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Closing — test the claim. */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-5xl px-6 py-40">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-gold reveal">
              Test the claim instead of repeating it
            </p>
            <h2 className="font-display text-4xl sm:text-6xl max-w-3xl reveal">
              Get the model built. Then measure it against what the closed camp
              predicted.
            </h2>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-paper/70 reveal">
              The gap between the two is the whole prize — the evidence that ends
              the argument. Fall short, and you learned it cheap. The burden sits
              on the open side, so one working, auditable model outweighs every
              essay on this. That measurement is exactly what the{" "}
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

        {/* Working-document note. */}
        <section className="mx-auto max-w-5xl px-6 py-12">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            Links live as of writing; dockets and funding needs shift, so click
            through. A working document — targets change as the field does.
          </p>
        </section>
      </main>

      <Footer />
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
