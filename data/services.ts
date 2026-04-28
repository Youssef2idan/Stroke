export type ServicePlan = {
  slug: string;
  title: string;
  price?: string;
  summary: string;
  turnaround: string;
  features: string[];
  deliverables: string[];
  ctaLabel: string;
  badge?: string;
  guestCount?: number;
  customizationBudget?: string;
};

export type ServiceCategory = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  leadMetric: string;
  customOptionEnabled: boolean;
  plans: ServicePlan[];
};

export type ServiceItem = {
  name: string;
  title: string;
  slug: string;
  description: string;
  href: string;
  points: string[];
  intro: string;
  accent: string;
  categories: ServiceCategory[];
};

export const services: ServiceItem[] = [
  {
    name: "Events Management",
    title: "Events Management",
    slug: "events",
    description:
      "Curated event systems for milestones, launches, and premium guest experiences with seamless execution.",
    href: "/services/events",
    points: ["Concept design", "Guest experience", "Vendor orchestration"],
    intro:
      "From private celebrations to corporate activations, Stroke designs event experiences that feel elevated, organized, and memorable at every touchpoint.",
    accent: "Experiences",
    categories: [
      {
        slug: "graduation",
        title: "Graduation Parties",
        description:
          "Premium celebration systems for graduation milestones, featuring tailored packages with exclusive entertainment, professional coverage, and customizable experiences.",
        audience: "Families, schools, institutions, and celebration hosts",
        leadMetric: "End-to-end graduation experience management",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Graduation Plan",
            price: "$1,200",
            summary: "A simple and cost-effective solution for small graduation gatherings while maintaining a professional and organized experience.",
            turnaround: "7 days",
            ctaLabel: "Select Basic Plan",
            badge: undefined,
            guestCount: 100,
            customizationBudget: "3000 EGP",
            features: [
              "🎉 Venue for up to 100 guests",
              "🍽️ Light catering (snacks & soft drinks)",
              "🏅 Graduation sashes for 100 students",
              "🎧 Standard DJ & sound system",
              "📸 Basic photography coverage",
              "🎁 Customization budget worth 3000 EGP"
            ],
            deliverables: [
              "Venue coordination",
              "Catering management",
              "Sash distribution setup",
              "Audio-visual support",
              "Photography coverage (4 hours)",
              "Customization consultation"
            ]
          },
          {
            slug: "standard",
            title: "Standard Graduation Plan",
            price: "$2,700",
            summary: "Ideal for medium-sized graduation events with a premium experience, combining organization, entertainment, and full media coverage.",
            turnaround: "10 days",
            ctaLabel: "Select Standard Plan",
            badge: "Most Popular",
            guestCount: 200,
            customizationBudget: "6000 EGP",
            features: [
              "🎉 Venue for up to 200 guests",
              "🍽️ Full dinner service",
              "🏅 Graduation shields & sashes for 200 students",
              "🎧 Professional DJ & high-end sound system",
              "🎥 Full event video coverage",
              "📸 Professional photography coverage",
              "🎁 Customization budget worth 6000 EGP"
            ],
            deliverables: [
              "Premium venue coordination",
              "Full meal service setup",
              "Ceremonial insignia distribution",
              "Professional AV production",
              "Full day video coverage (edited highlight reel)",
              "Professional photo coverage (8 hours with edited album)",
              "Customization consultation & implementation"
            ]
          },
          {
            slug: "premium",
            title: "Premium Graduation Plan",
            price: "$4,900",
            summary: "A luxury all-inclusive graduation experience designed for large-scale events with top-tier production, entertainment, and unforgettable moments.",
            turnaround: "14 days",
            ctaLabel: "Select Premium Plan",
            badge: undefined,
            guestCount: 400,
            customizationBudget: "12000 EGP",
            features: [
              "🎉 Venue for up to 400 guests (luxury hall)",
              "🍽️ Premium open buffet (fully customizable menu)",
              "🏅 High-quality graduation shields & premium sashes for 400 students",
              "🎧 Elite DJ + advanced sound & lighting system",
              "🎥 Cinematic full event video production",
              "📸 Professional photography + edited album",
              "🎇 Special entrance show (Opening performance)",
              "🎁 Customization budget worth 12000 EGP"
            ],
            deliverables: [
              "Luxury venue coordination & lighting design",
              "Premium catering with custom menu",
              "High-end ceremonial materials",
              "Elite audio-visual production team",
              "Cinematic video production (4K, professional editing, highlight reel & full edit)",
              "Professional photography (full day coverage with premium album)",
              "Opening performance production & coordination",
              "Complete customization suite & consultation",
              "Dedicated event manager"
            ]
          }
        ]
      },
      {
        slug: "weddings",
        title: "Weddings",
        description:
          "Premium wedding experiences blending logistics, storytelling, and luxury details for unforgettable celebrations.",
        audience: "Couples and wedding hosts",
        leadMetric: "Luxury planning precision",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Plan",
            price: "$3,800",
            summary: "Refined planning support for curated intimate weddings.",
            turnaround: "3 weeks",
            ctaLabel: "Select Basic Plan",
            features: ["Planning consultation", "Vendor shortlist", "Moodboard styling", "Day-of coordination"],
            deliverables: ["Wedding concept deck", "Vendor shortlist", "Timeline", "Coordination support"]
          },
          {
            slug: "standard",
            title: "Standard Plan",
            price: "$7,200",
            summary: "Balanced creative planning and guest experience support.",
            turnaround: "4 weeks",
            ctaLabel: "Select Standard Plan",
            features: ["Visual concept direction", "Vendor management", "Guest flow design", "Photography support"],
            deliverables: ["Creative direction", "Guest journey", "Vendor management", "Photo support brief"]
          },
          {
            slug: "premium",
            title: "Premium Plan",
            price: "$12,500",
            summary: "Full-scale luxury wedding production and storytelling.",
            turnaround: "6 weeks",
            ctaLabel: "Select Premium Plan",
            features: ["Full event production", "Custom print suite", "Cinema-style recap", "Dedicated event team"],
            deliverables: ["Production leadership", "Print collateral", "Recap film", "Full support team"]
          }
        ]
      },
      {
        slug: "corporate",
        title: "Corporate Events",
        description:
          "Launches, conferences, and internal experiences designed with brand clarity and operational control.",
        audience: "Companies and executive teams",
        leadMetric: "Brand-safe execution",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Plan",
            price: "$2,500",
            summary: "A clean package for focused business gatherings.",
            turnaround: "10 days",
            ctaLabel: "Select Basic Plan",
            features: ["Event format planning", "Run-of-show", "Vendor coordination", "Brand-ready staging"],
            deliverables: ["Run sheet", "Vendor alignment", "Stage setup plan", "Host support brief"]
          },
          {
            slug: "standard",
            title: "Standard Plan",
            price: "$5,500",
            summary: "A professional system for polished branded events.",
            turnaround: "2 weeks",
            ctaLabel: "Select Standard Plan",
            features: ["Branded environment design", "AV coordination", "Host support", "Photo coverage"],
            deliverables: ["Environment concept", "AV plan", "Photo coverage", "Operations guide"]
          },
          {
            slug: "premium",
            title: "Premium Plan",
            price: "$9,800",
            summary: "An executive-level activation with full creative control.",
            turnaround: "3 weeks",
            ctaLabel: "Select Premium Plan",
            features: ["Event creative direction", "Motion visuals", "Media capture team", "Guest journey production"],
            deliverables: ["Creative direction", "Motion package", "Capture team", "Experience production"]
          }
        ]
      },
      {
        slug: "private",
        title: "Private Events",
        description:
          "Tailored private experiences designed around intimacy, atmosphere, and elevated service.",
        audience: "Private clients and luxury hosts",
        leadMetric: "Personalized curation",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Plan",
            price: "$1,500",
            summary: "A minimal premium setup for smaller private moments.",
            turnaround: "5 days",
            ctaLabel: "Select Basic Plan",
            features: ["Event consultation", "Simple styling", "Vendor liaison", "Setup checklist"],
            deliverables: ["Consultation", "Styling notes", "Vendor liaison", "Setup guide"]
          },
          {
            slug: "standard",
            title: "Standard Plan",
            price: "$3,200",
            summary: "A polished package with stronger atmosphere and execution.",
            turnaround: "8 days",
            ctaLabel: "Select Standard Plan",
            features: ["Theme styling", "Spatial planning", "Hospitality coordination", "Photo documentation"],
            deliverables: ["Theme board", "Layout plan", "Hospitality guide", "Photo gallery"]
          },
          {
            slug: "premium",
            title: "Premium Plan",
            price: "$6,400",
            summary: "An immersive private experience built around custom detail.",
            turnaround: "12 days",
            ctaLabel: "Select Premium Plan",
            features: ["Bespoke experience design", "Luxury decor sourcing", "Media production", "On-site management"],
            deliverables: ["Bespoke concept", "Decor sourcing", "Media package", "Management team"]
          }
        ]
      }
    ]
  },
  {
    name: "Branding & Design",
    title: "Branding & Design",
    slug: "branding",
    description:
      "Identity systems, visual direction, and premium brand language designed to position businesses with distinction.",
    href: "/services/branding",
    points: ["Brand strategy", "Identity systems", "Packaging and collateral"],
    intro:
      "Stroke builds brand systems that look sophisticated, feel intentional, and stay consistent across every public touchpoint.",
    accent: "Identity",
    categories: [
      {
        slug: "identity",
        title: "Brand Identity",
        description: "Foundational identity design for brands that need a premium, confident presence.",
        audience: "New ventures and rebrands",
        leadMetric: "Clarity in positioning",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Plan",
            price: "$1,800",
            summary: "Core identity essentials for fast-moving brands.",
            turnaround: "10 days",
            ctaLabel: "Select Basic Plan",
            features: ["Logo system", "Color palette", "Typography direction", "Mini brand guide"],
            deliverables: ["Logo system", "Color palette", "Type set", "Mini guide"]
          },
          {
            slug: "standard",
            title: "Standard Plan",
            price: "$3,600",
            summary: "A fuller visual system with strategic brand logic.",
            turnaround: "2 weeks",
            ctaLabel: "Select Standard Plan",
            features: ["Brand strategy workshop", "Expanded identity kit", "Social templates", "Brand guidelines"],
            deliverables: ["Workshop summary", "Identity system", "Social templates", "Brand guidelines"]
          },
          {
            slug: "premium",
            title: "Premium Plan",
            price: "$6,500",
            summary: "A launch-ready identity system built for long-term scale.",
            turnaround: "3 weeks",
            ctaLabel: "Select Premium Plan",
            features: ["Naming alignment", "Messaging direction", "Visual system suite", "Collateral applications"],
            deliverables: ["Naming direction", "Messaging framework", "Visual suite", "Collateral mockups"]
          }
        ]
      },
      {
        slug: "packaging",
        title: "Packaging Design",
        description: "Premium packaging systems that improve perception on shelf and online.",
        audience: "Product brands and luxury commerce",
        leadMetric: "Shelf-impact visuals",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Plan",
            price: "$1,500",
            summary: "Clean packaging concepts for focused SKUs.",
            turnaround: "8 days",
            ctaLabel: "Select Basic Plan",
            features: ["Concept direction", "Primary pack layout", "Print-ready files", "Material suggestions"],
            deliverables: ["Concept board", "Layout files", "Print-ready outputs", "Material suggestions"]
          },
          {
            slug: "standard",
            title: "Standard Plan",
            price: "$3,100",
            summary: "A stronger packaging system with brand consistency.",
            turnaround: "12 days",
            ctaLabel: "Select Standard Plan",
            features: ["Multi-SKU system", "Mockup visuals", "Production support", "Finishing guidance"],
            deliverables: ["SKU system", "Mockups", "Production notes", "Finishing guide"]
          },
          {
            slug: "premium",
            title: "Premium Plan",
            price: "$5,900",
            summary: "Luxury packaging design with elevated tactile strategy.",
            turnaround: "3 weeks",
            ctaLabel: "Select Premium Plan",
            features: ["Premium structural concepts", "Unboxing direction", "Print liaison", "Launch presentation assets"],
            deliverables: ["Structural concepts", "Unboxing guide", "Print liaison brief", "Launch assets"]
          }
        ]
      }
    ]
  },
  {
    name: "Web Development",
    title: "Web Development",
    slug: "web-development",
    description:
      "Performance-led digital platforms that combine premium design, conversion logic, and scalable architecture.",
    href: "/services/web-development",
    points: ["Web platforms", "Product systems", "Optimization workflows"],
    intro:
      "We design and build digital products that feel luxurious, move fast, and create measurable business outcomes.",
    accent: "Digital",
    categories: [
      {
        slug: "company-sites",
        title: "Company Websites",
        description: "High-end brand sites for companies that need premium presentation and performance.",
        audience: "Service brands and high-growth teams",
        leadMetric: "Brand-first conversion design",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Plan",
            price: "$2,400",
            summary: "A refined company site for modern positioning.",
            turnaround: "2 weeks",
            ctaLabel: "Select Basic Plan",
            features: ["Up to 5 pages", "Responsive design", "CMS-ready structure", "Basic SEO setup"],
            deliverables: ["5-page build", "Responsive UI", "CMS structure", "SEO basics"]
          },
          {
            slug: "standard",
            title: "Standard Plan",
            price: "$5,800",
            summary: "A premium corporate site with stronger content and UX depth.",
            turnaround: "3 weeks",
            ctaLabel: "Select Standard Plan",
            features: ["Custom interactions", "Content architecture", "Performance optimization", "Analytics setup"],
            deliverables: ["Custom interactions", "Information architecture", "Performance pass", "Analytics"]
          },
          {
            slug: "premium",
            title: "Premium Plan",
            price: "$10,500",
            summary: "A flagship digital presence built to lead a category.",
            turnaround: "5 weeks",
            ctaLabel: "Select Premium Plan",
            features: ["Advanced motion", "Scalable component system", "Multi-language ready", "Launch support"],
            deliverables: ["Motion system", "Component library", "Localization-ready setup", "Launch support"]
          }
        ]
      },
      {
        slug: "landing-pages",
        title: "Landing Pages",
        description: "High-conversion landing systems for launches, offers, and performance campaigns.",
        audience: "Campaign and growth teams",
        leadMetric: "Fast deployment",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Plan",
            price: "$900",
            summary: "A focused landing page for one offer or launch.",
            turnaround: "4 days",
            ctaLabel: "Select Basic Plan",
            features: ["Single page build", "CTA optimization", "Responsive layout", "Basic analytics"],
            deliverables: ["Single page", "CTA structure", "Responsive build", "Analytics hook"]
          },
          {
            slug: "standard",
            title: "Standard Plan",
            price: "$1,900",
            summary: "A campaign-ready landing experience with stronger polish.",
            turnaround: "6 days",
            ctaLabel: "Select Standard Plan",
            features: ["Motion interactions", "Form integration", "A/B-ready structure", "Lead tracking"],
            deliverables: ["Motion layer", "Form integration", "A/B-ready sections", "Lead tracking"]
          },
          {
            slug: "premium",
            title: "Premium Plan",
            price: "$3,400",
            summary: "A premium launch page system with advanced storytelling.",
            turnaround: "8 days",
            ctaLabel: "Select Premium Plan",
            features: ["Advanced visual narrative", "Campaign variants", "Speed optimization", "Post-launch support"],
            deliverables: ["Narrative design", "Variant set", "Speed optimization", "Support window"]
          }
        ]
      }
    ]
  },
  {
    name: "Media Production",
    title: "Media Production",
    slug: "media",
    description:
      "Cinematic visual content for launches, campaigns, social channels, and branded storytelling.",
    href: "/services/media",
    points: ["Photo direction", "Video production", "Post-production polish"],
    intro:
      "Stroke produces media assets that elevate perception, amplify campaigns, and bring premium brand systems to life.",
    accent: "Content",
    categories: [
      {
        slug: "brand-films",
        title: "Brand Films",
        description: "Short-form cinematic films that communicate positioning, emotion, and premium craft.",
        audience: "Luxury, hospitality, and product brands",
        leadMetric: "High-impact storytelling",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Plan",
            price: "$2,200",
            summary: "A polished short brand film for digital launch moments.",
            turnaround: "8 days",
            ctaLabel: "Select Basic Plan",
            features: ["Creative outline", "Half-day shoot", "Edited film", "Social cutdown"],
            deliverables: ["Creative outline", "Shoot session", "Edited film", "Social cutdown"]
          },
          {
            slug: "standard",
            title: "Standard Plan",
            price: "$4,900",
            summary: "A stronger brand narrative with elevated production design.",
            turnaround: "12 days",
            ctaLabel: "Select Standard Plan",
            features: ["Script support", "Full-day shoot", "Color grading", "Multi-format exports"],
            deliverables: ["Script support", "Shoot day", "Color grade", "Export kit"]
          },
          {
            slug: "premium",
            title: "Premium Plan",
            price: "$8,600",
            summary: "A cinematic premium production with campaign-ready outputs.",
            turnaround: "3 weeks",
            ctaLabel: "Select Premium Plan",
            features: ["Creative direction", "Location planning", "Motion titles", "Launch asset package"],
            deliverables: ["Creative direction", "Location planning", "Motion titles", "Launch assets"]
          }
        ]
      },
      {
        slug: "social-content",
        title: "Social Content",
        description: "Platform-ready content systems built to keep a premium brand presence active and consistent.",
        audience: "Brands with active digital audiences",
        leadMetric: "Content velocity",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Plan",
            price: "$950",
            summary: "A compact monthly content package with polished assets.",
            turnaround: "5 days",
            ctaLabel: "Select Basic Plan",
            features: ["Content planning", "6 edited assets", "Caption prompts", "Delivery calendar"],
            deliverables: ["Planning doc", "6 assets", "Caption prompts", "Calendar"]
          },
          {
            slug: "standard",
            title: "Standard Plan",
            price: "$2,100",
            summary: "A more complete content stream with mixed formats.",
            turnaround: "7 days",
            ctaLabel: "Select Standard Plan",
            features: ["Monthly shoot", "12 mixed assets", "Short-form edits", "Publishing guidance"],
            deliverables: ["Monthly shoot", "12 assets", "Edits", "Publishing guide"]
          },
          {
            slug: "premium",
            title: "Premium Plan",
            price: "$4,300",
            summary: "A premium content engine for ambitious brand growth.",
            turnaround: "10 days",
            ctaLabel: "Select Premium Plan",
            features: ["Creative direction", "Reels and stills", "Content pillars", "Channel optimization support"],
            deliverables: ["Creative direction", "Reels and stills", "Content pillars", "Optimization support"]
          }
        ]
      }
    ]
  },
  {
    name: "Marketing Solutions",
    title: "Marketing Solutions",
    slug: "marketing",
    description:
      "Growth systems that combine campaign strategy, paid media, content, and optimization into one performance layer.",
    href: "/services/marketing",
    points: ["Campaign strategy", "Paid growth", "Retention systems"],
    intro:
      "Stroke aligns premium creative with measurable demand generation so the brand experience and growth engine support each other.",
    accent: "Growth",
    categories: [
      {
        slug: "social-media",
        title: "Social Media Marketing",
        description: "Campaign planning and channel systems for brands that need consistent digital presence.",
        audience: "Lifestyle and growth-stage brands",
        leadMetric: "Channel consistency",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Plan",
            price: "$1,200",
            summary: "A clean management layer for foundational growth.",
            turnaround: "Monthly",
            ctaLabel: "Select Basic Plan",
            features: ["Content calendar", "Publishing support", "Basic analytics", "Monthly reporting"],
            deliverables: ["Calendar", "Publishing support", "Analytics snapshot", "Monthly report"]
          },
          {
            slug: "standard",
            title: "Standard Plan",
            price: "$2,700",
            summary: "A stronger growth package with campaign support.",
            turnaround: "Monthly",
            ctaLabel: "Select Standard Plan",
            features: ["Campaign planning", "Ad creative support", "Community guidance", "Performance review"],
            deliverables: ["Campaign plan", "Creative support", "Community guide", "Performance review"]
          },
          {
            slug: "premium",
            title: "Premium Plan",
            price: "$4,900",
            summary: "A premium social growth engine with full strategic oversight.",
            turnaround: "Monthly",
            ctaLabel: "Select Premium Plan",
            features: ["Multi-channel strategy", "Creator coordination", "Advanced reporting", "Quarterly roadmap"],
            deliverables: ["Channel strategy", "Creator coordination", "Reporting suite", "Roadmap"]
          }
        ]
      },
      {
        slug: "paid-ads",
        title: "Paid Advertising",
        description: "Paid media strategy and campaign systems built for efficient high-quality acquisition.",
        audience: "Brands investing in scalable demand generation",
        leadMetric: "Performance-led creative",
        customOptionEnabled: true,
        plans: [
          {
            slug: "basic",
            title: "Basic Plan",
            price: "$1,500",
            summary: "A streamlined paid setup for focused campaigns.",
            turnaround: "Monthly",
            ctaLabel: "Select Basic Plan",
            features: ["Channel setup", "Audience mapping", "Campaign launch", "Bi-weekly optimization"],
            deliverables: ["Channel setup", "Audience map", "Launch package", "Optimization cycle"]
          },
          {
            slug: "standard",
            title: "Standard Plan",
            price: "$3,400",
            summary: "A more active growth system with testing cycles.",
            turnaround: "Monthly",
            ctaLabel: "Select Standard Plan",
            features: ["Creative testing", "Landing page recommendations", "Reporting dashboard", "Budget optimization"],
            deliverables: ["Testing plan", "LP recommendations", "Dashboard", "Budget optimization"]
          },
          {
            slug: "premium",
            title: "Premium Plan",
            price: "$6,100",
            summary: "A premium acquisition engine for aggressive scale.",
            turnaround: "Monthly",
            ctaLabel: "Select Premium Plan",
            features: ["Cross-platform management", "Creative strategy", "Funnel optimization", "Executive reporting"],
            deliverables: ["Platform management", "Creative strategy", "Funnel optimization", "Executive report"]
          }
        ]
      }
    ]
  }
];
