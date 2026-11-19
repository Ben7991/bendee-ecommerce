import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@repo/ui/atoms";
import { ContactCard } from "@repo/ui/molecules";
import { ContactForm } from "@repo/ui/organisms";

import { sendContactMessage } from "../../_actions/contact";
import { ContentPage } from "../../_components/content-page";
import { contact, contactTopics } from "../../_content/pages";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Reach Jofak on WhatsApp, by phone or email, or visit our store in Osu, Accra.",
};

/** /pages/contact (Paper: Content page — Contact us). The form doesn't send anything yet. */
export default function ContactPage() {
  return (
    <ContentPage
      slug="contact"
      title="Talk to a real person"
      description="WhatsApp is the fastest way to reach us. We're around Monday to Saturday, 8am to 7pm."
      compactDescription="WhatsApp is the fastest way to reach us, Monday to Saturday, 8am to 7pm."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <ContactCard
          tone="feature"
          icon="whatsapp"
          title="WhatsApp"
          detail={contact.whatsapp.label}
          badge="Replies in ~1 hour"
          action={
            <Button asChild size="xs" variant="secondary">
              <a href={contact.whatsapp.href} target="_blank" rel="noreferrer">
                Start a chat
              </a>
            </Button>
          }
        />
        <ContactCard icon="call" title="Call us" detail={<a href={contact.phone.href}>{contact.phone.label}</a>} note="Standard network rates apply." />
        <ContactCard icon="mail" title="Email" detail={<a href={contact.email.href}>{contact.email.label}</a>} note="We reply within one working day." />
        <ContactCard icon="mapPin" title="Visit or pick up" detail={contact.store} note="Mon–Sat 9am–6pm. Closed Sundays and public holidays." />
      </div>
      <ContactForm
        action={sendContactMessage}
        topics={contactTopics}
        note={
          <>
            We only use these details to answer you. <Link href="/pages/privacy">Privacy policy</Link>
          </>
        }
      />
    </ContentPage>
  );
}
