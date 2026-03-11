"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "he" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const translations: Record<Lang, Record<string, string>> = {
  he: {
    // Navbar
    "nav.home": "ראשי",
    "nav.properties": "נכסים",
    "nav.countries": "מדינות",
    "nav.howItWorks": "איך זה עובד",
    "nav.contact": "צור קשר",
    "nav.browseInvestments": "עיין בהשקעות",
    "nav.signIn": "התחברות",
    "nav.signOut": "התנתקות",
    "nav.admin": "ניהול",
    "nav.favorites": "מועדפים",

    // Home
    "home.hero.title": "השקעות נדל\"ן גלובליות למשקיעים ישראלים",
    "home.hero.subtitle": "גלו נכסי השקעה פרימיום בשווקים המובילים של אירופה. הזדמנויות שנבחרו בקפידה עם תמחור שקוף ותשואות גבוהות.",
    "home.search.country": "מדינה",
    "home.search.city": "עיר",
    "home.search.budget": "תקציב",
    "home.search.allCountries": "כל המדינות",
    "home.search.anyCity": "כל עיר",
    "home.search.anyBudget": "כל תקציב",
    "home.search.button": "חיפוש נכסים",
    "home.search.upTo": "עד",
    "home.stats.countries": "מדינות",
    "home.stats.properties": "נכסים",
    "home.stats.avgRoi": "תשואה ממוצעת",
    "home.stats.startingFrom": "החל מ-",
    "home.featured.title": "נכסי השקעה מומלצים",
    "home.featured.subtitle": "נכסים שנבחרו בקפידה עם פוטנציאל תשואה גבוה בשווקי הנדל\"ן המבטיחים ביותר באירופה.",
    "home.featured.browseAll": "עיין בכל ההשקעות",
    "home.howItWorks.title": "איך ISRAVEST עובד",
    "home.howItWorks.subtitle": "תהליך פשוט ושקוף מגילוי הנכס ועד השלמת ההשקעה.",
    "home.howItWorks.step": "שלב",
    "home.steps.browse.title": "עיון בנכסים",
    "home.steps.browse.desc": "חקרו הזדמנויות נדל\"ן בינלאומיות באזורי השקעה מובילים.",
    "home.steps.request.title": "בקשת פרטים",
    "home.steps.request.desc": "הגישו עניין וקבלו חבילת השקעה מקיפה עם כל הפרטים.",
    "home.steps.consult.title": "ייעוץ מומחים",
    "home.steps.consult.desc": "התחברו עם מומחי ההשקעות המקומיים שלנו לליווי אישי ובדיקת נאותות.",
    "home.steps.invest.title": "השקעה ורווח",
    "home.steps.invest.desc": "השלימו את ההשקעה עם ליווי משפטי מלא והתחילו להרוויח.",
    "home.countries.title": "מדינות השקעה",
    "home.countries.subtitle": "חקרו הזדמנויות נדל\"ן במדינות שנבחרו בקפידה.",
    "home.countries.properties": "נכסים",
    "home.cta.title": "מוכנים להתחיל להשקיע בחו\"ל?",
    "home.cta.subtitle": "הצטרפו למשקיעים ישראלים שכבר בונים עושר דרך נדל\"ן בינלאומי. עיינו במבחר הנכסים שלנו עוד היום.",
    "home.cta.button": "עיין בהשקעות",

    // Properties
    "properties.title": "נכסי השקעה",
    "properties.subtitle": "חקרו {count} נכסים נבחרים ב-4 מדינות",
    "properties.filter.country": "מדינה",
    "properties.filter.maxPrice": "מחיר מקסימלי",
    "properties.filter.type": "סוג נכס",
    "properties.filter.minRoi": "תשואה מינימלית",
    "properties.filter.bedrooms": "חדרים",
    "properties.filter.allCountries": "כל המדינות",
    "properties.filter.anyPrice": "כל מחיר",
    "properties.filter.allTypes": "כל הסוגים",
    "properties.filter.anyRoi": "כל תשואה",
    "properties.filter.any": "הכל",
    "properties.filter.clear": "נקה מסננים",
    "properties.filter.upTo": "עד",
    "properties.showing": "מציג {count} {noun}",
    "properties.property": "נכס",
    "properties.propertiesNoun": "נכסים",
    "properties.noResults": "אין נכסים התואמים למסננים",
    "properties.noResultsSub": "נסו לשנות את קריטריוני החיפוש",
    "properties.loading": "טוען נכסים...",

    // Property Card
    "card.roi": "תשואה",
    "card.bedroom": "חדר",
    "card.bedrooms": "חדרים",
    "card.cta": "קבל חבילת השקעה",

    // Property Details
    "detail.home": "ראשי",
    "detail.properties": "נכסים",
    "detail.expectedRoi": "תשואה צפויה",
    "detail.bedrooms": "חדרים",
    "detail.propertyType": "סוג נכס",
    "detail.country": "מדינה",
    "detail.about": "על הנכס",
    "detail.agent": "סוכן השקעות",
    "detail.requestDetails": "בקשת פרטי השקעה",
    "detail.formSubtitle": "מלאו את הטופס וצוות שלנו יחזור אליכם תוך 24 שעות.",

    // Lead Form
    "form.name": "שם מלא",
    "form.namePlaceholder": "השם המלא שלך",
    "form.email": "אימייל",
    "form.emailPlaceholder": "your@email.com",
    "form.phone": "טלפון",
    "form.phonePlaceholder": "+972...",
    "form.budget": "תקציב השקעה",
    "form.budgetPlaceholder": "בחר תקציב",
    "form.message": "הודעה",
    "form.messagePlaceholder": "ספרו לנו על יעדי ההשקעה שלכם...",
    "form.submit": "שלח בקשה",
    "form.submitting": "שולח...",
    "form.thankYou": "תודה רבה!",
    "form.thankYouSub": "הבקשה שלכם נשלחה. צוות ההשקעות שלנו ייצור איתכם קשר בקרוב.",
    "form.error": "משהו השתבש. אנא נסו שוב.",

    // Contact
    "contact.title": "צור קשר",
    "contact.subtitle": "דברו עם צוות ההשקעות שלנו",
    "contact.heading": "בואו נדבר על יעדי ההשקעה שלכם",
    "contact.description": "בין אם אתם משקיעים בינלאומיים חדשים או בוני תיקים מנוסים, הצוות שלנו כאן לעזור לכם לנווט הזדמנויות נדל\"ן גלובליות.",
    "contact.emailLabel": "אימייל",
    "contact.officeLabel": "משרד",
    "contact.office": "תל אביב, ישראל",
    "contact.hoursLabel": "שעות פעילות",
    "contact.hours": "ראשון - חמישי, 9:00 - 18:00",
    "contact.send": "שלח הודעה",
    "contact.sending": "שולח...",
    "contact.sent": "ההודעה נשלחה!",
    "contact.sentSub": "תודה שפניתם אלינו. נחזור אליכם תוך 24 שעות.",
    "contact.messagePlaceholder": "איך נוכל לעזור לכם?",

    // Countries
    "countries.title": "מדינות השקעה",
    "countries.subtitle": "חקרו הזדמנויות נדל\"ן במדינות שנבחרו בקפידה",
    "countries.investmentOverview": "סקירת השקעה",
    "countries.keyHighlights": "נקודות עיקריות",

    // How It Works
    "howItWorks.title": "איך זה עובד",
    "howItWorks.subtitle": "מדריך שלב אחר שלב להשקעה בנדל\"ן בינלאומי",
    "howItWorks.step1.title": "גלו הזדמנויות",
    "howItWorks.step1.desc": "עיינו באוסף הנכסים שלנו בשווקים מובילים באירופה.",
    "howItWorks.step2.title": "בקשו פרטים",
    "howItWorks.step2.desc": "הגישו עניין וקבלו חבילת השקעה מקיפה.",
    "howItWorks.step3.title": "ייעוץ מומחים",
    "howItWorks.step3.desc": "שיחה אישית עם מומחי השקעות מקומיים.",
    "howItWorks.step4.title": "ליווי משפטי",
    "howItWorks.step4.desc": "צוות המשפטנים שלנו ידאג לכל ההיבטים המשפטיים.",
    "howItWorks.step5.title": "השלמת עסקה",
    "howItWorks.step5.desc": "חתמו על החוזים והשלימו את ההשקעה.",
    "howItWorks.step6.title": "הרוויחו תשואות",
    "howItWorks.step6.desc": "התחילו לקבל הכנסות מהשכרה או עליית ערך.",
    "howItWorks.faq.title": "שאלות נפוצות",
    "howItWorks.cta": "עיין בהשקעות",

    // Favorites
    "favorites.title": "המועדפים שלי",
    "favorites.count": "{count} {noun} שמורים",
    "favorites.empty": "אין מועדפים עדיין",
    "favorites.emptySub": "עיינו בנכסים ולחצו על אייקון הלב כדי לשמור אותם",
    "favorites.browse": "עיון בנכסים",

    // Admin
    "admin.title": "ממשק ניהול",
    "admin.subtitle": "ניהול נכסים ({count} סה\"כ)",
    "admin.addNew": "הוסף נכס חדש",
    "admin.signInRequired": "יש להתחבר כדי לגשת לממשק הניהול",
    "admin.edit": "ערוך",
    "admin.delete": "מחק",
    "admin.deleteConfirm": "האם אתה בטוח שברצונך למחוק נכס זה?",
    "admin.addProperty": "הוסף נכס",
    "admin.editProperty": "ערוך נכס",
    "admin.updateProperty": "עדכן נכס",
    "admin.cancel": "ביטול",

    // Auth
    "auth.signIn": "התחברות",
    "auth.signUp": "הרשמה",
    "auth.createAccount": "יצירת חשבון",
    "auth.signInDesc": "התחברו כדי לגשת לנכסים השמורים ולחשבון שלכם",
    "auth.signUpDesc": "צרו חשבון כדי לשמור מועדפים ולעקוב אחר השקעות",
    "auth.password": "סיסמה",
    "auth.passwordPlaceholder": "מינימום 6 תווים",
    "auth.noAccount": "אין לכם חשבון?",
    "auth.hasAccount": "כבר יש לכם חשבון?",
    "auth.pleaseWait": "אנא המתינו...",
    "auth.checkEmail": "בדקו את האימייל שלכם לאישור החשבון.",
  },

  en: {
    // Navbar
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.countries": "Countries",
    "nav.howItWorks": "How it Works",
    "nav.contact": "Contact",
    "nav.browseInvestments": "Browse Investments",
    "nav.signIn": "Sign In",
    "nav.signOut": "Sign Out",
    "nav.admin": "Admin",
    "nav.favorites": "Favorites",

    // Home
    "home.hero.title": "Global Real Estate Investments for Israeli Investors",
    "home.hero.subtitle": "Discover premium investment properties in Europe's top markets. Expert-curated opportunities with transparent pricing and high returns.",
    "home.search.country": "Country",
    "home.search.city": "City",
    "home.search.budget": "Budget",
    "home.search.allCountries": "All Countries",
    "home.search.anyCity": "Any city",
    "home.search.anyBudget": "Any Budget",
    "home.search.button": "Search Properties",
    "home.search.upTo": "Up to",
    "home.stats.countries": "Countries",
    "home.stats.properties": "Properties",
    "home.stats.avgRoi": "Avg. ROI",
    "home.stats.startingFrom": "Starting From",
    "home.featured.title": "Featured Investment Properties",
    "home.featured.subtitle": "Hand-picked properties with strong ROI potential in Europe's most promising real estate markets.",
    "home.featured.browseAll": "Browse All Investments",
    "home.howItWorks.title": "How ISRAVEST Works",
    "home.howItWorks.subtitle": "A simple, transparent process from property discovery to investment completion.",
    "home.howItWorks.step": "STEP",
    "home.steps.browse.title": "Browse Properties",
    "home.steps.browse.desc": "Explore curated international real estate opportunities across top investment markets.",
    "home.steps.request.title": "Request Details",
    "home.steps.request.desc": "Submit your interest and receive a comprehensive investment package with all the details.",
    "home.steps.consult.title": "Expert Consultation",
    "home.steps.consult.desc": "Connect with our local investment experts for personalized guidance and due diligence.",
    "home.steps.invest.title": "Invest & Earn",
    "home.steps.invest.desc": "Complete your investment with full legal support and start earning returns.",
    "home.countries.title": "Investment Countries",
    "home.countries.subtitle": "Explore real estate opportunities in these carefully selected markets.",
    "home.countries.properties": "properties",
    "home.cta.title": "Ready to Start Investing Internationally?",
    "home.cta.subtitle": "Join Israeli investors who are already building wealth through international real estate. Browse our curated selection of properties today.",
    "home.cta.button": "Browse Investments",

    // Properties
    "properties.title": "Investment Properties",
    "properties.subtitle": "Explore {count} curated properties across 4 countries",
    "properties.filter.country": "Country",
    "properties.filter.maxPrice": "Max Price",
    "properties.filter.type": "Property Type",
    "properties.filter.minRoi": "Min ROI",
    "properties.filter.bedrooms": "Bedrooms",
    "properties.filter.allCountries": "All Countries",
    "properties.filter.anyPrice": "Any Price",
    "properties.filter.allTypes": "All Types",
    "properties.filter.anyRoi": "Any ROI",
    "properties.filter.any": "Any",
    "properties.filter.clear": "Clear Filters",
    "properties.filter.upTo": "Up to",
    "properties.showing": "Showing {count} {noun}",
    "properties.property": "property",
    "properties.propertiesNoun": "properties",
    "properties.noResults": "No properties match your filters",
    "properties.noResultsSub": "Try adjusting your search criteria",
    "properties.loading": "Loading properties...",

    // Property Card
    "card.roi": "ROI",
    "card.bedroom": "Bedroom",
    "card.bedrooms": "Bedrooms",
    "card.cta": "Request Investment Package",

    // Property Details
    "detail.home": "Home",
    "detail.properties": "Properties",
    "detail.expectedRoi": "Expected ROI",
    "detail.bedrooms": "Bedrooms",
    "detail.propertyType": "Property Type",
    "detail.country": "Country",
    "detail.about": "About This Property",
    "detail.agent": "Investment Agent",
    "detail.requestDetails": "Request Investment Details",
    "detail.formSubtitle": "Fill out the form and our team will get back to you within 24 hours.",

    // Lead Form
    "form.name": "Full Name",
    "form.namePlaceholder": "Your full name",
    "form.email": "Email",
    "form.emailPlaceholder": "your@email.com",
    "form.phone": "Phone",
    "form.phonePlaceholder": "+972...",
    "form.budget": "Investment Budget",
    "form.budgetPlaceholder": "Select your budget",
    "form.message": "Message",
    "form.messagePlaceholder": "Tell us about your investment goals...",
    "form.submit": "Submit Request",
    "form.submitting": "Submitting...",
    "form.thankYou": "Thank You!",
    "form.thankYouSub": "Your request has been submitted. Our investment team will contact you shortly.",
    "form.error": "Something went wrong. Please try again.",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with our investment team",
    "contact.heading": "Let's Discuss Your Investment Goals",
    "contact.description": "Whether you're a first-time international investor or an experienced portfolio builder, our team is here to help you navigate global real estate opportunities.",
    "contact.emailLabel": "Email",
    "contact.officeLabel": "Office",
    "contact.office": "Tel Aviv, Israel",
    "contact.hoursLabel": "Hours",
    "contact.hours": "Sunday - Thursday, 9:00 - 18:00 IST",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.sent": "Message Sent!",
    "contact.sentSub": "Thank you for reaching out. We'll get back to you within 24 hours.",
    "contact.messagePlaceholder": "How can we help you?",

    // Countries
    "countries.title": "Investment Countries",
    "countries.subtitle": "Explore real estate opportunities in these carefully selected markets",
    "countries.investmentOverview": "Investment Overview",
    "countries.keyHighlights": "Key Highlights",

    // How It Works
    "howItWorks.title": "How It Works",
    "howItWorks.subtitle": "A step-by-step guide to international real estate investment",
    "howItWorks.step1.title": "Discover Opportunities",
    "howItWorks.step1.desc": "Browse our curated property collection across top European markets.",
    "howItWorks.step2.title": "Request Details",
    "howItWorks.step2.desc": "Submit your interest and receive a comprehensive investment package.",
    "howItWorks.step3.title": "Expert Consultation",
    "howItWorks.step3.desc": "Personal consultation with local investment experts.",
    "howItWorks.step4.title": "Legal Setup",
    "howItWorks.step4.desc": "Our legal team handles all legal aspects.",
    "howItWorks.step5.title": "Complete Purchase",
    "howItWorks.step5.desc": "Sign contracts and complete the investment.",
    "howItWorks.step6.title": "Earn Returns",
    "howItWorks.step6.desc": "Start receiving rental income or capital appreciation.",
    "howItWorks.faq.title": "Frequently Asked Questions",
    "howItWorks.cta": "Browse Investments",

    // Favorites
    "favorites.title": "My Favorites",
    "favorites.count": "{count} saved {noun}",
    "favorites.empty": "No favorites yet",
    "favorites.emptySub": "Browse properties and click the heart icon to save them",
    "favorites.browse": "Browse Properties",

    // Admin
    "admin.title": "Admin Panel",
    "admin.subtitle": "Manage properties ({count} total)",
    "admin.addNew": "Add New Property",
    "admin.signInRequired": "Sign in to access the admin panel",
    "admin.edit": "Edit",
    "admin.delete": "Delete",
    "admin.deleteConfirm": "Are you sure you want to delete this property?",
    "admin.addProperty": "Add Property",
    "admin.editProperty": "Edit Property",
    "admin.updateProperty": "Update Property",
    "admin.cancel": "Cancel",

    // Auth
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",
    "auth.createAccount": "Create Account",
    "auth.signInDesc": "Sign in to access your saved properties and account",
    "auth.signUpDesc": "Create an account to save favorites and track investments",
    "auth.password": "Password",
    "auth.passwordPlaceholder": "Minimum 6 characters",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "auth.pleaseWait": "Please wait...",
    "auth.checkEmail": "Check your email to confirm your account.",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "he",
  setLang: () => {},
  t: (key: string) => key,
  dir: "rtl",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("he");

  useEffect(() => {
    const stored = localStorage.getItem("isravest_lang") as Lang | null;
    if (stored && (stored === "he" || stored === "en")) {
      setLangState(stored);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("isravest_lang", newLang);
  };

  const t = (key: string) => translations[lang][key] || key;
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
