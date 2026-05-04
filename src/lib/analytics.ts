export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window === "undefined") return;

  const gtag = (window as any).gtag;
  if (gtag) {
    gtag("event", eventName, eventParams);
  }
}

export function trackPropertyView(propertyId: string, propertyTitle: string) {
  trackEvent("view_item", {
    items: [
      {
        item_id: propertyId,
        item_name: propertyTitle,
        item_category: "property",
      },
    ],
  });
}

export function trackPropertyClick(propertyId: string, clickType: "whatsapp" | "contact") {
  trackEvent("view_promotion", {
    promotion_id: propertyId,
    promotion_name: clickType,
  });
}

export function trackLeadSubmission(propertyId: string) {
  trackEvent("generate_lead", {
    currency: "EUR",
    value: 0,
    items: [
      {
        item_id: propertyId,
        item_category: "property",
      },
    ],
  });
}
