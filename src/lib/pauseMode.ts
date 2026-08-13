// Pause Mode Configuration
// Set this to true to put the platform in maintenance mode

export const PAUSE_MODE = process.env.NEXT_PUBLIC_PAUSE_MODE === "true";

export const pauseModeMessages = {
  he: {
    title: "הפלטפורמה בעדכון",
    message:
      "אנחנו כרגע בעיצוב מחדש של MANAIO כדי להביא לכם חוויה עדכנית ומשופרת. נחזור בקרוב עם פיצ'רים חדשים מרגשים!",
    contact:
      "אם יש לכם שאלות, אנא צרו קשר עם הצוות שלנו ב-",
    email: "support@manaio.com",
  },
  en: {
    title: "Platform Under Maintenance",
    message:
      "We're currently redesigning MANAIO to bring you an updated and improved experience. We'll be back soon with exciting new features!",
    contact:
      "If you have any questions, please reach out to our team at",
    email: "support@manaio.com",
  },
};
