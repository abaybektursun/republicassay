type SectionProps = {
  eyebrow?: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
};

// A centered content column with generous vertical rhythm and an optional
// mono eyebrow label. Every band on the page is built from this.
export function Section({ eyebrow, id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`mx-auto w-full max-w-5xl px-6 py-24 ${className}`}>
      {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
      {children}
    </section>
  );
}
