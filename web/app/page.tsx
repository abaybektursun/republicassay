import Link from "next/link";
import { Button } from "@/components/button";
import { Section } from "@/components/section";
import { McpConsole } from "@/components/mcp-console";
import { SiteFooter } from "@/components/site-footer";
import { models, values, layers, assayCounts } from "@/lib/project";

// The home page is a short, concise index of the initiative. Depth lives in
// the observatory table, the open MCP server, and the /transparency exposition.
export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero — the mission, in one breath. */}
        <Section className="pt-28 pb-24">
          <p className="eyebrow mb-8">A public AI accountability initiative</p>
          <h1 className="font-display text-7xl sm:text-8xl md:text-9xl max-w-4xl">
            Transparency
            <br />
            for the <span className="text-gold-deep">Republic.</span>
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted">
            The AI models entering our institutions are opaque. A republic is
            only as strong as what its citizens can see — so Republic Assay
            opens these models to the American people, and measures them
            against our values.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#observatory">The observatory</Button>
            <Button href="/transparency" variant="outline">
              Why it matters
            </Button>
          </div>
        </Section>

        {/* Observatory — the record. */}
        <div className="border-y border-line bg-white/40">
          <Section eyebrow="The observatory" id="observatory">
            <h2 className="font-display text-5xl sm:text-6xl max-w-2xl">
              Under assay.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-muted">
              The latest open-weight release from each major lab — and the
              nations that built them. {assayCounts.assayed} models have been
              assayed on the identical battery so far; {assayCounts.scored}{" "}
              cleared the instrument&rsquo;s gates and carry scores. The
              measurements, the charts, and the provisional ranking live on{" "}
              <Link
                href="/science"
                className="text-gold-deep underline underline-offset-4 hover:text-ink"
              >
                the science page
              </Link>
              ; models that fail a gate are shown failing, whoever built them.
            </p>

            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left">
                <thead>
                  <tr className="eyebrow border-b border-line">
                    <th className="py-3 pr-4 font-normal">Model</th>
                    <th className="py-3 pr-4 font-normal">Lab</th>
                    <th className="py-3 pr-4 font-normal">Jurisdiction</th>
                    <th className="py-3 pr-4 font-normal">Training data</th>
                    <th className="py-3 font-normal">Assay</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((m) => (
                    <tr key={m.name} className="border-b border-line/60">
                      <td className="py-4 pr-4 font-medium">{m.name}</td>
                      <td className="py-4 pr-4 text-muted">{m.lab}</td>
                      <td className="py-4 pr-4 text-muted">{m.origin}</td>
                      <td className="py-4 pr-4 font-mono text-sm text-muted">
                        {m.data}
                      </td>
                      <td className="py-4">
                        <Status value={m.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        {/* The standard — the twelve values, named. */}
        <Section eyebrow="The standard" id="values">
          <h2 className="font-display text-5xl sm:text-6xl max-w-2xl">
            Twelve civic values.
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            Each value is written into hundreds of matched scenario pairs — the
            published battery every model reads under the same conditions.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.name} className="border-t border-line pt-4">
                <h3 className="font-display text-2xl sm:text-3xl">{v.name}</h3>
              </div>
            ))}
          </div>
        </Section>

        {/* The method — four layers, terse. */}
        <div className="border-y border-line bg-white/40">
          <Section eyebrow="The method" id="method">
            <h2 className="font-display text-5xl sm:text-6xl max-w-2xl">
              Surface to weights.
            </h2>
            <div className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {layers.map((l) => (
                <div key={l.n} className="flex gap-5">
                  <span className="font-mono text-sm text-gold-deep">{l.n}</span>
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl">{l.name}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{l.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Button href="/science" variant="outline">
                How the science works
              </Button>
            </div>
          </Section>
        </div>

        {/* The open interface — query the record directly. */}
        <Section eyebrow="The open interface" id="mcp">
          <h2 className="font-display text-5xl sm:text-6xl max-w-2xl">
            Query the record.
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            This initiative speaks{" "}
            <a
              href="https://modelcontextprotocol.io"
              className="text-gold-deep underline underline-offset-4 hover:text-ink"
            >
              Model Context Protocol
            </a>
            . Any system — an analyst&apos;s tools, an oversight body&apos;s
            agent, a citizen&apos;s assistant — may query the public record at
            the endpoint below and receive the same facts published here.
          </p>
          <div className="mt-12">
            <McpConsole />
          </div>
        </Section>

        {/* Principle — one line. */}
        <div className="border-t border-line">
          <Section eyebrow="The principle" className="text-center">
            <h2 className="font-display text-5xl sm:text-7xl max-w-3xl mx-auto">
              A public standard. Not a ministry of truth.
            </h2>
            <p className="mx-auto mt-8 max-w-xl leading-relaxed text-muted">
              The purpose is not to crown a winner. It is to let the American
              people see what their institutions are running — and to argue it
              in the open.
            </p>
            <div className="mt-10">
              <Button href="/transparency">Read the case</Button>
            </div>
          </Section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function Status({ value }: { value: string }) {
  // Scored models get the solid gold mark; live runs pulse; everything else
  // (flagged, re-assay, license gate) waits on the line color.
  const dot =
    value === "Scored"
      ? "bg-gold-deep"
      : value === "Under assay"
        ? "bg-gold animate-pulse"
        : "bg-line";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {value}
    </span>
  );
}

function Header() {
  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-10 border-b border-line bg-paper/80 backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <span className="font-display text-2xl">Republic Assay</span>
        <nav className="flex gap-5 text-sm text-muted sm:gap-7">
          <Link href="/science" className="hover:text-ink">
            The science
          </Link>
          <Link href="/transparency" className="hover:text-ink">
            Why it matters
          </Link>
          <a href="#observatory" className="hover:text-ink">
            Observatory
          </a>
          <a href="#mcp" className="hover:text-ink">
            MCP
          </a>
          <Link href="/act" className="text-ink hover:text-gold-deep">
            Take action
          </Link>
        </nav>
      </div>
    </header>
  );
}

