"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { clearConsent, onOpenCookieSettings, readConsent, saveConsent } from "@/lib/consent";
import { siteConfig } from "@/lib/site-config";

const anyOptionalService = siteConfig.services.analytics || siteConfig.services.marketing;

/** Consent banner (shown until a choice is saved) plus a settings dialog reopened from the footer. */
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
    } else {
      setShowBanner(true);
    }
    return onOpenCookieSettings(() => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      dialogRef.current?.showModal();
    });
  }, []);

  const decide = (choice: { analytics: boolean; marketing: boolean }) => {
    saveConsent(choice);
    setAnalytics(choice.analytics);
    setMarketing(choice.marketing);
    setShowBanner(false);
    dialogRef.current?.close();
  };

  const withdraw = () => {
    clearConsent();
    setAnalytics(false);
    setMarketing(false);
    dialogRef.current?.close();
    setShowBanner(true);
  };

  return (
    <>
      {showBanner && (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-line bg-surface p-5 shadow-2xl sm:inset-x-6 sm:bottom-6"
        >
          <h2 className="font-display text-lg font-bold">Your privacy choices</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {anyOptionalService
              ? "We use necessary browser storage to run this site, and optional analytics or marketing only if you allow it."
              : "This site only uses necessary browser storage — to remember this choice, your light/dark setting and your quiz progress during a visit. No analytics, advertising or tracking is installed."}{" "}
            <Link href="/cookie-policy" className="font-semibold text-primary underline">
              Cookie Policy
            </Link>{" "}
            ·{" "}
            <Link href="/privacy-policy" className="font-semibold text-primary underline">
              Privacy Policy
            </Link>
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className="btn-primary !py-2.5 text-sm">
              Accept all
            </button>
            <button type="button" onClick={() => decide({ analytics: false, marketing: false })} className="btn-ghost !py-2.5 text-sm">
              Reject optional
            </button>
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="rounded-full px-4 py-2.5 text-sm font-semibold text-primary underline"
            >
              Cookie settings
            </button>
          </div>
        </section>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-settings-title"
        className="m-auto w-[min(92vw,34rem)] rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/50"
      >
        <div className="p-6">
          <h2 id="cookie-settings-title" className="font-display text-xl font-bold">
            Cookie settings
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Choose which optional categories may run. You can change or withdraw your choice at any time from the footer.
          </p>

          <ul className="mt-5 space-y-3">
            <li className="rounded-xl border border-line p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">Necessary</span>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">Always on</span>
              </div>
              <p className="mt-1.5 text-sm text-muted">
                Remembers this choice, your light/dark theme and in-progress quiz answers. Needed for the site to work, so it
                can&apos;t be switched off.
              </p>
            </li>
            <ConsentToggle
              id="consent-analytics"
              label="Analytics"
              description={
                siteConfig.services.analytics
                  ? "Helps us understand how the site is used."
                  : "Not used — no analytics service is installed. This switch only matters if one is added in future."
              }
              checked={analytics}
              onChange={setAnalytics}
            />
            <ConsentToggle
              id="consent-marketing"
              label="Marketing"
              description={
                siteConfig.services.marketing
                  ? "Used to measure and personalize advertising."
                  : "Not used — no advertising or marketing tools are installed."
              }
              checked={marketing}
              onChange={setMarketing}
            />
          </ul>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row-reverse">
            <button type="button" onClick={() => decide({ analytics, marketing })} className="btn-primary !py-2.5 text-sm">
              Save choices
            </button>
            <button type="button" onClick={() => decide({ analytics: false, marketing: false })} className="btn-ghost !py-2.5 text-sm">
              Reject optional
            </button>
            <button type="button" onClick={withdraw} className="rounded-full px-4 py-2.5 text-sm font-semibold text-muted underline sm:mr-auto">
              Withdraw consent
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

function ConsentToggle({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <li className="rounded-xl border border-line p-4">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-describedby={`${id}-desc`}
          onClick={() => onChange(!checked)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition ${checked ? "bg-[#7C3AED]" : "bg-[#cbc3dc] dark:bg-[#4a3d6b]"}`}
        >
          <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-6" : "left-1"}`} />
          <span className="sr-only">{checked ? "On" : "Off"}</span>
        </button>
      </div>
      <p id={`${id}-desc`} className="mt-1.5 text-sm text-muted">
        {description}
      </p>
    </li>
  );
}
