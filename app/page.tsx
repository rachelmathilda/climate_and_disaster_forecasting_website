import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>Biosfera</h1>
        <Link href="/weather" className={styles.startBtn}>Start</Link>
      </div>
      <div className={styles.partners}>
        <span className={styles.partnerX}>✕</span>
        <span className={styles.partnerMaptiler}>🗺 maptiler</span>
        <span className={styles.partnerMeteo}>☁ Open-Meteo</span>
      </div>
    </main>
  )
}
