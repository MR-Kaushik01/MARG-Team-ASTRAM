# MARG — SIH 2026 Prototype v5

## Hackathon demo flow

1. Open `index.html`.
2. The website starts at a **Sign in** screen.
3. Enter **any valid email** and **any password with 4+ characters**.
4. Click **Enter MARG**.
5. The prototype opens and the session is remembered in the browser.
6. Use **Sign out** to return to the login screen.

### Example demo credentials
- Email: `judge@marg-demo.com`
- Password: `MARG2026`

These are not real credentials. This is a frontend authentication simulation for the hackathon demo. No real account, password database, payment, or emergency dispatch is created.

## Included product flows
- AI-based trip planning
- Budget intelligence
- Crowd-aware route suggestions
- Smart hotel and transport booking
- Emergency SOS simulation
- Companion traveller details
- Multilingual selector
- Local community experiences
- Sustainable / low-crowd travel positioning
- Verified information indicators

## GitHub Pages
Upload `index.html`, `styles.css`, `app.js`, `app.ts`, and `README.md` to the root of a public GitHub repository. Enable GitHub Pages from `Settings -> Pages -> Deploy from a branch -> main -> / (root)`.

The browser executes `app.js`. `app.ts` is the typed source/model reference for a future TypeScript build.


## v5 UI
The post-login dashboard is organized as a polished travel-product interface with Home, AI Planner, Smart Booking, Destinations, Local Experiences, Safety & SOS, Companions, Trips, Community and Sustainable Travel views.


## Authentication
The prototype opens on the MARG authentication screen. Users can either sign in with any valid demo email/password (4+ characters) or use the Create Account tab to create a demo traveller profile. The entered email is reflected in the dashboard profile.
