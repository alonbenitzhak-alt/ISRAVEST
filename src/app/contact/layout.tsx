import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "צרו קשר עם MANAIO - נשמח לעזור לכם למצוא את ההשקעה המושלמת בנדל\"ן בחו\"ל.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
