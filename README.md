# Telegram Veille — Daily Briefing Dashboard

**Automated intelligence dashboard for Business · Finance · Geopolitics**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Notion API](https://img.shields.io/badge/Notion-API-000000?style=flat-square&logo=notion)](https://developers.notion.com/)
[![Deployed on Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=flat-square&logo=netlify)](https://www.netlify.com/)

---

## Overview

A Next.js dashboard that displays the output of an automated Telegram monitoring script. Every day at 6:00 PM Paris time, the script collects messages from 9 Telegram channels, selects the **10 most important pieces of news** using AI (Gemini 2.0 Flash via OpenRouter), and pushes them to a Notion database. This dashboard reads and displays them.

**Python script repository**: [telegram-veille](https://github.com/julesmoreau62/telegram-veille)

---

## How it works

```
Telegram (9 channels)
       │
       ▼
Python script (GitHub Actions — 6:00 PM Paris)
       │  Top 10 selection via OpenRouter / Gemini
       ▼
Notion Database
       │
       ▼
Next.js Dashboard (Netlify)
  ├── Today's briefing (10 news in a grid)
  └── Archive (previous entries, filterable by category)
```

---

## Monitored channels

| Handle | Source |
|--------|--------|
| @bloomberg | Bloomberg |
| @scmpnews | South China Morning Post |
| @BBCBreaking | BBC Breaking |
| @ReutersWorldChannel | Reuters World |
| @politicoeurope | Politico Europe |
| @AJENews_Official | Al Jazeera English |
| @ClashReport | Clash Report |
| @ourwarstoday | Our Wars Today |
| @intelslava | Intel Slava (pro-Russian — cross-check recommended) |

---

## Notion database schema

| Property | Type | Description |
|----------|------|-------------|
| Titre | Title | Headline in French (max 90 chars) |
| Résumé | Text | 2–3 sentence summary |
| Canal | Select | Source name |
| Catégorie | Select | Finance, Géopolitique, Conflits, Énergie, Commerce, Europe, Asie, Autre |
| Importance | Select | HIGH / MEDIUM |
| Rang | Number | Rank 1 to 10 |
| Date | Date | Briefing date |
| Source | URL | Direct link to the Telegram message |

---

## Project structure

```
├── app/
│   ├── page.js                  # Entry point → VeilleDashboard
│   ├── layout.js
│   ├── globals.css
│   └── api/veille/
│       └── route.js             # API route → Notion read
├── components/
│   ├── VeilleDashboard.js       # Main dashboard component
│   └── VeilleDashboard.module.css
├── package.json
├── next.config.js
└── netlify.toml
```

---

## Environment variables (Netlify)

```bash
NOTION_TOKEN=secret_xxxxxxxxxxxxx     # Notion integration token
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxx  # Notion database ID
```

---

## Local development

```bash
git clone https://github.com/julesmoreau62/Intel-Dashboard
cd Intel-Dashboard

pnpm install

# Create .env.local
echo "NOTION_TOKEN=secret_xxx" > .env.local
echo "NOTION_DATABASE_ID=xxx" >> .env.local

pnpm dev
```

Open `http://localhost:3000`

---

## Deployment

Push to `main` → automatic deployment via Netlify.

---

*Built with Next.js · Notion API · Gemini 2.0 Flash via OpenRouter · GitHub Actions*

Copyright © 2026 Jules Moreau
