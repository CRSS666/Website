declare global {
  interface Window {
    rybbit?: {
      trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
      trackPageview: () => void;
      // Add other methods if you use them
    };
  }
}
