import Image from "next/image";
import Link from "next/link";

import { Button } from "@repo/ui/atoms";
import {
  GoalGrid,
  HeroShowcase,
  HomeHero,
  QuizBanner,
  QuizCard,
  ReviewsSection,
  SiteFooter,
  SiteHeader,
} from "@repo/ui/organisms";
import { StorefrontShell } from "@repo/ui/templates";

import { subscribeToNewsletter } from "./_actions/newsletter";
import { Bestsellers } from "./_components/bestsellers";
import { SiteMenu } from "./_components/site-menu";
import { menu } from "./_content/menu";
import { bestsellerFilters, bestsellers, footerColumns, navLinks, quizChoices, reviews } from "./_content/home";
import { placeholderSrc } from "./_lib/placeholder";

function Packshot({ id, alt, sizes }: { id: string; alt: string; sizes: string }) {
  const src = placeholderSrc(`${id}.png`);
  return src ? <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" /> : null;
}

export default function Home() {
  const heroPhoto = placeholderSrc("hero.jpg");

  return (
    <StorefrontShell
      footer={
        <SiteFooter
          linkAs={Link}
          newsletterTitle={
            <>
              Wellness notes, <em>once a week.</em>
            </>
          }
          newsletterHint="Get 15% off your first order. Unsubscribe anytime."
          newsletterAction={subscribeToNewsletter}
          tagline="Clean, plant-powered supplements for everyday balance. Made in small batches, tested every time."
          columns={footerColumns}
          copyright="© 2026 Jofak. All rights reserved."
          shortCopyright="© 2026 Jofak"
          disclaimer="*These statements have not been evaluated by the FDA."
        />
      }
    >
      <HomeHero
        header={
          <SiteHeader
            linkAs={Link}
            navLinks={navLinks}
            activeHref="/"
            favouritesCount={6}
            bagCount={3}
            menu={
              <SiteMenu
                {...menu}
                activeHref="/"
                promo={{ ...menu.promo, image: <Packshot id="greens" alt="" sizes="54px" /> }}
              />
            }
          />
        }
        rating={{ value: "4.9", count: "12,480" }}
        title={
          <>
            Daily rituals for a body that feels <em>naturally</em> well.
          </>
        }
        lede={{
          short: "Clean, clinically-dosed supplements from whole-plant ingredients — tested and delivered monthly.",
          full: "Clean, clinically-dosed supplements made from whole-plant ingredients — third-party tested and delivered to your door every month.",
        }}
        benefits={[
          "Third-party tested for purity & potency",
          "No synthetic fillers, dyes or additives",
          "Free shipping & 60-day money-back promise",
        ]}
        actions={
          <>
            <Button asChild arrow>
              <Link href="/shop">Shop Bestsellers</Link>
            </Button>
            <Button asChild arrow variant="secondary">
              <Link href="/quiz">Take the 2-min Quiz</Link>
            </Button>
          </>
        }
        compactActions={
          <>
            <Button asChild arrow size="sm">
              <Link href="/shop">Shop now</Link>
            </Button>
            <Button asChild arrow size="sm" variant="secondary">
              <Link href="/quiz">Take the quiz</Link>
            </Button>
          </>
        }
        showcase={
          <HeroShowcase
            photo={
              heroPhoto && (
                <Image
                  src={heroPhoto}
                  alt="Smiling woman in sunglasses enjoying a supplement gummy outdoors"
                  fill
                  priority
                  sizes="(min-width: 768px) 340px, 230px"
                  className="object-cover object-[45%_50%]"
                />
              )
            }
            product={{
              name: "Daily Greens",
              price: "GHS 450",
              image: <Packshot id="greens" alt="" sizes="44px" />,
            }}
          />
        }
      />

      <GoalGrid
        linkAs={Link}
        title={
          <>
            Gentle support for every part of <em>your day.</em>
          </>
        }
        compactTitle={
          <>
            Support for every part of <em>your day.</em>
          </>
        }
        blurb="Formulas built around how you want to feel — rested, focused, balanced and resilient."
        viewAllHref="/shop"
        goals={{
          sleep: { href: "/collections/sleep-stress", productCount: 8 },
          focus: { href: "/collections/focus-energy", productCount: 6 },
          gut: { href: "/collections/gut-digestion", productCount: 5 },
          immunity: { href: "/collections/immunity", productCount: 4 },
        }}
      />

      <Bestsellers
        title="Loved by 50,000+ routines"
        compactTitle="Bestsellers"
        filters={bestsellerFilters}
        products={bestsellers}
        shopAllHref="/shop"
        images={Object.fromEntries(
          bestsellers.map((product) => [
            product.id,
            <Packshot key={product.id} id={product.id} alt={product.name} sizes="(min-width: 768px) 290px, 150px" />,
          ]),
        )}
      />

      <QuizBanner
        eyebrow="Personalised for you"
        title={
          <>
            Not sure where to start? <em>Ask your body.</em>
          </>
        }
        lede={{
          short: "12 quick questions. One personalised routine, reviewed by our nutritionists.",
          full: "Answer 12 quick questions about sleep, energy and stress. We'll build your wellness score and a routine that fits — reviewed by our in-house nutritionists.",
        }}
        action={
          <Button asChild arrow variant="accent">
            <Link href="/quiz">Start the Free Quiz</Link>
          </Button>
        }
        compactAction={
          <Button asChild arrow variant="accent" size="md" className="w-full justify-between">
            <Link href="/quiz">Start the free quiz</Link>
          </Button>
        }
        note="Takes about 2 minutes"
        card={
          <QuizCard
            step={4}
            totalSteps={12}
            question="How do you usually feel when you wake up?"
            choices={quizChoices}
            defaultValue="groggy"
          />
        }
      />

      <ReviewsSection
        eyebrow="Real results"
        title={
          <>
            Small rituals, <em>big shifts.</em>
          </>
        }
        stats={[
          { value: "93%", label: "sleep better within 3 weeks" },
          { value: "4.9★", label: "average from 12k+ reviews" },
        ]}
        reviews={reviews}
      />
    </StorefrontShell>
  );
}
