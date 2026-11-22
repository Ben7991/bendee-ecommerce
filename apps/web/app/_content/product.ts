import type { PickerOption } from "@repo/ui/molecules";
import type { Benefit, CustomerReviewData, FactRow } from "@repo/ui/organisms";

/*
 * Sample products for the static product pages (Paper "Jofak" → Product Detail, drawn for Daily
 * Greens Powder; the others reuse its layout). There's no catalog API yet; replace with catalog
 * products (docs/01-storefront-discovery.md §3.4) when it exists. Copy is placeholder.
 */

export interface SampleProduct {
  slug: string;
  /** Card id: also the packshot file and the key in the shop listing. */
  id: string;
  name: string;
  /** Name with the accent word, as [before, accent]. */
  title: [string, string];
  eyebrow: string;
  category: { label: string; href: string };
  sku: string;
  description: string;
  price: number;
  compareAt?: number;
  rating: { value: number; count: number; shares: [number, number, number, number, number] };
  socialProof: string;
  /** Gallery badges ("Save 13%" is added when there's a compare-at price). */
  badges: { label: string; variant: "solid" | "light" }[];
  flavours?: PickerOption[];
  sizes: PickerOption[];
  subscribePrice: number;
  stock: { tone?: "success" | "warning" | "error"; label: string; note: string };
  soldOut?: boolean;
  benefits: Benefit[];
  details: { description: string[]; howToUse: string; specifications: string };
  facts: { serving: string; rows: FactRow[]; footnote: string };
  reviews: CustomerReviewData[];
  /** Extra gallery views that exist for this product. */
  gallery: { back?: boolean; video?: boolean };
  /** Products for "Complete your routine" and "Viewed products", by card id. */
  routineIds: string[];
  viewedIds: string[];
}

export const delivery = {
  location: "Accra · East Legon",
  options: [
    { label: "Standard delivery", value: "Tomorrow · GHS 25" },
    { label: "Pickup · Osu store", value: "Today · Free" },
  ],
  note: "Add GHS 50 more for free delivery",
};

export const deliveryReturns =
  "Next-day delivery across Accra, 2–3 days elsewhere in Ghana. Free over GHS 500. Unopened products can be returned within 30 days.";

const labTested: Benefit = { icon: "shieldTick", title: "Lab tested", text: "Every batch third-party tested.", featured: true };
const footnote = "† Daily value not established.";

export const sampleProducts: SampleProduct[] = [
  {
    slug: "daily-greens-powder",
    id: "greens",
    name: "Daily Greens Powder",
    title: ["Daily Greens", "Powder"],
    eyebrow: "Daily Essentials · Powder",
    category: { label: "Daily Essentials", href: "/collections/daily-essentials" },
    sku: "JFK-GRN-LL25",
    description:
      "38 whole-food greens, adaptogens and probiotics in one scoop. Supports gut health, steady energy and antioxidant defence — and it actually tastes good.",
    price: 450,
    compareAt: 520,
    rating: { value: 4.9, count: 3214, shares: [88, 9, 2, 1, 0] },
    socialProof: "12k+ sold this year",
    badges: [{ label: "Bestseller", variant: "solid" }],
    // Flavour colours come from the catalog (swatch per flavour), not the design tokens.
    flavours: [
      { value: "lemon-lime", label: "Lemon lime", swatch: "linear-gradient(135deg, #e8f27a 0%, #9bd45a 100%)" },
      { value: "mixed-berry", label: "Mixed berry", swatch: "linear-gradient(135deg, #e37a9b 0%, #8e3b6a 100%)" },
      { value: "unflavoured", label: "Unflavoured", swatch: "#dcd6c8", disabled: true },
    ],
    sizes: [
      { value: "25", label: "25 servings", detail: "GHS 18 / serving" },
      { value: "50", label: "50 servings", detail: "GHS 16 / serving", badge: "Best value" },
    ],
    subscribePrice: 360,
    stock: { label: "In stock", note: "Order in the next 3h 20m for same-day dispatch" },
    benefits: [
      { icon: "sprout", title: "38 whole foods", text: "Spirulina, wheatgrass, moringa and more — no fillers." },
      { icon: "gut", title: "Gut-friendly", text: "7 billion CFU probiotics plus prebiotic fibre." },
      { icon: "bolt", title: "Steady energy", text: "No caffeine crash — adaptogens do the work." },
      labTested,
    ],
    details: {
      description: [
        "Daily Greens is the easiest habit you'll keep. One scoop delivers a full serving of leafy greens, sea vegetables, adaptogenic herbs and gut-loving probiotics — sourced from certified organic farms and blended in small batches.",
        "Naturally sweetened with monk fruit, it mixes smoothly into water, juice or your morning smoothie.",
      ],
      howToUse: "Stir or shake one scoop into 250 ml of cold water, juice or a smoothie, once a day. Best taken in the morning.",
      specifications: "25 servings · 235 g tub · vegan, gluten free, non-GMO · made in a GMP-certified facility. Keep sealed in a cool, dry place.",
    },
    facts: {
      serving: "Serving size 1 scoop (9.4 g) · 25 servings per container",
      rows: [
        { name: "Calories", amount: "35" },
        { name: "Dietary fibre", amount: "2 g", dailyValue: "7%" },
        { name: "Vitamin C", amount: "60 mg", dailyValue: "67%" },
        { name: "Organic greens blend", amount: "5.2 g", dailyValue: "†" },
        { name: "Adaptogen blend", amount: "1.1 g", dailyValue: "†" },
        { name: "Probiotics", amount: "7 billion CFU", dailyValue: "†" },
      ],
      footnote: `${footnote} Other ingredients: monk fruit, natural lemon & lime flavour, citric acid.`,
    },
    reviews: [
      {
        author: "Kwame A.",
        verified: true,
        meta: "Accra · Lemon lime, 25 servings · 2 weeks ago",
        rating: 5,
        title: "Finally a greens powder I don't have to force down",
        body: "Lemon lime is genuinely refreshing with cold water. After three weeks my digestion is noticeably better and the 3pm slump is gone. Delivery to East Legon came the next morning.",
        helpfulCount: 42,
        avatarTone: "deep",
      },
      {
        author: "Efua M.",
        verified: true,
        meta: "Kumasi · Mixed berry, 50 servings · 1 month ago",
        rating: 4,
        title: "Great value on subscription",
        body: "Switched to subscribe & save and the 50-serving tub works out much cheaper. Berry is a little sweet for me — I'd try lemon lime next.",
        avatarTone: "light",
      },
    ],
    gallery: { back: true, video: true },
    routineIds: ["ashwagandha", "energy", "nmnh", "probiotic"],
    viewedIds: ["nmnh", "magnesium", "probiotic", "ashwagandha"],
  },
  {
    slug: "ashwagandha-tablets",
    id: "ashwagandha",
    name: "Ashwagandha Tablets",
    title: ["Ashwagandha", "Tablets"],
    eyebrow: "Sleep & Stress · Tablets",
    category: { label: "Sleep & Stress", href: "/collections/sleep-stress" },
    sku: "JFK-ASH-120",
    description:
      "Full-spectrum ashwagandha root, clinically dosed to help you handle stress, wind down at night and keep steady energy through the day.",
    price: 380,
    rating: { value: 4.8, count: 2087, shares: [84, 11, 3, 1, 1] },
    socialProof: "8k+ sold this year",
    badges: [{ label: "Staff pick", variant: "light" }],
    sizes: [
      { value: "120", label: "120 tablets", detail: "60 days · GHS 6.33 / day" },
      { value: "240", label: "240 tablets", detail: "120 days · GHS 5.50 / day", badge: "Best value" },
    ],
    subscribePrice: 304,
    stock: { label: "In stock", note: "Order in the next 3h 20m for same-day dispatch" },
    benefits: [
      { icon: "sprout", title: "600 mg root extract", text: "Full-spectrum root, standardised to 5% withanolides." },
      { icon: "moon", title: "Calmer evenings", text: "Take with dinner to help you switch off." },
      { icon: "bolt", title: "Steady days", text: "Supports a balanced response to everyday stress." },
      labTested,
    ],
    details: {
      description: [
        "Ashwagandha has been used in Ayurveda for centuries. Ours is a full-spectrum root extract at the 600 mg dose used in modern studies, paired with black pepper extract to help absorption.",
        "No fillers, no binders you can't pronounce — just two tablets a day with food.",
      ],
      howToUse: "Take two tablets a day with food, ideally with your evening meal. Give it 4–6 weeks of daily use.",
      specifications: "120 tablets · 60 servings · vegan, gluten free · not suitable during pregnancy. Keep sealed in a cool, dry place.",
    },
    facts: {
      serving: "Serving size 2 tablets · 60 servings per container",
      rows: [
        { name: "Ashwagandha root extract", amount: "600 mg", dailyValue: "†" },
        { name: "Withanolides", amount: "30 mg", dailyValue: "†" },
        { name: "Black pepper extract", amount: "5 mg", dailyValue: "†" },
      ],
      footnote: `${footnote} Other ingredients: microcrystalline cellulose, rice bran.`,
    },
    reviews: [
      {
        author: "Ama K.",
        verified: true,
        meta: "Accra · 120 tablets · 3 weeks ago",
        rating: 5,
        title: "I sleep through the night again",
        body: "I take two with dinner. By week three I stopped waking at 3am, and work stress feels more manageable.",
        helpfulCount: 31,
        avatarTone: "medium",
      },
      {
        author: "Yaw B.",
        verified: true,
        meta: "Takoradi · 240 tablets · 2 months ago",
        rating: 4,
        title: "Subtle but real",
        body: "Nothing dramatic, but I feel less wired in the evenings. The bigger tub is good value.",
        avatarTone: "dark",
      },
    ],
    gallery: {},
    routineIds: ["magnesium", "greens", "probiotic", "energy"],
    viewedIds: ["greens", "energy", "nmnh", "probiotic"],
  },
  {
    slug: "energy-capsules",
    id: "energy",
    name: "Energy Capsules",
    title: ["Energy", "Capsules"],
    eyebrow: "Focus & Energy · Capsules",
    category: { label: "Focus & Energy", href: "/collections/focus-energy" },
    sku: "JFK-NRG-30",
    description: "B vitamins, rhodiola and a gentle dose of green-tea caffeine with L-theanine — clear energy for long days, without the jitters.",
    price: 320,
    compareAt: 390,
    rating: { value: 4.9, count: 4560, shares: [90, 7, 2, 1, 0] },
    socialProof: "15k+ sold this year",
    badges: [],
    sizes: [
      { value: "30", label: "30 capsules", detail: "GHS 10.67 / day" },
      { value: "90", label: "90 capsules", detail: "GHS 9.33 / day", badge: "Best value" },
    ],
    subscribePrice: 256,
    stock: { label: "In stock", note: "Order in the next 3h 20m for same-day dispatch" },
    benefits: [
      { icon: "bolt", title: "Clean caffeine", text: "75 mg from green tea — about a small coffee." },
      { icon: "stopwatch", title: "Calm focus", text: "L-theanine smooths out the lift, so no crash." },
      { icon: "sprout", title: "Rhodiola root", text: "An adaptogen for busy, demanding weeks." },
      labTested,
    ],
    details: {
      description: [
        "Energy Capsules pair a modest dose of natural caffeine with L-theanine, the calming amino acid in tea, for a lift that feels clear rather than wired.",
        "Rhodiola and methylated B vitamins round it out for the days that ask a lot of you.",
      ],
      howToUse: "Take one capsule in the morning with water. Avoid after 2pm, and don't combine with other caffeine-heavy drinks.",
      specifications: "30 capsules · 30 servings · vegan · contains caffeine (75 mg per capsule). Keep sealed in a cool, dry place.",
    },
    facts: {
      serving: "Serving size 1 capsule · 30 servings per container",
      rows: [
        { name: "Vitamin B12", amount: "500 mcg", dailyValue: "20,833%" },
        { name: "Vitamin B6", amount: "5 mg", dailyValue: "294%" },
        { name: "Rhodiola root extract", amount: "300 mg", dailyValue: "†" },
        { name: "Green tea extract", amount: "150 mg", dailyValue: "†" },
        { name: "L-theanine", amount: "100 mg", dailyValue: "†" },
      ],
      footnote: `${footnote} Other ingredients: pullulan capsule, rice flour.`,
    },
    reviews: [
      {
        author: "Kofi D.",
        verified: true,
        meta: "Accra · 30 capsules · 1 week ago",
        rating: 5,
        title: "Replaced my second coffee",
        body: "One in the morning and I'm good until evening. No jitters and I still sleep fine.",
        helpfulCount: 58,
        avatarTone: "deep",
      },
      {
        author: "Abena O.",
        verified: true,
        meta: "Tema · 90 capsules · 1 month ago",
        rating: 5,
        title: "Great for exam season",
        body: "Kept me focused through long study days without the crash I get from energy drinks.",
        avatarTone: "light",
      },
    ],
    gallery: {},
    routineIds: ["greens", "nmnh", "ashwagandha", "probiotic"],
    viewedIds: ["greens", "nmnh", "magnesium", "ashwagandha"],
  },
  {
    slug: "nmnh-650mg",
    id: "nmnh",
    name: "NMNH 650mg",
    title: ["NMNH", "650mg"],
    eyebrow: "Daily Essentials · Capsules",
    category: { label: "Daily Essentials", href: "/collections/daily-essentials" },
    sku: "JFK-NMH-90",
    description: "650 mg of NMNH per serving to support your body's NAD+ levels — the coenzyme behind everyday cellular energy.",
    price: 650,
    rating: { value: 4.7, count: 1342, shares: [80, 13, 4, 2, 1] },
    socialProof: "4k+ sold this year",
    badges: [{ label: "New", variant: "light" }],
    sizes: [
      { value: "90", label: "90 capsules", detail: "30 days · GHS 21.67 / day" },
      { value: "180", label: "180 capsules", detail: "60 days · GHS 19.50 / day", badge: "Best value" },
    ],
    subscribePrice: 520,
    stock: { label: "In stock", note: "Order in the next 3h 20m for same-day dispatch" },
    benefits: [
      { icon: "bolt", title: "NAD+ support", text: "NMNH, a reduced form of NMN, at 650 mg a day." },
      { icon: "sun", title: "Morning ritual", text: "Three capsules with breakfast, that's it." },
      { icon: "sprout", title: "Plant capsules", text: "Vegan capsules, no fillers or flow agents." },
      labTested,
    ],
    details: {
      description: [
        "NAD+ is a coenzyme every cell uses to turn food into energy. NMNH is a precursor your body can convert to NAD+.",
        "We use pharmaceutical-grade NMNH, tested for purity and identity in every batch.",
      ],
      howToUse: "Take three capsules each morning with food and water.",
      specifications: "90 vegan capsules · 30 servings · gluten free, non-GMO. Keep sealed in a cool, dry place away from light.",
    },
    facts: {
      serving: "Serving size 3 capsules · 30 servings per container",
      rows: [
        { name: "NMNH (reduced nicotinamide mononucleotide)", amount: "650 mg", dailyValue: "†" },
        { name: "Trans-resveratrol", amount: "100 mg", dailyValue: "†" },
      ],
      footnote: `${footnote} Other ingredients: hypromellose capsule.`,
    },
    reviews: [
      {
        author: "Nana A.",
        verified: true,
        meta: "Accra · 90 capsules · 2 weeks ago",
        rating: 5,
        title: "Easy to stick with",
        body: "Three with breakfast is simple. I feel more even through the afternoon after a month.",
        helpfulCount: 12,
        avatarTone: "dark",
      },
      {
        author: "Esi T.",
        verified: true,
        meta: "Cape Coast · 90 capsules · 1 month ago",
        rating: 4,
        title: "Pricey but well made",
        body: "Clear lab results and the capsules are easy to swallow. Subscribing brings the price down.",
        avatarTone: "pale",
      },
    ],
    gallery: {},
    routineIds: ["greens", "energy", "magnesium", "ashwagandha"],
    viewedIds: ["greens", "energy", "probiotic", "ashwagandha"],
  },
  {
    slug: "complete-probiotic",
    id: "probiotic",
    name: "Complete Probiotic",
    title: ["Complete", "Probiotic"],
    eyebrow: "Gut & Digestion · Capsules",
    category: { label: "Gut & Digestion", href: "/collections/gut-digestion" },
    sku: "JFK-PRO-30",
    description: "Nine researched strains and a prebiotic fibre in one daily capsule, to support digestion, regularity and a balanced gut.",
    price: 480,
    rating: { value: 4.8, count: 964, shares: [85, 10, 3, 1, 1] },
    socialProof: "3k+ sold this year",
    badges: [],
    sizes: [
      { value: "30", label: "30 capsules", detail: "GHS 16 / day" },
      { value: "90", label: "90 capsules", detail: "GHS 14 / day", badge: "Best value" },
    ],
    subscribePrice: 384,
    stock: { tone: "warning", label: "Only 3 left", note: "Order soon — restocking in 2 weeks" },
    benefits: [
      { icon: "gut", title: "9 strains", text: "Lactobacillus and Bifidobacterium, 50 billion CFU." },
      { icon: "sprout", title: "Prebiotic fibre", text: "Inulin to feed the good bacteria." },
      { icon: "shield", title: "Shelf stable", text: "Delayed-release capsules, no fridge needed." },
      labTested,
    ],
    details: {
      description: [
        "Complete Probiotic combines nine well-studied strains with inulin, a prebiotic fibre, so the bacteria have something to work with.",
        "Delayed-release capsules protect the strains from stomach acid until they reach the gut.",
      ],
      howToUse: "Take one capsule a day with water, with or without food. Best at the same time each day.",
      specifications: "30 capsules · 30 servings · vegan, dairy free · shelf stable, no refrigeration needed.",
    },
    facts: {
      serving: "Serving size 1 capsule · 30 servings per container",
      rows: [
        { name: "Probiotic blend (9 strains)", amount: "50 billion CFU", dailyValue: "†" },
        { name: "Inulin (from chicory root)", amount: "100 mg", dailyValue: "†" },
      ],
      footnote: `${footnote} Other ingredients: delayed-release hypromellose capsule.`,
    },
    reviews: [
      {
        author: "Adwoa S.",
        verified: true,
        meta: "Accra · 30 capsules · 3 weeks ago",
        rating: 5,
        title: "Less bloating after two weeks",
        body: "I noticed a difference sooner than I expected. One capsule in the morning and done.",
        helpfulCount: 24,
        avatarTone: "light",
      },
      {
        author: "Kwesi F.",
        verified: true,
        meta: "Kumasi · 90 capsules · 2 months ago",
        rating: 4,
        title: "No fridge is a win",
        body: "Great that it keeps on the shelf. Took a few weeks to notice anything, but it's working.",
        avatarTone: "deep",
      },
    ],
    gallery: {},
    routineIds: ["greens", "ashwagandha", "magnesium", "energy"],
    viewedIds: ["greens", "nmnh", "energy", "ashwagandha"],
  },
  {
    slug: "magnesium-bisglycinate",
    id: "magnesium",
    name: "Magnesium Bisglycinate",
    title: ["Magnesium", "Bisglycinate"],
    eyebrow: "Sleep & Stress · Capsules",
    category: { label: "Sleep & Stress", href: "/collections/sleep-stress" },
    sku: "JFK-MAG-90",
    description: "Gentle, well-absorbed magnesium bisglycinate with vitamin B6 — to help muscles relax and support restful sleep.",
    price: 340,
    rating: { value: 4.8, count: 1876, shares: [86, 9, 3, 1, 1] },
    socialProof: "6k+ sold this year",
    badges: [],
    sizes: [
      { value: "90", label: "90 capsules", detail: "30 days · GHS 11.33 / day" },
      { value: "180", label: "180 capsules", detail: "60 days · GHS 10 / day", badge: "Best value", disabled: true },
    ],
    subscribePrice: 272,
    stock: { tone: "error", label: "Sold out", note: "Back in about 2 weeks" },
    soldOut: true,
    benefits: [
      { icon: "moon", title: "Rest & relax", text: "Supports normal muscle function and restful sleep." },
      { icon: "gut", title: "Gentle on the gut", text: "Bisglycinate is kind to sensitive stomachs." },
      { icon: "sprout", title: "With vitamin B6", text: "Helps reduce tiredness and fatigue." },
      labTested,
    ],
    details: {
      description: [
        "Magnesium bisglycinate is magnesium bound to glycine, which the body absorbs well and which is gentle on digestion.",
        "Vitamin B6 helps your body use magnesium. Take it in the evening as part of your wind-down.",
      ],
      howToUse: "Take three capsules in the evening with water, about an hour before bed.",
      specifications: "90 capsules · 30 servings · vegan, gluten free. Keep sealed in a cool, dry place.",
    },
    facts: {
      serving: "Serving size 3 capsules · 30 servings per container",
      rows: [
        { name: "Magnesium (as bisglycinate)", amount: "200 mg", dailyValue: "48%" },
        { name: "Vitamin B6", amount: "2 mg", dailyValue: "118%" },
      ],
      footnote: "Other ingredients: hypromellose capsule, rice flour.",
    },
    reviews: [
      {
        author: "Akosua P.",
        verified: true,
        meta: "Accra · 90 capsules · 1 month ago",
        rating: 5,
        title: "My evening must-have",
        body: "Fewer leg cramps and I fall asleep faster. Please restock soon!",
        helpfulCount: 37,
        avatarTone: "medium",
      },
      {
        author: "Ebo M.",
        verified: true,
        meta: "Ho · 90 capsules · 2 months ago",
        rating: 4,
        title: "No stomach upset",
        body: "Other magnesium gave me trouble; this one doesn't. Three capsules is a lot to swallow though.",
        avatarTone: "dark",
      },
    ],
    gallery: {},
    routineIds: ["ashwagandha", "greens", "probiotic", "nmnh"],
    viewedIds: ["ashwagandha", "greens", "energy", "nmnh"],
  },
];
