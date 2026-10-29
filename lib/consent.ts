/**
 * Cookie / browser-storage consent, stored in localStorage. Browser-only helpers —
 * call them from client components.
 *
 * "Necessary" storage is always on: this consent record, the light/dark theme choice,
 * and in-progress quiz answers (sessionStorage). Analytics and marketing are opt-in and
 * off by default; nothing in those categories is installed today (see siteConfig.services).
 */
export type ConsentCategory = "analytics" | "marketing";
export type Consent = { version: 1; analytics: boolean; marketing: boolean; savedAt: string };

const KEY = "cookie-consent";
const CHANGE_EVENT = "consent-change";
const OPEN_EVENT = "open-cookie-settings";

export function readConsent(): Consent | null {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return raw && raw.version === 1 ? (raw as Consent) : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }) {
  const consent: Consent = { version: 1, ...choice, savedAt: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(consent));
  } catch {}
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: consent }));
  return consent;
}

/** Withdraw consent entirely: forget the choice so the banner asks again. */
export function clearConsent() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: null }));
}

export function onConsentChange(cb: (c: Consent | null) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<Consent | null>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(cb: () => void) {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}
