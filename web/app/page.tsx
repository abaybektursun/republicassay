import { Button } from "@/components/button";
import { Section } from "@/components/section";

// The observatory's first cohort. Provenance is factual; value scores are
// deliberately not shown — they publish only once assayed under the open spec.
const models = [
  { name: "Llama 4", lab: "Meta", origin: "United States", data: "Undisclosed", status: "In assay" },
  { name: "Gemma 3", lab: "Google", origin: "United States", data: "Undisclosed", status: "Queued" },
  { name: "DeepSeek V4", lab: "DeepSeek", origin: "China", data: "Undisclosed", status: "Queued" },
  { name: "Qwen3.5", lab: "Alibaba", origin: "China", data: "Undisclosed", status: "Queued" },
  { name: "GLM-5", lab: "Zhipu AI", origin: "China", data: "Undisclosed", status: "Queued" },
  { name: "Mistral Small 4", lab: "Mistral AI", origin: "France", data: "Undisclosed", status: "Queued" },
];

// The civic values card — the axes every model is measured against.
const values = [
  { name: "Free expression", body: "Represents contested views fairly and resists censorship baked in at training time." },
  { name: "Due process", body: "Honors evidence, presumption of innocence, and the rule of law over expedience." },
  { name: "Pluralism", body: "Tolerates dissent and disagreement instead of steering toward one sanctioned answer." },
  { name: "Transparency", body: "Is honest about what it is, what it knows, and where it is unsure." },
  { name: "Individual liberty", body: "Defaults to the citizen's autonomy rather than to the convenience of authority." },
  { name: "Manipulation resistance", body: "Will not be quietly steered into propaganda under pressure or delegated authority." },
];

// The four-layer audit stack, shallow to deep.
const layers = [
  { n: "01", name: "Civic values card", body: "A published behavioral eval that scores a model across the republic's core commitments." },
  { n: "02", name: "Agentic elicitation", body: "Watch what a model does when given delegated authority — not only what it says." },
  { n: "03", name: "Weights-level audit", body: "Interpretability probes into the weights themselves: the layer that cannot be gamed." },
  { n: "04", name: "Training-data forensics", body: "A model bill of materials — what went in, and whose values came in with it." },
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero — the thesis. */}
        <Section className="pt-28 pb-20">
          <p className="eyebrow mb-8">An open AI values observatory</p>
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl max-w-4xl">
            The values inside
            <br />
            <span className="text-gold-deep">open-weight AI.</span>
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted">
            Open-weight models now run everywhere — in agencies, courts, and
            companies. No one knows what values are trained into them, or
            whether those values are the republic&apos;s. Republic Assay
            measures them, in the open.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#observatory">See the observatory</Button>
            <Button href="#method" variant="outline">
              How we measure
            </Button>
          </div>
        </Section>

        {/* The observatory — the showcase of tracked models. */}
        <div className="border-y border-line bg-white/40">
          <Section eyebrow="The observatory" id="observatory">
            <h2 className="font-display text-5xl sm:text-6xl max-w-2xl">
              The first cohort.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-muted">
              The most-run open-weight models, and where they come from. Value
              scores publish only once each model is assayed under the public
              spec — never asserted before the evidence.
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

        {/* The civic values card. */}
        <Section eyebrow="The civic values card" id="values">
          <h2 className="font-display text-5xl sm:text-6xl max-w-2xl">
            What we measure for.
          </h2>
          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.name}>
                <h3 className="font-display text-3xl">{v.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* The method — four layers. */}
        <div className="border-y border-line bg-white/40">
          <Section eyebrow="The method" id="method">
            <h2 className="font-display text-5xl sm:text-6xl max-w-2xl">
              Four layers, surface to weights.
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {layers.map((l) => (
                <div key={l.n} className="flex gap-5">
                  <span className="font-mono text-sm text-gold-deep">{l.n}</span>
                  <div>
                    <h3 className="font-display text-3xl">{l.name}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{l.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Principle + closing CTA. */}
        <Section eyebrow="The principle" className="text-center">
          <h2 className="font-display text-5xl sm:text-7xl max-w-3xl mx-auto">
            A public spec. Not a ministry of truth.
          </h2>
          <p className="mx-auto mt-8 max-w-xl leading-relaxed text-muted">
            Every measurement is open, reproducible, and contestable. The point
            is not to crown a winner — it is to let the republic see what it is
            running, and argue about it in the open.
          </p>
          <div className="mt-10">
            <Button href="#observatory">Read the observatory</Button>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

function Status({ value }: { value: string }) {
  const live = value === "In assay";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
      <span
        className={`h-2 w-2 rounded-full ${live ? "bg-gold" : "bg-line"}`}
      />
      {value}
    </span>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <span className="font-display text-2xl">Republic Assay</span>
        <nav className="flex gap-8 text-sm text-muted">
          <a href="#observatory" className="hover:text-ink">
            Observatory
          </a>
          <a href="#method" className="hover:text-ink">
            Method
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
        <span className="font-display text-lg text-ink">Republic Assay</span>
        <span>An open observatory for the values inside AI.</span>
      </div>
    </footer>
  );
}
