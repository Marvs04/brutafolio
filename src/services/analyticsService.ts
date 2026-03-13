/**
 * Analytics Service
 * Tracks user interactions and sends metrics to Vercel Analytics
 */

type EventName = "blueprint_toggle" | "button_click" | "page_view";

interface EventData {
  [key: string]: string | number | boolean;
}

/**
 * Track a custom event with Vercel Analytics
 */
export const trackEvent = (eventName: EventName, data?: EventData) => {
  try {
    // Use Vercel Analytics when available
    if (window.va && typeof window.va === "function") {
      window.va(eventName, data || {});
    }

    // Also log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics]", eventName, data || {});
    }
  } catch (error) {
    console.error("Analytics error:", error);
  }
};

/**
 * Track blueprint toggle with additional context
 */
export const trackBlueprintToggle = (enabled: boolean, source: "header" | "keyboard" = "header") => {
  trackEvent("blueprint_toggle", {
    enabled,
    source,
    timestamp: new Date().toISOString(),
  });
};

declare global {
  interface Window {
    va?: (eventName: string, data?: Record<string, any>) => void;
  }
}
