# Danish Ejaz — Developer Portfolio

A single-page, dark-themed developer portfolio built with **React 19**, **TypeScript**, **Vite** and **Tailwind CSS v4**. It presents my experience, skills, projects and certifications, and includes three interactive "playgrounds" that simulate core workflows from projects I have built (a multi-tenant finance platform, a doctor consultation app and an ML phishing detector).

> The playgrounds are simplified, client-side conceptual simulations. Real production systems differ in design, UI and implementation.

---

## Features

- **Single-page layout with smooth scrolling** — fixed navigation with scroll-spy that highlights the active section (About, Experience, Skills, Portfolio, Playgrounds, Certifications, Contact).
- **Interactive particle background** — a canvas-based constellation effect with depth layers that reacts to the mouse.
- **Experience timeline and skill categories** — rendered from structured data, so content is edited in one place.
- **Project showcase** — nine projects with category tags (Enterprise, AI/ML, Mobile, Web), technology badges, key features, and GitHub or live links.
- **Live Dev Playgrounds** — three tabbed, in-browser simulations:
  - **Costwise SaaS** — isolated tenant resolution (schema switching) and streaming upload pipelines.
  - **Doctor App** — dual doctor/patient roles, live chat and voice dictation flow.
  - **Phishing ML** — URL analysis covering SSL, subdomain depth and token weights.
- **Printable CV** — a resume modal that uses the browser print dialog (`window.print()`) with print-specific styles to "Save as PDF".
- **Contact section** — contact details and a contact form UI (see the note under [Known Limitations](#known-limitations)).
- **Animations** — fade/scale transitions via Tailwind utilities and the `motion` library.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 19, TypeScript 5.8 |
| Build tool | Vite 6 with `@vitejs/plugin-react` |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`), custom CSS animations and print rules |
| Icons / motion | `lucide-react`, `motion` |
| Fonts | Roboto Slab, Nova Square (Google Fonts) |

## Project Structure

```
.
├── index.html              # Vite HTML entry
├── metadata.json           # App metadata (name, description)
├── package.json
├── tsconfig.json
├── vite.config.ts          # React + Tailwind plugins, "@" path alias
└── src
    ├── main.tsx            # React root
    ├── App.tsx             # Page composition, scroll-spy, sandbox tabs
    ├── data.ts             # All portfolio content (info, skills, jobs, projects, certs)
    ├── types.ts            # Project, Experience, Education, Certification types
    ├── index.css           # Tailwind import, theme fonts, animations, print styles
    └── components
        ├── Navigation.tsx          # Fixed header + mobile menu + resume button
        ├── About.tsx               # Intro / profile section
        ├── Experience.tsx          # Work experience timeline
        ├── Skills.tsx              # Skill categories
        ├── Projects.tsx            # Filterable project cards
        ├── CostwiseDemo.tsx        # Multi-tenant SaaS playground
        ├── DoctorAppDemo.tsx       # Doctor consultation playground
        ├── PhishingDemo.tsx        # Phishing URL analyser playground
        ├── Certifications.tsx      # Certificates list
        ├── Contact.tsx             # Contact info + form
        ├── ResumeModal.tsx         # Printable CV modal
        └── InteractiveBackground.tsx  # Canvas particle background
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm

### Installation

```bash
git clone https://github.com/m-danish-ejaz/m-danish-ejaz.git
cd m-danish-ejaz
npm install
```

### Run in development

```bash
npm run dev
```

The dev server runs at <http://localhost:3000> (bound to `0.0.0.0`, so it is also reachable on your local network).

### Other scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run clean` | Remove `dist` and `server.js` (uses `rm -rf`; on Windows use Git Bash or WSL) |

## Customizing the Content

Almost everything shown on the site lives in [`src/data.ts`](src/data.ts):

| Export | What it controls |
| --- | --- |
| `PERSONAL_INFO` | Name, title, location, email, phone, GitHub / LinkedIn / WhatsApp, about text |
| `SKILL_CATEGORIES` | Skills section groups |
| `WORK_EXPERIENCE` | Experience timeline |
| `EDUCATION` | Education entries (shown in the printable CV) |
| `CERTIFICATIONS` | Certifications list |
| `PROJECTS` | Portfolio cards (title, technologies, features, links, category) |

To add a project, append an object to `PROJECTS` that follows the `Project` interface in [`src/types.ts`](src/types.ts):

```ts
{
  id: "my-project",
  title: "My Project",
  platform: "Web Application",
  technologies: ["React", "TypeScript"],
  description: "One-line summary.",
  keyFeatures: ["Feature one", "Feature two"],
  period: "Jan 2026 - Present",
  github: "https://github.com/<user>/<repo>",
  category: "Web" // "Enterprise" | "AI/ML" | "Mobile" | "Web"
}
```

Theme colours and fonts are defined in [`src/index.css`](src/index.css) (`@theme` block) and in Tailwind classes inside each component.

## Printable CV

Click the resume button in the navigation to open the CV modal, then choose **Send to PDF (System Printer)**. The modal triggers the browser print dialog, and `@media print` rules in `index.css` switch the layout to a white, paper-style page. Choose **Save as PDF** as the destination.

## Deployment

The project is a static Vite app:

```bash
npm run build
```

Upload the generated `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages). For GitHub Pages under a sub-path, set `base` in `vite.config.ts` to your repository name.

## Known Limitations

- The **contact form is a front-end simulation**: submitting it shows a success state after a short delay and keeps the message in local component state only. To receive real messages, connect it to a service such as Formspree, EmailJS or your own API.
- The **playgrounds are simulations** and do not call real backends or ML models.
- `package.json` still lists `@google/genai`, `express` and `dotenv` (left over from the Google AI Studio scaffold). They are not used by the code in `src/` and can be removed.
- `Contact.tsx` references a second email (`PERSONAL_INFO.emails[1]`) while `data.ts` defines only one, so add a second address or remove that line.
- `index.html` still has the default title "My Google AI Studio App"; change it to something like "Danish Ejaz — Software Engineer".

## Contact

- **Email:** mdanishejaz@outlook.com
- **LinkedIn:** [linkedin.com/in/danish-ejaz512](https://linkedin.com/in/danish-ejaz512)
- **GitHub:** [github.com/m-danish-ejaz](https://github.com/m-danish-ejaz)

---

© Danish Ejaz. All rights reserved.
