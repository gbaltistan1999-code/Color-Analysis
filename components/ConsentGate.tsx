"use client";

import { useEffect, useState, type ReactNode } from "react";
import { onConsentChange, readConsent, type ConsentCategory } from "@/lib/consent";

/**
 * Renders its children (e.g. an analytics <Script>) only after the visitor has opted in
 * to that category. Nothing uses it yet — wrap any future optional script in it.
 *
 *   <ConsentGate category="analytics"><Script src="..." /></ConsentGate>
 */
export default function ConsentGate({ category, children }: { category: ConsentCategory; children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(Boolean(readConsent()?.[category]));
    return onConsentChange((c) => setAllowed(Boolean(c?.[category])));
  }, [category]);

  return allowed ? <>{children}</> : null;
}
