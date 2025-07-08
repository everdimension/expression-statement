import invariant from "tiny-invariant";

invariant(process.env.ANALYTICS_SERVICE_URL, "ANALYTICS_SERVICE_URL not set");
export const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL;

invariant(process.env.UMAMI_WEBSITE_ID, "UMAMI_WEBSITE_ID not set");
export const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;

export const SEND_EVENTS = process.env.NODE_ENV === "production";
