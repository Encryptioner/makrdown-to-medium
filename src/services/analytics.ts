/**
 * Typed Google Analytics event tracking service.
 *
 * Pure TypeScript module — no React imports. Safe to import from any file
 * including components, hooks, and services.
 *
 * Measurement ID: G-8TPMQ9LFT4
 */

// ── Event taxonomy ──────────────────────────────────────────

type ConversionEvent =
  | { name: "conversion_completed"; params: { markdown_length: number; html_length: number } }
  | { name: "conversion_failed"; params: { error: string } }
  | {
      name: "content_complexity";
      params: {
        has_code_blocks: boolean;
        has_tables: boolean;
        has_images: boolean;
        heading_count: number;
      };
    };

type ClipboardEvent =
  | { name: "html_copied"; params: { html_length: number } }
  | { name: "copy_failed"; params: { error: string } };

type EditorEvent =
  | { name: "markdown_pasted"; params: { paste_length: number } }
  | { name: "editor_cleared" };

type UIEvent = { name: "theme_toggled"; params: { theme: "dark" | "light" } };

type ErrorEvent = {
  name: "error_occurred";
  params: { category: string; action: string; error: string };
};

export type AnalyticsEvent =
  | ConversionEvent
  | ClipboardEvent
  | EditorEvent
  | UIEvent
  | ErrorEvent;

// ── Core tracking function ──────────────────────────────────

/**
 * Send a typed analytics event to Google Analytics.
 * No-ops gracefully when gtag is unavailable (ad blockers, dev without GA).
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined" || !window.gtag) return;

  const { name, ...rest } = event;
  const params = "params" in rest ? rest.params : undefined;
  window.gtag("event", name, params);
}

// ── Helpers ─────────────────────────────────────────────────

const EMAIL_PATTERN = /[\w.+-]+@[\w.-]+\.\w+/g;

/**
 * Strip email addresses from error messages to prevent PII leakage.
 * Truncates to 100 chars to keep GA event params concise.
 */
export function sanitizeError(msg: string): string {
  return msg.replace(EMAIL_PATTERN, "[email]").slice(0, 100);
}

/**
 * Analyse markdown source and return content complexity metrics.
 * Used alongside conversion_completed to understand which Markdown
 * features Medium authors actually use.
 */
export function analyzeComplexity(markdown: string): {
  has_code_blocks: boolean;
  has_tables: boolean;
  has_images: boolean;
  heading_count: number;
} {
  return {
    has_code_blocks: /```[\s\S]*?```/.test(markdown) || /^    /m.test(markdown),
    has_tables: /^\|.+\|/m.test(markdown),
    has_images: /!\[.*?\]\(.*?\)/.test(markdown),
    heading_count: (markdown.match(/^#{1,6}\s/gm) ?? []).length,
  };
}
