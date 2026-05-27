'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

const links = [
  { href: '/weather', label: 'weather' },
  { href: '/prediction', label: 'prediction' },
  { href: '/learn', label: 'learn' },
  { href: '/notification', label: 'notification' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>Biosfera</Link>
      <ul className={styles.links}>
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className={`${styles.link} ${pathname?.startsWith(l.href) ? styles.active : ''}`}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
