import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Questions, feedback or a correction about Color Analysis? Email us directly or use the form to open a pre-filled message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="py-12" style={{ background: "var(--grad-hero)" }}>
      <div className="container-x max-w-2xl">
        <Breadcrumbs items={[{ name: "Contact Us", path: "/contact" }]} />
        <div className="mt-6 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Say hello 👋</h1>
          <p className="mt-4 text-lg text-muted">Questions, ideas or a bug to report? Drop us a note.</p>
          <p className="mt-3 text-lg">
            Email us at{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-primary underline">
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
