'use client';

import { useState, useEffect } from 'react';
import { Search, Globe, Radio, AlertTriangle, ExternalLink, Calendar, ChevronRight } from 'lucide-react';
import styles from './VeilleDashboard.module.css';

const CATEGORY_COLORS = {
  'Finance':      '#ff6a00',
  'Géopolitique': '#00d4ff',
  'Conflits':     '#ff3333',
  'Énergie':      '#ffcc00',
  'Commerce':     '#a78bfa',
  'Europe':       '#34d399',
  'Asie':         '#f472b6',
  'Autre':        '#808080',
};

export default function VeilleDashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [archiveFilter, setArchiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/veille')
      .then(r => r.json())
      .then(data => {
        setEntries(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => { setEntries([]); setLoading(false); });
  }, []);

  if (loading) return <LoadingScreen />;

  const today = entries.length > 0 ? entries[0].date : '';
  const todayEntries = entries.filter(e => e.date === today).sort((a, b) => a.rang - b.rang);
  const archiveEntries = entries.filter(e => e.date !== today);

  const filteredArchive = archiveEntries.filter(e => {
    const matchCat = archiveFilter === 'all' || e.categorie === archiveFilter;
    const matchSearch = search === '' ||
      e.titre.toLowerCase().includes(search.toLowerCase()) ||
      e.resume.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const uniqueCategories = ['all', ...new Set(archiveEntries.map(e => e.categorie))];

  const archiveByDate = {};
  filteredArchive.forEach(e => {
    if (!archiveByDate[e.date]) archiveByDate[e.date] = [];
    archiveByDate[e.date].push(e);
  });
  const archiveDates = Object.keys(archiveByDate).sort((a, b) => b.localeCompare(a));

  const todayLabel = today
    ? new Date(today + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()
    : '—';

  return (
    <div className={styles.page}>
      <div className={styles.scanline} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.sysTag}>
            <Radio size={11} />
            <span>TELEGRAM VEILLE</span>
          </div>
          <span className={styles.headerDate}>
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
          </span>
        </div>
        <h1 className={styles.title}>BRIEFING QUOTIDIEN</h1>
        <p className={styles.subtitle}>{'// BUSINESS · FINANCE · GÉOPOLITIQUE'}</p>
      </header>

      <div className={styles.container}>
        <div className={styles.statsRow}>
          <StatItem value={todayEntries.length} label="BRIEFINGS DU JOUR" />
          <div className={styles.statDivider} />
          <StatItem value={todayEntries.filter(e => e.importance === 'HIGH').length} label="HIGH PRIORITY" accent="red" />
          <div className={styles.statDivider} />
          <StatItem value={archiveEntries.length} label="EN ARCHIVE" />
          <div className={styles.statDivider} />
          <StatItem value={9} label="CANAUX TELEGRAM" />
        </div>

        {/* TODAY SECTION */}
        <div className={styles.sectionLabel}>
          <span className={styles.sectionLine} />
          <span className={styles.sectionText}>BRIEFING DU {todayLabel}</span>
          <span className={styles.sectionLine} />
        </div>

        <div className={styles.todayGrid}>
          {todayEntries.map(entry => (
            <TodayCard key={entry.id} entry={entry} />
          ))}
          {todayEntries.length === 0 && (
            <div className={styles.empty}>
              <Globe size={24} />
              <span>Aucun briefing pour aujourd'hui. Prochain run à 18h00.</span>
            </div>
          )}
        </div>

        {/* ARCHIVE SECTION */}
        {archiveEntries.length > 0 && (
          <>
            <div className={styles.archiveSeparator}>
              <div className={styles.archiveSepLine} />
              <span className={styles.archiveSepLabel}>
                <Calendar size={12} />
                ARCHIVE — {archiveEntries.length} ENTRÉES
              </span>
              <div className={styles.archiveSepLine} />
            </div>

            <div className={styles.archiveFilters}>
              <div className={styles.searchBox}>
                <Search size={13} />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Rechercher dans l'archive..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className={styles.catChips}>
                {uniqueCategories.map(cat => (
                  <button
                    key={cat}
                    className={`${styles.catChip} ${archiveFilter === cat ? styles.catChipActive : ''}`}
                    onClick={() => setArchiveFilter(cat)}
                    style={archiveFilter === cat && cat !== 'all'
                      ? { borderColor: CATEGORY_COLORS[cat], color: CATEGORY_COLORS[cat] }
                      : {}}
                  >
                    {cat === 'all' ? 'Tout' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.archiveList}>
              {archiveDates.map(date => (
                <div key={date} className={styles.archiveDateGroup}>
                  <div className={styles.archiveDateLabel}>
                    {new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}
                  </div>
                  <div className={styles.archiveCards}>
                    {archiveByDate[date].sort((a, b) => a.rang - b.rang).map(entry => (
                      <ArchiveCard key={entry.id} entry={entry} />
                    ))}
                  </div>
                </div>
              ))}
              {archiveDates.length === 0 && (
                <div className={styles.empty}>
                  <span>Aucun résultat pour ce filtre.</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerStatus}>
          <span className={styles.statusDot} />
          SYS: OPERATIONAL · MAJ 18H00 PARIS
        </span>
        <span className={styles.footerVersion}>TELEGRAM VEILLE v1.0</span>
      </footer>
    </div>
  );
}

function StatItem({ value, label, accent }) {
  return (
    <div className={styles.statItem}>
      <span className={`${styles.statNum} ${accent === 'red' ? styles.statNumRed : ''}`}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function TodayCard({ entry }) {
  const isHigh = entry.importance === 'HIGH';
  const catColor = CATEGORY_COLORS[entry.categorie] || '#808080';

  return (
    <a href={entry.source || '#'} target="_blank" rel="noopener noreferrer" className={styles.todayLink}>
      <article className={`${styles.todayCard} ${isHigh ? styles.todayCardHigh : ''}`}>
        <div className={styles.todayCardTop}>
          <span className={styles.todayRank}>#{entry.rang}</span>
          <div className={styles.todayBadges}>
            {isHigh && (
              <span className={styles.highBadge}>
                <AlertTriangle size={9} />
                HIGH
              </span>
            )}
            <span
              className={styles.catBadge}
              style={{ color: catColor, borderColor: catColor + '40', background: catColor + '12' }}
            >
              {entry.categorie}
            </span>
          </div>
        </div>
        <h3 className={styles.todayTitle}>{entry.titre}</h3>
        {entry.resume && <p className={styles.todayResume}>{entry.resume}</p>}
        <div className={styles.todayFooter}>
          <span className={styles.todayCanal}>{entry.canal}</span>
          <span className={styles.todayRead}>
            SOURCE <ExternalLink size={10} />
          </span>
        </div>
      </article>
    </a>
  );
}

function ArchiveCard({ entry }) {
  const isHigh = entry.importance === 'HIGH';
  const catColor = CATEGORY_COLORS[entry.categorie] || '#808080';

  return (
    <a href={entry.source || '#'} target="_blank" rel="noopener noreferrer" className={styles.archiveLink}>
      <div className={`${styles.archiveCard} ${isHigh ? styles.archiveCardHigh : ''}`}>
        <span className={styles.archiveRank}>#{entry.rang}</span>
        <span className={styles.catDot} style={{ background: catColor }} />
        <div className={styles.archiveCardBody}>
          <span className={styles.archiveCat} style={{ color: catColor }}>{entry.categorie}</span>
          <p className={styles.archiveTitle}>{entry.titre}</p>
        </div>
        <ChevronRight size={13} className={styles.archiveArrow} />
      </div>
    </a>
  );
}

function LoadingScreen() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingBox}>
        <div className={styles.loadingPulse} />
        <span className={styles.loadingText}>CHARGEMENT DU BRIEFING...</span>
      </div>
    </div>
  );
}
