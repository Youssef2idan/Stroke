import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="section-spacing pt-36 sm:pt-40">
      <Container>
        <div className="card-surface mx-auto max-w-3xl p-8 text-center sm:p-10">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 text-white/70">
            The page you requested does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-dark"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
