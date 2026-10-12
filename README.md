# 🔍 GitHub Finder

A fast, clean web app for searching GitHub users and viewing their profiles, built with **React**, **TypeScript** and **TanStack Query**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5-FF4154?logo=reactquery&logoColor=white)

---

## ✨ Features

- **Search GitHub users** by username and see their avatar, name, bio and a link to their profile
- **Live suggestions** that appear while you type, with debounced requests (300 ms) so the API isn't called on every keystroke
- **Recent searches** that remember your last 5 users, with no duplicates and the newest first
- **Saved across reloads**: recent searches are stored in `localStorage`
- **Hover to prefetch**: hovering over a recent search loads the profile in the background, so clicking it is instant
- **Smart caching**: results stay fresh for 5 minutes, which avoids repeated API calls and respects GitHub's rate limit
- **Loading and error states**, including a friendly message when a user isn't found

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) | UI components |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Vite](https://vite.dev) | Dev server and build tool |
| [TanStack Query](https://tanstack.com/query) | Data fetching, caching and prefetching |
| [use-debounce](https://github.com/xnimorz/use-debounce) | Debouncing search input |
| [React Icons](https://react-icons.github.io/react-icons) | Icons |
| [GitHub REST API](https://docs.github.com/en/rest) | User data |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20 or newer

### Installation

```bash
# Clone the repository
git clone https://github.com/Soheil86/github-finder.git
cd github-finder

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

### Environment variables

The app reads the GitHub API URL from a `.env` file in the project root:

```env
VITE_GITHUB_API_URL=https://api.github.com
```

## 📁 Project Structure

```
src/
├── api/
│   └── github.ts               # API calls: fetch a user, search users
├── components/
│   ├── UserSearch.tsx          # Main component: state, queries and logic
│   ├── SuggestionDropdown.tsx  # Live suggestions while typing
│   ├── RecentSearches.tsx      # Recent searches list with hover prefetch
│   └── UserCard.tsx            # Displays a user's profile
├── types.ts                    # Shared TypeScript types
├── App.tsx
└── main.tsx                    # App entry and QueryClient setup
```

## 🧠 What I Learned

I built this project to practice modern React, and along the way I learned:

- **Component design**: separating logic (`UserSearch`) from display components (`SuggestionDropdown`, `RecentSearches`, `UserCard`)
- **One-way data flow**: passing data down with props and sending events up with callback props like `onSelect`
- **TanStack Query**: query keys, caching, `staleTime`, conditional queries with `enabled`, and prefetching
- **Debouncing**: reducing API calls while the user types
- **Persisting state** with `localStorage`, using lazy `useState` initialization and `useEffect`
- **TypeScript in React**: typing props, events (`SubmitEvent`, `ChangeEvent`) and `import type`

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

Made by [Soheil86](https://github.com/Soheil86)
