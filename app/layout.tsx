import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { company } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://strokecompany.com"),
  title: {
    default: `${company.name} | Luxury Digital Agency Platform`,
    template: `%s | ${company.name}`
  },
  description: company.description,
  keywords: [
    "luxury digital agency",
    "events management",
    "branding and design",
    "web development",
    "media production",
    "marketing solutions"
  ],
  manifest: "/assets/site.webmanifest",
  icons: {
    icon: [
      { url: "/assets/favicon/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/assets/favicon/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" }
    ],
    apple: [{ url: "/assets/favicon/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" }]
  },
  openGraph: {
    title: `${company.name} | Luxury Digital Agency Platform`,
    description: company.description,
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
