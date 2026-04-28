import Image from "next/image";
import Link from "next/link";
import { company, navigation, socials } from "@/data/site";
import logo from "@/assets/favicon/favicon-32x32.png";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5">
                <Image
                  src={logo}
                  alt={`${company.name} logo`}
                  width={40}
                  height={40}
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
              <p className="text-2xl font-semibold tracking-[0.24em] text-white">{company.name}</p>
            </div>
            <p className="mt-3 text-sm text-white/50">Owner: {company.owner}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/62">{company.description}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">Navigation</p>
            <div className="mt-4 flex flex-col gap-3">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-white/70 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>{company.email}</p>
              <p>{company.phones.join(" / ")}</p>
              <p>{company.location}</p>
            </div>
            <div className="mt-6 flex gap-4">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-sm text-white/55 hover:text-white"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
