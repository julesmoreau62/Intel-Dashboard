# Telegram Veille — Briefing Quotidien

**Dashboard de veille automatisée Business · Finance · Géopolitique**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Notion API](https://img.shields.io/badge/Notion-API-000000?style=flat-square&logo=notion)](https://developers.notion.com/)
[![Deployed on Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=flat-square&logo=netlify)](https://www.netlify.com/)

---

## Vue d'ensemble

Dashboard Next.js qui affiche les résultats du script de veille Telegram. Chaque jour à 18h00 (heure de Paris), le script collecte les messages de 9 canaux Telegram, sélectionne les **10 infos les plus importantes** via IA (Gemini 2.0 Flash), et les pousse dans une base Notion. Ce dashboard les lit et les affiche.

**Dépôt du script Python** : [telegram-veille](https://github.com/julesmoreau62/telegram-veille)

---

## Fonctionnement

```
Telegram (9 canaux)
       │
       ▼
Python script (GitHub Actions — 18h00 Paris)
       │  Sélection top 10 via OpenRouter / Gemini
       ▼
Notion Database
       │
       ▼
Next.js Dashboard (Netlify)
  ├── Briefing du jour (10 news en grille)
  └── Archive (entrées précédentes, filtrables)
```

---

## Canaux surveillés

| Canal | Source |
|-------|--------|
| @bloomberg | Bloomberg |
| @scmpnews | South China Morning Post |
| @BBCBreaking | BBC Breaking |
| @ReutersWorldChannel | Reuters World |
| @politicoeurope | Politico Europe |
| @AJENews_Official | Al Jazeera English |
| @ClashReport | Clash Report |
| @ourwarstoday | Our Wars Today |
| @intelslava | Intel Slava (pro-russe — croiser) |

---

## Schéma Notion

| Propriété | Type | Description |
|-----------|------|-------------|
| Titre | Title | Headline en français (max 90 chars) |
| Résumé | Text | Résumé en 2-3 phrases |
| Canal | Select | Nom de la source |
| Catégorie | Select | Finance, Géopolitique, Conflits, Énergie, Commerce, Europe, Asie, Autre |
| Importance | Select | HIGH / MEDIUM |
| Rang | Number | Position 1 à 10 |
| Date | Date | Date du briefing |
| Source | URL | Lien direct vers le message Telegram |

---

## Structure du projet

```
├── app/
│   ├── page.js                  # Page principale → VeilleDashboard
│   ├── layout.js
│   ├── globals.css
│   └── api/veille/
│       └── route.js             # Route API → lecture Notion
├── components/
│   ├── VeilleDashboard.js       # Dashboard principal
│   └── VeilleDashboard.module.css
├── package.json
├── next.config.js
└── netlify.toml
```

---

## Variables d'environnement (Netlify)

```bash
NOTION_TOKEN=secret_xxxxxxxxxxxxx     # Token d'intégration Notion
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxx  # ID de la base de données
```

---

## Développement local

```bash
git clone https://github.com/julesmoreau62/Intel-Dashboard
cd Intel-Dashboard

pnpm install

# Créer .env.local
echo "NOTION_TOKEN=secret_xxx" > .env.local
echo "NOTION_DATABASE_ID=xxx" >> .env.local

pnpm dev
```

Ouvrir `http://localhost:3000`

---

## Déploiement

Push sur `main` → déploiement automatique via Netlify.

---

*Next.js · Notion API · Gemini 2.0 Flash via OpenRouter · GitHub Actions*

Copyright © 2025 Jules Moreau
