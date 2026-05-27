'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import styles from './page.module.css'

export default function WeatherPage() {
  const [query, setQuery] = useState('')

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={styles.mapContainer}>
        <iframe
          className={styles.map}
          src="https://www.openstreetmap.org/export/embed.html?bbox=106.0,-7.5,107.5,-5.5&layer=mapnik&marker=-6.3741,107.1369"
          title="Weather Map"
        />

        <div className={styles.searchOverlay}>
          <div className={styles.searchBox}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6b7280"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              className={styles.searchInput}
              placeholder="Search location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}