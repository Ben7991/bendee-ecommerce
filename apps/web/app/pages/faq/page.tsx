import type { Metadata } from "next";
import Link from "next/link";

import { FaqList, type FaqGroup } from "@repo/ui/organisms";

import { ContentPage, WhatsAppCallout } from "../../_components/content-page";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to what people ask most about ordering, paying, delivery and Jofak's products.",
};

/*
 * Only "When will my order arrive?" is written out in Paper; the other answers are drafts based
 * on the Delivery & returns and Terms pages. TODO: have the business confirm them.
 */
const groups: FaqGroup[] = [
  {
    title: "Orders & delivery",
    items: [
      {
        id: "arrive",
        question: "When will my order arrive?",
        answer: (
          <>
            Orders placed before 2pm on a weekday leave the same day. Accra Central is usually next day, Kumasi 2–3 days and the rest of
            Ghana 3–5 days. You&apos;ll get an SMS or WhatsApp with tracking details when it&apos;s on the way.{" "}
            <Link href="/pages/delivery-returns#fees">See all delivery fees</Link>
          </>
        ),
        searchText: "delivery shipping time accra kumasi tracking",
      },
      {
        id: "change",
        question: "Can I change or cancel my order?",
        answer: "Yes, free of charge until your order is packed. Message us on WhatsApp with your order number and we'll change or cancel it.",
        searchText: "cancel edit address",
      },
      {
        id: "gift",
        question: "Can I send an order to someone else?",
        answer: "Yes. Add their name, phone number and address at checkout. We'll call them, not you, when the courier is on the way.",
        searchText: "gift recipient address",
      },
      {
        id: "account",
        question: "Do I need an account to order?",
        answer: "No, you can check out as a guest with your phone number. An account lets you track orders, reorder and keep your favourites.",
        searchText: "guest sign up",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        id: "methods",
        question: "Which payment methods do you accept?",
        answer: "MTN MoMo, Telecel Cash, AT Money, Visa, Mastercard and bank transfer, all through Paystack.",
        searchText: "momo card visa mastercard telecel paystack",
      },
      {
        id: "momo-failed",
        question: "My MoMo was charged but the order failed. What now?",
        answer:
          "Failed payments are usually reversed by your network within 24 hours. If it hasn't come back, message us with the transaction ID and we'll chase it with Paystack.",
        searchText: "momo refund charged failed",
      },
      {
        id: "pay-on-delivery",
        question: "Can I pay when my order arrives?",
        answer: "Where pay on delivery is offered for your area, you can choose it at checkout and pay when the courier arrives.",
        searchText: "cash on delivery cod",
      },
    ],
  },
  {
    title: "Products & safety",
    items: [
      {
        id: "genuine",
        question: "How do I know your products are genuine?",
        answer:
          "Everything comes straight from the brand or a licensed importer, with batch numbers we can trace, and is registered with the Ghana FDA where required.",
        searchText: "fake authentic fda",
      },
      {
        id: "pregnant",
        question: "Can I take supplements if I'm pregnant or on medication?",
        answer:
          "Check with your doctor or pharmacist first. Our nutritionist can tell you what's in a product, but can't replace medical advice.",
        searchText: "pregnancy breastfeeding medicine doctor",
      },
      {
        id: "storage",
        question: "How should I store my supplements in the heat?",
        answer: "Somewhere cool and dry, out of direct sun, with the lid closed. Don't keep them in the car or a hot kitchen.",
        searchText: "store heat temperature",
      },
    ],
  },
  {
    title: "Returns & refunds",
    items: [
      {
        id: "opened",
        question: "Can I return something I've opened?",
        answer: (
          <>
            For hygiene reasons only unopened, sealed products can be returned, within 14 days of delivery. If something&apos;s wrong
            with it, we&apos;ll sort it out whatever the seal says. <Link href="/pages/delivery-returns#returns">How returns work</Link>
          </>
        ),
        searchText: "return opened seal",
      },
      {
        id: "refund-time",
        question: "How long do refunds take?",
        answer: "Refunds go back to the MoMo wallet or card you paid with, within 5 working days of us receiving the item.",
        searchText: "refund money back",
      },
      {
        id: "damaged",
        question: "My order arrived damaged. What do I do?",
        answer: "Send us a photo on WhatsApp as soon as you can and we'll replace it or refund you.",
        searchText: "broken damaged wrong item",
      },
    ],
  },
];

/** /pages/faq (Paper: Content page — FAQ). */
export default function FaqPage() {
  return (
    <ContentPage
      slug="faq"
      title="Questions, answered"
      description="The things people ask us most about ordering, paying, delivery and the products themselves."
      compactDescription="What people ask us most about ordering, paying, delivery and the products."
    >
      <FaqList groups={groups} defaultOpen={["arrive"]} />
      <WhatsAppCallout />
    </ContentPage>
  );
}
