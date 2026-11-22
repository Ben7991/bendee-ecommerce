import type { CustomerMessage } from "./MessageMatrix";

export const MESSAGES: CustomerMessage[] = [
  { id: "login", title: "Login code", description: "6-digit code when a customer signs in", sms: "always", email: null, delivered: "98.6%", href: "/t/login" },
  { id: "confirmed", title: "Order confirmed", description: "After payment", sms: true, email: true, delivered: "98.9%", href: "/t/confirmed" },
  { id: "courier", title: "Handed to courier", description: "When staff mark the order handed to the courier", sms: true, email: false, delivered: "98.4%", href: "/t/courier", selected: true },
];
