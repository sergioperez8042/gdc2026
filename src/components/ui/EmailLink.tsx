"use client";

import type { ReactNode } from "react";
import { useToast } from "@/contexts/ToastContext";

interface EmailLinkProps {
  /** Address to copy to the clipboard on tap. */
  email: string;
  /** Anchor target. Defaults to `mailto:${email}`; pass a custom one to add `?subject=`. */
  href?: string;
  className?: string;
  /** Toast title shown after copying (localized by the caller). */
  copiedLabel: string;
  copiedDescription?: string;
  children: ReactNode;
}

/**
 * Email link that never leaves the visitor stuck. It keeps the semantic
 * `mailto:` href — so users WITH a mail client still open it — but also copies
 * the address to the clipboard on tap and confirms with a toast.
 *
 * Why: on tablets / kiosks with no mail handler, a bare `mailto:` does nothing
 * and the page appears frozen. Copying + a toast guarantees every tap gives
 * useful feedback regardless of the device's mail setup.
 */
export default function EmailLink({
  email,
  href,
  className,
  copiedLabel,
  copiedDescription,
  children,
}: EmailLinkProps) {
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      await navigator.clipboard?.writeText(email);
      toast.success(copiedLabel, copiedDescription);
    } catch {
      // Clipboard unavailable (old browser / insecure context) — the mailto:
      // href still fires for users who do have a mail client. No-op fallback.
    }
  };

  return (
    <a href={href ?? `mailto:${email}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
