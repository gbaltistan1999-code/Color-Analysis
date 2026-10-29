"use client";

import { openCookieSettings } from "@/lib/consent";

/** Footer link-style button that reopens the cookie settings dialog. */
export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie Settings
    </button>
  );
}
