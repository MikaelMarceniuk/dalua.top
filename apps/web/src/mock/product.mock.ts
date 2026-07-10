import { Product } from "@/lib/store"

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "nourishing-cream",
    name: "2-in-1 Nourishing Cream",
    subtitle: "Daily Moisturizing Treatment",
    price: 65,
    size: "150ml / 5.0 fl oz",
    image: "/images/nourishing-cream.png",
    tags: ["NEW", "SULFATE-FREE"],
    description:
      "A deeply nourishing, lightweight cream formulated with artisanal science to restore optimal hydration. Designed for daily rituals, it leaves hair smooth, manageable, and naturally luminous without heavy residue.",
    benefits: [
      "Defines and hydrates with botanical squalane",
      "Reduces frizz and flyaways",
      "Lightweight formula — no heaviness",
      "Color-safe and sulfate-free",
    ],
    ingredients:
      "Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Squalane (Botanical), Panthenol, Glycerin, Hydrolyzed Keratin, Camellia Sinensis Leaf Extract, Tocopheryl Acetate, Citric Acid.",
    howToUse:
      "Apply a small amount to damp or dry hair, focusing on mid-lengths to ends. Style as usual. For deep conditioning, leave on for 5 minutes before rinsing.",
    faq: [
      {
        q: "Is this suitable for fine hair?",
        a: "Yes, the lightweight formula is designed to nourish without weighing down fine or fragile hair types.",
      },
      {
        q: "Can I use it daily?",
        a: "Absolutely. It is formulated for daily use as part of your hair ritual.",
      },
    ],
  },
  {
    id: "2",
    slug: "luminous-hair-oil",
    name: "Luminous Hair Oil",
    subtitle: "Nourishing Shine Oil",
    price: 85,
    size: "50ml / 1.7 fl oz",
    image: "/images/luminous-hair-oil.png",
    tags: ["BEST SELLER"],
    description:
      "A lightweight, silkening elixir designed to smooth cuticles, deliver deep hydration, and impart a luminous, mirror-like finish without weighing down your hair. Crafted with artisanal precision and potent botanicals.",
    benefits: [
      "Seals split ends and imparts glass-like shine",
      "Tames frizz instantly",
      "Non-greasy, fast-absorbing formula",
      "Protects against heat up to 230°C",
    ],
    ingredients:
      "Cyclopentasiloxane, Dimethiconol, Argania Spinosa Kernel Oil, Camellia Oleifera Seed Oil, Tocopherol, Linalool, Limonene, Parfum.",
    howToUse:
      "Apply 1–2 drops to dry or damp hair. Work through mid-lengths and ends. Can also be used as a finishing oil on dry hair for instant shine.",
    faq: [
      {
        q: "Will this make my hair greasy?",
        a: "No. The ultra-lightweight silicone base absorbs immediately, leaving only shine and softness.",
      },
      {
        q: "Is it safe for color-treated hair?",
        a: "Yes, our formula is safe for all hair types including color-treated and chemically processed hair.",
      },
    ],
  },
]
