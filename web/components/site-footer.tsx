import Link from "next/link";

const REPO = "https://github.com/abaybektursun/republicassay";

// Shared footer for every page. Presents the project's public source.
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-display text-lg text-ink">
          Republic Assay
        </Link>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
          <span>A public initiative in the service of the American Republic.</span>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-deep hover:text-ink"
          >
            Source on GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
