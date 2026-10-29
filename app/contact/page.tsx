import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions, feedback or a bug to report? We'd love to hear from you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-14" style={{ background: "var(--grad-hero)" }}>
      <div className="container-x max-w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Say hello 👋</h1>
          <p className="mt-4 text-lg text-muted">Questions, ideas or a bug to report? Drop us a note.</p>
        </div>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
