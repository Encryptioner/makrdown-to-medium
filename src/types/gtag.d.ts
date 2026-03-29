/**
 * Minimal type declarations for the Google Analytics gtag function.
 * Placed on window by the GA script tag in index.html.
 */

type GtagCommand = "config" | "event" | "js" | "set";

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare function gtag(
  command: "event",
  eventName: string,
  params?: GtagEventParams
): void;
declare function gtag(command: "config", targetId: string, params?: GtagEventParams): void;
declare function gtag(command: "js", value: Date): void;
declare function gtag(command: "set", params: GtagEventParams): void;

interface Window {
  gtag: typeof gtag;
  dataLayer: unknown[];
}
