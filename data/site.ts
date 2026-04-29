export type Plan = {
  name: string;
  price: string;
  summary: string;
  features: string[];
  turnaround: string;
};

export type ServiceCategory = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  leadMetric: string;
  plans: Plan[];
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  href: string;
  points: string[];
  intro: string;
  accent: string;
  categories: ServiceCategory[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  metrics: string;
  challenge: string;
  solution: string;
  outcomes: string[];
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const company = {
  name: "Stroke",
  owner: "Mohamed Zidan",
  email: "Stroke.digi@gmail.com",
  phone: "01094677006",
  phones: ["01094677006", "01000713820"],
  location: "El Sahafa Street, El Manshia,, Alexandria, Egypt, 21519",
  tagline:
    "A luxury digital agency platform unifying events, branding, web development, media, and marketing into one premium system.",
  description:
    "Stroke is a modern multi-service agency that creates connected brand experiences across digital products, visual identity, live events, media production, and growth campaigns.",
  mission:
    "To give ambitious brands one refined platform for strategy, production, and launch-ready execution.",
  vision:
    "To become the agency operating system for companies that want premium creative delivery without fragmented vendors."
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
] as const;

export const services: Service[] = [
  {
    slug: "events-management",
    title: "Events Management",
    description:
      "Curated event systems for milestones, launches, and premium guest experiences with seamless execution.",
    href: "/services/events-management",
    points: ["Concept design", "Guest experience", "Vendor orchestration"],
    intro:
      "From private celebrations to corporate activations, Stroke designs event experiences that feel elevated, organized, and memorable at every touchpoint.",
    accent: "Experiences",
    categories: [
      {
        slug: "graduation-parties",
        title: "Graduation Parties",
        description:
          "Stylish celebration packages for milestone moments with polished branding, staging, and guest flow.",
        audience: "Families, schools, and premium private hosts",
        leadMetric: "Fast-turn event styling",
        plans: [
          {
            name: "Basic Plan",
            price: "$1,200",
            summary: "An elegant entry package for intimate celebrations.",
            turnaround: "7 days",
            features: ["Theme consultation", "Guest layout planning", "Decor essentials", "Event-day coordination"]
          },
          {
            name: "Standard Plan",
            price: "$2,700",
            summary: "A fuller celebration system with styling and media coverage.",
            turnaround: "10 days",
            features: [
              "Custom event identity",
              "Upgraded decor styling",
              "Photo coverage",
              "Guest experience coordination"
            ]
          },
          {
            name: "Premium Plan",
            price: "$4,900",
            summary: "A luxury event build with full creative direction.",
            turnaround: "14 days",
            features: ["Creative concept board", "Premium staging", "Video highlight reel", "On-site production lead"]
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
        plans: [
          {
            name: "Basic Plan",
            price: "$3,800",
            summary: "Refined planning support for curated intimate weddings.",
            turnaround: "3 weeks",
            features: ["Planning consultation", "Vendor shortlist", "Moodboard styling", "Day-of coordination"]
          },
          {
            name: "Standard Plan",
            price: "$7,200",
            summary: "Balanced creative planning and guest experience support.",
            turnaround: "4 weeks",
            features: ["Visual concept direction", "Vendor management", "Guest flow design", "Photography support"]
          },
          {
            name: "Premium Plan",
            price: "$12,500",
            summary: "Full-scale luxury wedding production and storytelling.",
            turnaround: "6 weeks",
            features: ["Full event production", "Custom print suite", "Cinema-style recap", "Dedicated event team"]
          }
        ]
      },
      {
        slug: "corporate-events",
        title: "Corporate Events",
        description:
          "Launches, conferences, and internal experiences designed with brand clarity and operational control.",
        audience: "Companies and executive teams",
        leadMetric: "Brand-safe execution",
        plans: [
          {
            name: "Basic Plan",
            price: "$2,500",
            summary: "A clean package for focused business gatherings.",
            turnaround: "10 days",
            features: ["Event format planning", "Run-of-show", "Vendor coordination", "Brand-ready staging"]
          },
          {
            name: "Standard Plan",
            price: "$5,500",
            summary: "A professional system for polished branded events.",
            turnaround: "2 weeks",
            features: ["Branded environment design", "AV coordination", "Host support", "Photo coverage"]
          },
          {
            name: "Premium Plan",
            price: "$9,800",
            summary: "An executive-level activation with full creative control.",
            turnaround: "3 weeks",
            features: ["Event creative direction", "Motion visuals", "Media capture team", "Guest journey production"]
          }
        ]
      },
      {
        slug: "private-events",
        title: "Private Events",
        description:
          "Tailored private experiences designed around intimacy, atmosphere, and elevated service.",
        audience: "Private clients and luxury hosts",
        leadMetric: "Personalized curation",
        plans: [
          {
            name: "Basic Plan",
            price: "$1,500",
            summary: "A minimal premium setup for smaller private moments.",
            turnaround: "5 days",
            features: ["Event consultation", "Simple styling", "Vendor liaison", "Setup checklist"]
          },
          {
            name: "Standard Plan",
            price: "$3,200",
            summary: "A polished package with stronger atmosphere and execution.",
            turnaround: "8 days",
            features: ["Theme styling", "Spatial planning", "Hospitality coordination", "Photo documentation"]
          },
          {
            name: "Premium Plan",
            price: "$6,400",
            summary: "An immersive private experience built around custom detail.",
            turnaround: "12 days",
            features: ["Bespoke experience design", "Luxury decor sourcing", "Media production", "On-site management"]
          }
        ]
      }
    ]
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    description:
      "Identity systems, visual direction, and premium brand language designed to position businesses with distinction.",
    href: "/services/branding-design",
    points: ["Brand strategy", "Identity systems", "Packaging and collateral"],
    intro:
      "Stroke builds brand systems that look sophisticated, feel intentional, and stay consistent across every public touchpoint.",
    accent: "Identity",
    categories: [
      {
        slug: "brand-identity",
        title: "Brand Identity",
        description: "Foundational identity design for brands that need a premium, confident presence.",
        audience: "New ventures and rebrands",
        leadMetric: "Clarity in positioning",
        plans: [
          {
            name: "Basic Plan",
            price: "$1,800",
            summary: "Core identity essentials for fast-moving brands.",
            turnaround: "10 days",
            features: ["Logo system", "Color palette", "Typography direction", "Mini brand guide"]
          },
          {
            name: "Standard Plan",
            price: "$3,600",
            summary: "A fuller visual system with strategic brand logic.",
            turnaround: "2 weeks",
            features: ["Brand strategy workshop", "Expanded identity kit", "Social templates", "Brand guidelines"]
          },
          {
            name: "Premium Plan",
            price: "$6,500",
            summary: "A launch-ready identity system built for long-term scale.",
            turnaround: "3 weeks",
            features: ["Naming alignment", "Messaging direction", "Visual system suite", "Collateral applications"]
          }
        ]
      },
      {
        slug: "packaging-design",
        title: "Packaging Design",
        description: "Premium packaging systems that improve perception on shelf and online.",
        audience: "Product brands and luxury commerce",
        leadMetric: "Shelf-impact visuals",
        plans: [
          {
            name: "Basic Plan",
            price: "$1,500",
            summary: "Clean packaging concepts for focused SKUs.",
            turnaround: "8 days",
            features: ["Concept direction", "Primary pack layout", "Print-ready files", "Material suggestions"]
          },
          {
            name: "Standard Plan",
            price: "$3,100",
            summary: "A stronger packaging system with brand consistency.",
            turnaround: "12 days",
            features: ["Multi-SKU system", "Mockup visuals", "Production support", "Finishing guidance"]
          },
          {
            name: "Premium Plan",
            price: "$5,900",
            summary: "Luxury packaging design with elevated tactile strategy.",
            turnaround: "3 weeks",
            features: ["Premium structural concepts", "Unboxing direction", "Print liaison", "Launch presentation assets"]
          }
        ]
      },
      {
        slug: "editorial-design",
        title: "Editorial Design",
        description: "High-end layouts for lookbooks, company profiles, and branded publications.",
        audience: "Fashion, hospitality, and luxury teams",
        leadMetric: "High-end visual narrative",
        plans: [
          {
            name: "Basic Plan",
            price: "$1,400",
            summary: "Refined editorial layouts for concise storytelling.",
            turnaround: "7 days",
            features: ["Layout concept", "Typography styling", "Up to 12 pages", "Print-ready export"]
          },
          {
            name: "Standard Plan",
            price: "$2,900",
            summary: "A more expansive editorial system with art direction.",
            turnaround: "10 days",
            features: ["Art direction", "Up to 24 pages", "Visual hierarchy design", "Proofing support"]
          },
          {
            name: "Premium Plan",
            price: "$5,100",
            summary: "Luxury publication design with presentation polish.",
            turnaround: "2 weeks",
            features: ["Multi-format outputs", "Cover design", "Motion teaser assets", "Press-ready production files"]
          }
        ]
      },
      {
        slug: "campaign-design",
        title: "Campaign Design",
        description: "Visual systems for launches and seasonal campaigns with premium consistency.",
        audience: "Marketing teams and growing brands",
        leadMetric: "Launch-ready campaign visuals",
        plans: [
          {
            name: "Basic Plan",
            price: "$1,600",
            summary: "Essential campaign assets for clean rollout.",
            turnaround: "6 days",
            features: ["Key visual", "Social cutdowns", "Landing header assets", "Design toolkit"]
          },
          {
            name: "Standard Plan",
            price: "$3,400",
            summary: "A broader campaign package spanning digital and print.",
            turnaround: "10 days",
            features: ["Campaign identity", "Ad creatives", "Print extensions", "Delivery toolkit"]
          },
          {
            name: "Premium Plan",
            price: "$6,200",
            summary: "A luxury cross-channel campaign system with launch support.",
            turnaround: "2 weeks",
            features: ["Full art direction", "Motion-ready assets", "OOH concepts", "Launch week support"]
          }
        ]
      }
    ]
  },
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Performance-led digital platforms that combine premium design, conversion logic, and scalable architecture.",
    href: "/services/web-development",
    points: ["Web platforms", "Product systems", "Optimization workflows"],
    intro:
      "We design and build digital products that feel luxurious, move fast, and create measurable business outcomes.",
    accent: "Digital",
    categories: [
      {
        slug: "company-websites",
        title: "Company Websites",
        description: "High-end brand sites for companies that need premium presentation and performance.",
        audience: "Service brands and high-growth teams",
        leadMetric: "Brand-first conversion design",
        plans: [
          {
            name: "Basic Plan",
            price: "$2,400",
            summary: "A refined company site for modern positioning.",
            turnaround: "2 weeks",
            features: ["Up to 5 pages", "Responsive design", "CMS-ready structure", "Basic SEO setup"]
          },
          {
            name: "Standard Plan",
            price: "$5,800",
            summary: "A premium corporate site with stronger content and UX depth.",
            turnaround: "3 weeks",
            features: ["Custom interactions", "Content architecture", "Performance optimization", "Analytics setup"]
          },
          {
            name: "Premium Plan",
            price: "$10,500",
            summary: "A flagship digital presence built to lead a category.",
            turnaround: "5 weeks",
            features: ["Advanced motion", "Scalable component system", "Multi-language ready", "Launch support"]
          }
        ]
      },
      {
        slug: "ecommerce-platforms",
        title: "E-Commerce Platforms",
        description: "Conversion-focused commerce systems built for premium product presentation.",
        audience: "Retail and luxury commerce brands",
        leadMetric: "Revenue-focused UX",
        plans: [
          {
            name: "Basic Plan",
            price: "$3,500",
            summary: "A clean online store for focused product catalogs.",
            turnaround: "3 weeks",
            features: ["Storefront setup", "Payment integration", "Mobile optimization", "Product template design"]
          },
          {
            name: "Standard Plan",
            price: "$7,900",
            summary: "A stronger commerce experience with richer merchandising.",
            turnaround: "4 weeks",
            features: ["Custom collection pages", "Conversion modules", "Email integration", "Analytics dashboards"]
          },
          {
            name: "Premium Plan",
            price: "$14,800",
            summary: "A luxury commerce platform with advanced brand storytelling.",
            turnaround: "6 weeks",
            features: ["Custom checkout logic", "Editorial product storytelling", "Automation flows", "Growth handoff"]
          }
        ]
      },
      {
        slug: "landing-pages",
        title: "Landing Pages",
        description: "High-conversion landing systems for launches, offers, and performance campaigns.",
        audience: "Campaign and growth teams",
        leadMetric: "Fast deployment",
        plans: [
          {
            name: "Basic Plan",
            price: "$900",
            summary: "A focused landing page for one offer or launch.",
            turnaround: "4 days",
            features: ["Single page build", "CTA optimization", "Responsive layout", "Basic analytics"]
          },
          {
            name: "Standard Plan",
            price: "$1,900",
            summary: "A campaign-ready landing experience with stronger polish.",
            turnaround: "6 days",
            features: ["Motion interactions", "Form integration", "A/B-ready structure", "Lead tracking"]
          },
          {
            name: "Premium Plan",
            price: "$3,400",
            summary: "A premium launch page system with advanced storytelling.",
            turnaround: "8 days",
            features: ["Advanced visual narrative", "Campaign variants", "Speed optimization", "Post-launch support"]
          }
        ]
      },
      {
        slug: "client-portals",
        title: "Client Portals",
        description: "Custom internal or client-facing systems that streamline delivery and communication.",
        audience: "Agencies, consultancies, and service businesses",
        leadMetric: "Operational clarity",
        plans: [
          {
            name: "Basic Plan",
            price: "$4,800",
            summary: "A focused portal for content, files, and communication.",
            turnaround: "3 weeks",
            features: ["Secure access", "Dashboard UI", "File management", "Status updates"]
          },
          {
            name: "Standard Plan",
            price: "$9,500",
            summary: "A custom workflow system tailored to client operations.",
            turnaround: "5 weeks",
            features: ["Role-based views", "Automated actions", "Admin controls", "Usage tracking"]
          },
          {
            name: "Premium Plan",
            price: "$17,000",
            summary: "A scalable digital operations layer with enterprise polish.",
            turnaround: "7 weeks",
            features: ["Custom architecture", "System integrations", "Advanced security", "Strategic rollout support"]
          }
        ]
      }
    ]
  },
  {
    slug: "media-production",
    title: "Media Production",
    description:
      "Cinematic visual content for launches, campaigns, social channels, and branded storytelling.",
    href: "/services/media-production",
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
        plans: [
          {
            name: "Basic Plan",
            price: "$2,200",
            summary: "A polished short brand film for digital launch moments.",
            turnaround: "8 days",
            features: ["Creative outline", "Half-day shoot", "Edited film", "Social cutdown"]
          },
          {
            name: "Standard Plan",
            price: "$4,900",
            summary: "A stronger brand narrative with elevated production design.",
            turnaround: "12 days",
            features: ["Script support", "Full-day shoot", "Color grading", "Multi-format exports"]
          },
          {
            name: "Premium Plan",
            price: "$8,600",
            summary: "A cinematic premium production with campaign-ready outputs.",
            turnaround: "3 weeks",
            features: ["Creative direction", "Location planning", "Motion titles", "Launch asset package"]
          }
        ]
      },
      {
        slug: "product-photography",
        title: "Product Photography",
        description: "Commercial product visuals crafted for luxury presentation and conversion.",
        audience: "Retail and product-led brands",
        leadMetric: "Elevated product perception",
        plans: [
          {
            name: "Basic Plan",
            price: "$1,100",
            summary: "Clean studio product imagery for essentials.",
            turnaround: "5 days",
            features: ["Studio shoot", "Retouched stills", "White-background exports", "Web-ready delivery"]
          },
          {
            name: "Standard Plan",
            price: "$2,400",
            summary: "A richer visual set with styled presentation.",
            turnaround: "7 days",
            features: ["Styled scene setup", "Retouched selections", "Detail shots", "Social-ready crops"]
          },
          {
            name: "Premium Plan",
            price: "$4,700",
            summary: "A luxury product media package for hero launches.",
            turnaround: "10 days",
            features: ["Creative art direction", "Set design", "Motion snippets", "Campaign-ready visual pack"]
          }
        ]
      },
      {
        slug: "social-content",
        title: "Social Content",
        description: "Platform-ready content systems built to keep a premium brand presence active and consistent.",
        audience: "Brands with active digital audiences",
        leadMetric: "Content velocity",
        plans: [
          {
            name: "Basic Plan",
            price: "$950",
            summary: "A compact monthly content package with polished assets.",
            turnaround: "5 days",
            features: ["Content planning", "6 edited assets", "Caption prompts", "Delivery calendar"]
          },
          {
            name: "Standard Plan",
            price: "$2,100",
            summary: "A more complete content stream with mixed formats.",
            turnaround: "7 days",
            features: ["Monthly shoot", "12 mixed assets", "Short-form edits", "Publishing guidance"]
          },
          {
            name: "Premium Plan",
            price: "$4,300",
            summary: "A premium content engine for ambitious brand growth.",
            turnaround: "10 days",
            features: ["Creative direction", "Reels and stills", "Content pillars", "Channel optimization support"]
          }
        ]
      },
      {
        slug: "event-coverage",
        title: "Event Coverage",
        description: "Live event photography and cinematic recap content designed for premium post-event storytelling.",
        audience: "Brands, hosts, and event teams",
        leadMetric: "Same-week recap delivery",
        plans: [
          {
            name: "Basic Plan",
            price: "$1,300",
            summary: "Coverage for smaller events with quick delivery.",
            turnaround: "3 days",
            features: ["Single shooter", "Event highlights", "Edited gallery", "Short recap edit"]
          },
          {
            name: "Standard Plan",
            price: "$2,800",
            summary: "A more robust capture setup for branded events.",
            turnaround: "5 days",
            features: ["Photo and video team", "Guest highlights", "Branded edit", "Social snippets"]
          },
          {
            name: "Premium Plan",
            price: "$5,200",
            summary: "Luxury event documentation with cinematic polish.",
            turnaround: "7 days",
            features: ["Multi-camera capture", "Interviews or testimonials", "Premium recap film", "Priority turnaround"]
          }
        ]
      }
    ]
  },
  {
    slug: "marketing-solutions",
    title: "Marketing Solutions",
    description:
      "Growth systems that combine campaign strategy, paid media, content, and optimization into one performance layer.",
    href: "/services/marketing-solutions",
    points: ["Campaign strategy", "Paid growth", "Retention systems"],
    intro:
      "Stroke aligns premium creative with measurable demand generation so the brand experience and growth engine support each other.",
    accent: "Growth",
    categories: [
      {
        slug: "social-media-marketing",
        title: "Social Media Marketing",
        description: "Campaign planning and channel systems for brands that need consistent digital presence.",
        audience: "Lifestyle and growth-stage brands",
        leadMetric: "Channel consistency",
        plans: [
          {
            name: "Basic Plan",
            price: "$1,200",
            summary: "A clean management layer for foundational growth.",
            turnaround: "Monthly",
            features: ["Content calendar", "Publishing support", "Basic analytics", "Monthly reporting"]
          },
          {
            name: "Standard Plan",
            price: "$2,700",
            summary: "A stronger growth package with campaign support.",
            turnaround: "Monthly",
            features: ["Campaign planning", "Ad creative support", "Community guidance", "Performance review"]
          },
          {
            name: "Premium Plan",
            price: "$4,900",
            summary: "A premium social growth engine with full strategic oversight.",
            turnaround: "Monthly",
            features: ["Multi-channel strategy", "Creator coordination", "Advanced reporting", "Quarterly roadmap"]
          }
        ]
      },
      {
        slug: "paid-advertising",
        title: "Paid Advertising",
        description: "Paid media strategy and campaign systems built for efficient high-quality acquisition.",
        audience: "Brands investing in scalable demand generation",
        leadMetric: "Performance-led creative",
        plans: [
          {
            name: "Basic Plan",
            price: "$1,500",
            summary: "A streamlined paid setup for focused campaigns.",
            turnaround: "Monthly",
            features: ["Channel setup", "Audience mapping", "Campaign launch", "Bi-weekly optimization"]
          },
          {
            name: "Standard Plan",
            price: "$3,400",
            summary: "A more active growth system with testing cycles.",
            turnaround: "Monthly",
            features: ["Creative testing", "Landing page recommendations", "Reporting dashboard", "Budget optimization"]
          },
          {
            name: "Premium Plan",
            price: "$6,100",
            summary: "A premium acquisition engine for aggressive scale.",
            turnaround: "Monthly",
            features: ["Cross-platform management", "Creative strategy", "Funnel optimization", "Executive reporting"]
          }
        ]
      },
      {
        slug: "email-retention",
        title: "Email & Retention",
        description: "Lifecycle messaging and automated retention systems for stronger customer value.",
        audience: "E-commerce and client-based businesses",
        leadMetric: "Retention-focused automation",
        plans: [
          {
            name: "Basic Plan",
            price: "$950",
            summary: "Core retention flows and monthly campaigns.",
            turnaround: "Monthly",
            features: ["Welcome flow", "Monthly campaign", "Template styling", "Basic reporting"]
          },
          {
            name: "Standard Plan",
            price: "$2,200",
            summary: "A structured lifecycle system with better segmentation.",
            turnaround: "Monthly",
            features: ["Segmentation setup", "3 flow automations", "Campaign calendar", "Conversion analysis"]
          },
          {
            name: "Premium Plan",
            price: "$4,100",
            summary: "A premium CRM retention engine aligned with brand storytelling.",
            turnaround: "Monthly",
            features: ["Advanced lifecycle mapping", "Custom templates", "A/B testing", "Strategic optimization"]
          }
        ]
      },
      {
        slug: "launch-campaigns",
        title: "Launch Campaigns",
        description: "Integrated launch systems that bring brand, media, and promotion together around one moment.",
        audience: "Product launches and major announcements",
        leadMetric: "Launch-day alignment",
        plans: [
          {
            name: "Basic Plan",
            price: "$2,000",
            summary: "A clean campaign package for focused launch windows.",
            turnaround: "2 weeks",
            features: ["Launch messaging", "Asset planning", "Channel rollout", "Performance checklist"]
          },
          {
            name: "Standard Plan",
            price: "$4,500",
            summary: "A stronger campaign system with richer cross-channel support.",
            turnaround: "3 weeks",
            features: ["Campaign calendar", "Paid and organic coordination", "Launch reporting", "Creative toolkit"]
          },
          {
            name: "Premium Plan",
            price: "$8,200",
            summary: "A premium launch platform designed for visibility and momentum.",
            turnaround: "4 weeks",
            features: ["Integrated launch strategy", "Media planning", "Content production support", "Post-launch optimization"]
          }
        ]
      }
    ]
  }
];

export const processSteps = [
  {
    title: "Frame",
    description: "We map the commercial goal, customer experience, and creative opportunity before execution begins."
  },
  {
    title: "Architect",
    description: "Service flows, content systems, and launch assets are designed as one premium platform."
  },
  {
    title: "Produce",
    description: "Design, code, media, event operations, and marketing assets are built with unified quality control."
  },
  {
    title: "Launch",
    description: "Every touchpoint goes live with performance review, refinement, and future-ready structure."
  }
];

export const whyChooseUs = [
  "Every service category is designed as a premium system, not a disconnected deliverable.",
  "Creative direction and technical execution live inside one operating model.",
  "Luxury-level spacing, motion, and visual consistency across digital and physical experiences.",
  "Built for launch now and expansion later with scalable routes, data structures, and reusable UI."
];

export const portfolio: Project[] = [
  {
    slug: "aurora-private-launch",
    title: "Aurora Private Launch",
    category: "Events management",
    description:
      "A luxury launch event system blending guest experience design, cinematic capture, and branded physical assets.",
    metrics: "180 VIP guests",
    challenge:
      "The client needed a one-night event to feel cinematic in person while also generating polished media for post-launch traction.",
    solution:
      "Stroke designed the event flow, handled production styling, directed coverage, and produced all branded collateral as one connected system.",
    outcomes: ["92% RSVP attendance", "Same-week recap delivery", "Multi-channel launch asset pack"]
  },
  {
    slug: "atelier-commerce-platform",
    title: "Atelier Commerce Platform",
    category: "Web development",
    description:
      "A premium digital commerce experience built to elevate product perception and improve conversion performance.",
    metrics: "47% lift in qualified leads",
    challenge:
      "The brand had strong products but lacked a digital platform that matched its premium positioning or supported growth marketing.",
    solution:
      "We rebuilt the site architecture, created a modular design system, and aligned campaign landing pages with a faster content workflow.",
    outcomes: ["Improved mobile engagement", "Faster campaign deployment", "Higher quality conversion paths"]
  },
  {
    slug: "noir-house-brand-system",
    title: "Noir House Brand System",
    category: "Branding & design",
    description:
      "A complete identity direction for a luxury hospitality concept across print, digital, and launch visuals.",
    metrics: "6-week rebrand rollout",
    challenge:
      "The client required a brand language that felt timeless, premium, and adaptable across editorial, packaging, and launch collateral.",
    solution:
      "Stroke delivered strategy, identity, packaging direction, and campaign design with consistent luxury cues across every application.",
    outcomes: ["Unified cross-channel identity", "Premium launch materials", "Scalable brand guidelines"]
  },
  {
    slug: "signal-growth-engine",
    title: "Signal Growth Engine",
    category: "Marketing solutions",
    description:
      "A campaign and retention system that merged paid media, email flows, and content strategy into one growth operation.",
    metrics: "3.2x campaign ROI",
    challenge:
      "The client had fragmented acquisition channels and inconsistent retention messaging across its digital funnel.",
    solution:
      "We aligned acquisition creative, landing pages, CRM flows, and reporting into a more coherent growth system.",
    outcomes: ["Lower acquisition waste", "Stronger retention flow performance", "Executive-level reporting visibility"]
  }
];

export const stats = [
  { value: "5", label: "Integrated agency pillars operating inside one premium platform" },
  { value: "20+", label: "Structured service categories ready for plan-based expansion" },
  { value: "98%", label: "Client retention across high-touch strategic engagements" }
];

export const testimonials: Testimonial[] = [
  {
    name: "Maya Patel",
    role: "Founder, Atelier Maison",
    quote:
      "Stroke delivered more than a website. They built a complete launch environment that felt expensive, intentional, and commercially smart."
  },
  {
    name: "David Romero",
    role: "Marketing Director, Signal Labs",
    quote:
      "The difference was integration. Strategy, motion, content, and performance all felt like one premium system instead of separate vendors."
  },
  {
    name: "Nadia Brooks",
    role: "Events Lead, Aurora Group",
    quote:
      "Our event looked exceptional in person and even better in the media rollout afterwards. Stroke handled both with rare precision."
  }
];

export const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Behance", href: "https://behance.net" }
];

export function getServiceBySlug(serviceSlug: string) {
  return services.find((service) => service.slug === serviceSlug);
}

export function getCategoryBySlug(serviceSlug: string, categorySlug: string) {
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return null;
  }

  return service.categories.find((category) => category.slug === categorySlug) ?? null;
}

export function getProjectBySlug(slug: string) {
  return portfolio.find((project) => project.slug === slug);
}
