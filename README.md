# Intelligence Dashboard

**Automated intelligence gathering platform for Sport Business and Space Industry**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Notion API](https://img.shields.io/badge/Notion-API-000000?style=flat-square&logo=notion)](https://developers.notion.com/)
[![Deployed on Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=flat-square&logo=netlify)](https://www.netlify.com/)

---

## Overview

Intelligence Dashboard is a dual-hub platform providing real-time intelligence gathering and analysis across two distinct domains:

- **Sport Business**: Global sports industry intelligence covering finance, media rights, esports, and market trends
- **Spatial**: Space industry news, mission tracking, and upcoming launch schedules

The platform leverages AI-powered content filtering and analysis to deliver high-quality, actionable intelligence from curated sources worldwide.

---

## Key Features

### 🏆 Sport Business Hub
- **27 verified international sources** across North America, Europe, and Asia-Pacific
- **Dynamic filtering** by region, sport, topic, and priority level
- **AI-powered relevance filtering** to eliminate non-business content
- **Real-time search** across all articles
- Coverage includes: Media Rights, Finance, Sponsorship, Esports, Technology, Marketing

### 🚀 Spatial Hub
- **5 specialized space industry sources**
- **Live launch tracking** via Launch Library 2 API
- **Upcoming mission calendar** with countdown timers and livestream links
- **Filtering by agency** (NASA, SpaceX, ESA, CNSA, Roscosmos, Commercial)
- **Mission type categorization** (Launch, Satellite, Exploration, Research, Commercial, Policy)

### 🎨 User Experience
- **Responsive design** optimized for desktop, tablet, and mobile
- **Animated landing page** with dual-hub selection
- **Professional dark theme** with smooth transitions
- **Instant article updates** via server-side caching (30-minute refresh)

---

## Technology Stack

**Frontend:**
- Next.js 14.2 (React 18.3)
- Custom CSS Modules
- Server-side rendering with API routes

**Backend:**
- Notion API for data storage and retrieval
- Launch Library 2 API for space launch data
- OpenRouter AI for content analysis and filtering

**Infrastructure:**
- Netlify (hosting and continuous deployment)
- GitHub Actions (automated data pipeline)
- Python 3.x (intelligence gathering script)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Intelligence Dashboard                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐              ┌──────────────┐             │
│  │   Landing    │              │   Landing    │             │
│  │     Page     │──────────────│     Page     │             │
│  │              │   Selection  │              │             │
│  └──────────────┘              └──────────────┘             │
│         │                              │                     │
│         ├──────────┬───────────────────┘                     │
│         │          │                                         │
│  ┌──────▼──────┐   ┌──────▼──────┐                          │
│  │   Sport     │   │   Spatial   │                          │
│  │  Business   │   │  Dashboard  │                          │
│  │  Dashboard  │   │             │                          │
│  └──────┬──────┘   └──────┬──────┘                          │
│         │                 │                                  │
│         │                 │                                  │
│  ┌──────▼──────┐   ┌──────▼──────┐   ┌──────────────┐      │
│  │  Notion DB  │   │  Notion DB  │   │  Launch      │      │
│  │  (Sport)    │   │  (Spatial)  │   │  Library API │      │
│  └─────────────┘   └─────────────┘   └──────────────┘      │
│         ▲                 ▲                                  │
│         │                 │                                  │
│  ┌──────┴─────────────────┴──────┐                          │
│  │   Python Intelligence Script   │                          │
│  │   (GitHub Actions - Daily)     │                          │
│  └────────────────────────────────┘                          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
sport-business-watch/
├── app/
│   ├── page.js                      # Landing page with hub selection
│   ├── page.module.css
│   ├── layout.js                    # Root layout with fonts
│   ├── globals.css                  # Global styles
│   ├── sport-business/
│   │   └── page.js                  # Sport Business dashboard
│   ├── spatial/
│   │   └── page.js                  # Spatial dashboard
│   └── api/
│       ├── articles-sport/
│       │   └── route.js             # Notion API - Sport Business
│       ├── articles-space/
│       │   └── route.js             # Notion API - Spatial
│       └── launches/
│           └── route.js             # Launch Library 2 API
├── components/
│   ├── Dashboard.js                 # Sport Business dashboard component
│   ├── Dashboard.module.css
│   ├── SpatialDashboard.js          # Spatial dashboard component
│   ├── SpatialDashboard.module.css
│   ├── UpcomingLaunches.js          # Launch tracker component
│   └── UpcomingLaunches.module.css
├── package.json
├── next.config.js
├── netlify.toml                     # Netlify deployment config
└── README.md
```

---

## Setup & Deployment

### Prerequisites

- Node.js 18.x or higher
- Notion account with API integration
- Netlify account (for deployment)

### Environment Variables

Configure the following environment variables in Netlify:

```bash
NOTION_TOKEN=secret_xxxxxxxxxxxxx           # Notion integration token
DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxx         # Sport Business database ID
DATABASE_ID_SPACE=xxxxxxxxxxxxxxxxxxxxxxxx   # Spatial database ID
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/julesmoreau62/sport-business-watch.git
cd sport-business-watch

# Install dependencies
npm install

# Create .env.local file
echo "NOTION_TOKEN=your_token" > .env.local
echo "DATABASE_ID=your_sport_db_id" >> .env.local
echo "DATABASE_ID_SPACE=your_space_db_id" >> .env.local

# Run development server
npm run dev
```

Navigate to `http://localhost:3000`

### Production Deployment

The application automatically deploys to Netlify on every push to the `main` branch.

**Manual deployment:**
```bash
npm run build
netlify deploy --prod
```

---

## Data Pipeline

Intelligence gathering is automated via a Python script running daily on GitHub Actions:

**Process:**
1. RSS feed aggregation from 32 curated sources
2. AI-powered content relevance filtering
3. Strategic analysis and categorization
4. Automated insertion into Notion databases

**Source Coverage:**
- **Sport Business**: 27 sources (North America, Europe, Asia-Pacific)
- **Spatial**: 5 specialized space industry sources

---

## Notion Database Schema

### Sport Business Database

| Property | Type | Description |
|----------|------|-------------|
| Nom | Title | Article title |
| Description | Text | AI-generated summary |
| Date | Date | Publication date |
| Link | URL | Source URL |
| Priority | Select | 🔴 High / 🟡 Medium / 🟢 Low |
| Sport | Select | Football, Esports, Multi-sport, etc. |
| Thématique | Multi-select | Finance, Media Rights, Sponsorship, etc. |
| Region | Select | North America, Europe, Asia-Pacific, etc. |

### Spatial Database

| Property | Type | Description |
|----------|------|-------------|
| Nom | Title | Article title |
| Description | Text | AI-generated summary |
| Date | Date | Publication date |
| Link | URL | Source URL |
| Priority | Select | 🔴 High / 🟡 Medium / 🟢 Low |
| Agency | Select | NASA, SpaceX, ESA, CNSA, etc. |
| Mission Type | Select | Launch, Satellite, Exploration, etc. |
| Topic | Select | Launch, Technology, Business, etc. |

---

## API Endpoints

### Internal APIs

**`GET /api/articles-sport`**
- Returns all Sport Business articles from Notion
- Cached for 30 minutes
- Sorted by date (descending)

**`GET /api/articles-space`**
- Returns all Spatial articles from Notion
- Cached for 30 minutes
- Sorted by date (descending)

**`GET /api/launches`**
- Returns upcoming space launches from Launch Library 2
- Limit: 10 launches
- Cached for 60 minutes

---

## Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)
- **Server-side caching**: 30-60 minute refresh intervals
- **Font optimization**: Variable fonts with automatic subsetting

---

## Use Cases

### Academic Research
- Master's thesis research on sports economics
- Space industry market analysis
- Media rights valuation studies

### Professional Applications
- Industry monitoring for sports business professionals
- Competitive intelligence for esports organizations
- Launch schedule tracking for aerospace companies

### Portfolio Demonstration
- Full-stack development capabilities
- API integration expertise
- UI/UX design proficiency
- Data pipeline automation

---

## Roadmap

**Phase 2 (Q2 2025)**
- [ ] User authentication and personalized feeds
- [ ] Export functionality (PDF, CSV)
- [ ] Email digest subscriptions
- [ ] Advanced analytics dashboard

**Phase 3 (Q3 2025)**
- [ ] Multi-language support (FR, ES, CN)
- [ ] Mobile applications (iOS, Android)
- [ ] Webhook integrations (Slack, Discord)

---

## Contributing

This is a private academic project. For collaboration inquiries, please contact me.

---

## License

Copyright © 2025 Jules Moreau. All rights reserved.

This project is part of a Master's program in Sport Management and is not licensed for commercial use or redistribution.

---

## Contact & Links

**Author**: Jules Moreau  
**Program**: Master 1 - International Sport Administration  
**Institution**: Université de Lille 

**Live Demo**: [Deployed on Netlify](https://sport-business-watch.netlify.app)  
**Related Project**: [Intelligence Gathering Script](https://github.com/julesmoreau62/veille-sport-biz)

---

*Built with Next.js, Notion API, and AI-powered intelligence filtering*
