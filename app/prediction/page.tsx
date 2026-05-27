'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import styles from './page.module.css'

const disasters = [
  { type: 'Flood', distance: '0.7 km from location', severity: 'moderate', timing: 'in 2 days', duration: '12-24 hours', confidence: 90 },
  { type: 'Hurricane', distance: '0.7 km from location', severity: 'severe', timing: 'in 4 days', duration: '12-24 hours', confidence: 80 },
  { type: 'Heatwaves', distance: '0.7 km from location', severity: 'extreme', timing: 'in 2 days', duration: '12-24 hours', confidence: 60 },
]

const weeklyTemp = [30, 31, 29, 30.5, 31.5, 33, 30]
const weeklyHumidity = [70, 69, 75, 72, 68, 65, 67]
const weeklyRain = [5, 0, 10, 4, 2, 1, 7]
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function MiniChart({ data, color, label, unit }: { data: number[], color: string, label: string, unit: string }) {
  const min = Math.min(...data), max = Math.max(...data)
  const h = 80, w = 700, pad = 32
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad / 2 - ((v - min) / (max - min + 0.001)) * (h - pad)
    return `${x},${y}`
  }).join(' ')
  return (
    <div className={styles.chart}>
      <div className={styles.chartTitle}>{label}</div>
      <svg viewBox={`0 0 ${w} ${h}`} className={styles.chartSvg}>
        <polyline fill="none" stroke={color} strokeWidth="2" points={pts} />
        {data.map((v, i) => {
          const x = pad + (i / (data.length - 1)) * (w - pad * 2)
          const y = h - pad / 2 - ((v - min) / (max - min + 0.001)) * (h - pad)
          return <circle key={i} cx={x} cy={y} r={3} fill={color} />
        })}
        {days.map((d, i) => (
          <text key={i} x={pad + (i / (days.length - 1)) * (w - pad * 2)} y={h - 2} textAnchor="middle" fontSize={11} fill="#9ca3af">{d}</text>
        ))}
        <text x={pad - 4} y={pad / 2 + 4} textAnchor="end" fontSize={11} fill="#9ca3af">{max}</text>
        <text x={pad - 4} y={h - pad / 2 + 4} textAnchor="end" fontSize={11} fill="#9ca3af">{min}</text>
      </svg>
    </div>
  )
}

const severityLevels = ['Low', 'Medium', 'Moderate', 'Severe', 'Extreme']
const severityColors = ['#4ade80', '#facc15', '#fb923c', '#ef4444', '#b91c1c']

export default function PredictionPage() {
  const [tab, setTab] = useState<'disasters' | 'climate'>('disasters')
  const [selected, setSelected] = useState<typeof disasters[0] | null>(null)

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.body}>
        {/* Left: map */}
        <div className={styles.left}>
          <div className={styles.searchRow}>
            <div className={styles.searchBox}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input className={styles.searchInput} placeholder="Search location..." />
            </div>
          </div>
          <div className={styles.mapArea}>
            <iframe
              className={styles.map}
              src="https://www.openstreetmap.org/export/embed.html?bbox=106.9,−6.5,107.1,−6.3&layer=mapnik"
              title="Prediction Map"
            />
            <div className={styles.mapIcons}>
              <button className={styles.mapIcon}>📍</button>
              <button className={styles.mapIcon}>⚠️</button>
              <button className={styles.mapIcon}>▶</button>
            </div>
          </div>
        </div>

        {/* Right: panel */}
        <div className={styles.right}>
          <div className={styles.panelHeader}>
            {tab === 'disasters' && !selected && <h2 className={styles.panelTitle}>Upcoming Disasters</h2>}
            {tab === 'climate' && <h2 className={styles.panelTitle}>Weekly Climate Visualization</h2>}
            {selected && <div><div className={styles.panelSubtitle}>Prediction:</div><div className={styles.panelBig}>{selected.type}</div></div>}
            <div className={styles.tabGroup}>
              <button className={`${styles.tab} ${tab === 'disasters' ? styles.tabActive : ''}`} onClick={() => { setTab('disasters'); setSelected(null) }}>Upcoming Disasters</button>
              <button className={`${styles.tab} ${tab === 'climate' ? styles.tabActive : ''}`} onClick={() => { setTab('climate'); setSelected(null) }}>Weekly Climate Visualization</button>
            </div>
          </div>

          {/* Disasters list */}
          {tab === 'disasters' && !selected && (
            <div className={styles.disasterList}>
              {disasters.map(d => (
                <button key={d.type} className={styles.disasterCard} onClick={() => setSelected(d)}>
                  <div className={styles.disasterName}>{d.type}</div>
                  <div className={styles.disasterMeta}>
                    <span className={styles.pill}>📍 {d.distance}</span>
                    <span className={styles.pill}>{d.severity}</span>
                    <span className={styles.confidence} style={{ background: `${d.confidence > 80 ? '#a5f3fc' : d.confidence > 65 ? '#a5f3fc' : '#bfdbfe'}` }}>{d.confidence}%</span>
                  </div>
                  <div className={styles.disasterMeta}>
                    <span className={styles.pill}>⏰ {d.timing}</span>
                    <span className={styles.pill}>⏱ {d.duration}</span>
                    <span className={styles.confidenceLabel}>Confidence:</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Disaster detail */}
          {tab === 'disasters' && selected && (
            <div className={styles.detailPanel}>
              <div className={styles.severityBar}>
                {severityLevels.map((s, i) => (
                  <div key={s} className={`${styles.severityItem} ${s.toLowerCase() === selected.severity ? styles.severitySelected : ''}`} style={{ background: `${s.toLowerCase() === selected.severity ? severityColors[i] : severityColors[i] + '55'}` }}>{s}</div>
                ))}
              </div>
              <div className={styles.metaGrid}>
                <div className={styles.metaCell}>📍 {selected.distance}</div>
                <div className={styles.metaCell}>↗ {selected.severity}</div>
                <div className={styles.metaCell}>⏰ {selected.timing}</div>
                <div className={styles.metaCell}>⏱ {selected.duration}</div>
              </div>
              <div className={styles.statsRow}>
                <div className={styles.stat}><div className={styles.statVal}>160–190 km/h</div><div className={styles.statLabel}>Wind</div></div>
                <div className={styles.stat}><div className={styles.statVal}>150–250 mm</div><div className={styles.statLabel}>Rainfall</div></div>
                <div className={styles.stat}><div className={styles.statVal}>Up to 3.5 m</div><div className={styles.statLabel}>Surge</div></div>
                <div className={styles.stat}><div className={styles.statVal}>60%</div><div className={styles.statLabel}>Confidence</div></div>
              </div>
              <div className={styles.actions}>
                <div className={styles.actionsTitle}>Recommended Actions</div>
                <ul className={styles.actionList}>
                  <li>Prepare emergency kit</li>
                  <li>Evacuate low-lying areas</li>
                  <li>Secure property</li>
                </ul>
              </div>
              <div className={styles.shareRow}>
                <button className={styles.shareBtn}>Share Information</button>
                <button className={styles.shareBtn}>Enable Alert to Calendar</button>
                <button className={styles.shareBtn}>Send Update to E-mail</button>
              </div>
              <button className={styles.backBtn} onClick={() => setSelected(null)}>← Back</button>
            </div>
          )}

          {/* Climate charts */}
          {tab === 'climate' && (
            <div className={styles.chartsPanel}>
              <MiniChart data={weeklyTemp} color="#5B8DEF" label="Weekly Temperature (°C)" unit="°C" />
              <MiniChart data={weeklyHumidity} color="#5B8DEF" label="Weekly Humidity (%)" unit="%" />
              <MiniChart data={weeklyRain} color="#5B8DEF" label="Weekly Rainfall (mm)" unit="mm" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
