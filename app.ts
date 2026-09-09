type MargSession = {
  email: string;
  loggedIn: boolean;
};

type MargFeature =
  | "Smart Hotel & Transport Booking"
  | "Smart Route & Destination Suggestions"
  | "AI-Based Trip Planning"
  | "Emergency SOS Support"
  | "Companion Traveller Details"
  | "Budget Intelligence"
  | "Crowd-Aware Tourism"
  | "Multilingual Support"
  | "Local Community Focus"
  | "Sustainable Tourism"
  | "Trusted & Verified Information";

// Frontend prototype contract. The browser runs app.js; app.ts documents the
// typed model that can be used when the project is moved to a TypeScript build.
const margFeatures: MargFeature[] = [
  "Smart Hotel & Transport Booking",
  "Smart Route & Destination Suggestions",
  "AI-Based Trip Planning",
  "Emergency SOS Support",
  "Companion Traveller Details",
  "Budget Intelligence",
  "Crowd-Aware Tourism",
  "Multilingual Support",
  "Local Community Focus",
  "Sustainable Tourism",
  "Trusted & Verified Information"
];
