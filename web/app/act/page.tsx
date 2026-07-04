import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Take action — Republic Assay",
  description:
    "Open models founded on American values will not build themselves. Five levers decide it — move the one that is yours.",
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
};

const lanes: Lane[] = [
  {
    id: "cap",
    code: "CAP",
    title: "Capital",
    directive: "Fund what ships, and what defends it.",
    actions: [
      {
        lead: "Fund the producers.",
        body: "Compute-restricted gifts go furthest — compute is the bottleneck, not headcount.",
        links: [
          { label: "Ai2", href: "https://allenai.org/" },
          { label: "EleutherAI", href: "https://www.eleuther.ai/" },
          { label: "Mozilla.ai", href: "https://www.mozilla.ai/" },
        ],
      },
      {
        lead: "Fund the defense.",
        body: "The cases deciding whether open builders can be punished protect every one of them.",
        links: [{ label: "EFF", href: "https://supporters.eff.org/donate" }],
      },
    ],
    bar: "Your capital becomes training runs, data, or briefs — not another report.",
  },
  {
    id: "cmp",
    code: "CMP",
    title: "Compute",
    directive: "Point American silicon at open training.",
    actions: [
      {
        lead: "Convert capacity into public models.",
        body: "Idle compute and credits become open models. If you sit near a cluster or an allocation, route open training onto it.",
        links: [
          { label: "ATOM Project", href: "https://atomproject.ai/" },
          { label: "NAIRR Pilot", href: "https://nairrpilot.org/" },
        ],
      },
    ],
    bar: "A public model exists that would not without your compute.",
  },
  {
    id: "pol",
    code: "POL",
    title: "Position",
    directive: "Spend the standing you already hold.",
    actions: [
      {
        lead: "File on open comment dockets.",
        body: "One credible filing from a party with standing outweighs ten thousand form letters — and almost no one sends it.",
        links: [
          { label: "Open dockets", href: "https://www.regulations.gov/" },
          { label: "NTIA", href: "https://www.ntia.gov/" },
        ],
      },
      {
        lead: "Set the procurement rule.",
        body: "Where you hold a vote, require auditable or open models. Most forget they hold this power.",
      },
    ],
    bar: "Your name on a filing, or a procurement rule that changed.",
  },
  {
    id: "tme",
    code: "TME",
    title: "Time",
    directive: "Do the work that scale refuses.",
    actions: [
      {
        lead: "Vet the data, cover the gaps.",
        body: "License auditing, dedup, and quality filtering — where trust lives — plus evals for the languages and domains the frontier ignores.",
        links: [
          { label: "Public datasets", href: "https://huggingface.co/datasets" },
          { label: "EleutherAI", href: "https://www.eleuther.ai/" },
        ],
      },
    ],
    bar: "Your work lands in a public dataset or eval, on the record.",
  },
  {
    id: "rch",
    code: "RCH",
    title: "Audience",
    directive: "Spend your reach on artifacts, not opinions.",
    actions: [
      {
        lead: "Move one person to one act.",
        body: "Point a specific reader at one concrete thing — a released model, an open eval, a live docket — and get them to move this week.",
        links: [{ label: "ATOM Project", href: "https://atomproject.ai/" }],
      },
    ],
    bar: "Someone acted because of what you published.",
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
          <p className="eyebrow mb-8 reveal">Take action</p>
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl max-w-4xl reveal">
            Move the resource
            <br />
            <span className="text-gold-deep">only you can move.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted reveal">
            The case is made. Open models founded on American values will not
            build themselves — and the Republic cannot wait on those who only
            repeat the argument. Five levers decide it. Move the one that is
            yours.
          </p>
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

                <p className="mt-10 border-t border-line pt-6 font-mono text-sm">
                  <span className="text-gold-deep">Bar</span>{" "}
                  <span className="text-muted">— {lane.bar}</span>
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Closing — test the claim. */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-5xl px-6 py-40">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-gold reveal">
              Test the claim — don&apos;t repeat it
            </p>
            <h2 className="font-display text-4xl sm:text-6xl max-w-3xl reveal">
              Build the model. Measure it against what the closed camp promised.
            </h2>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-paper/70 reveal">
              The gap between the two is the evidence that ends the argument, and
              the burden sits on the open side. One working, auditable model
              outweighs every essay — this one included. That measurement is what
              the{" "}
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
            through. A working document —{" "}
            <a
              href="https://github.com/abaybektursun/republicassay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-deep underline underline-offset-4 hover:text-ink"
            >
              fork it on GitHub
            </a>{" "}
            and swap in your own targets.
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
