'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import styles from './page.module.css'

type View = 'landing' | 'login' | 'register' | 'subscribe'

export default function NotificationPage() {
  const [view, setView] = useState<View>('landing')
  const [loggedIn, setLoggedIn] = useState(false)

  if (loggedIn) {
    return (
      <div className={styles.wrapper}>
        <Navbar />
        <div className={styles.subscribePage}>
          <div className={styles.leftText}>
            <h2>Get Our Weekly Forecast and<br />Daily Weather Condition!</h2>
          </div>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Have a great day!</h3>
            <input className={styles.input} placeholder="name" />
            <input className={styles.input} placeholder="email" type="email" />
            <input className={styles.input} placeholder="password" type="password" />
            <textarea className={styles.textarea} placeholder="location" rows={4} />
            <button className={styles.primaryBtn}>Subscribe</button>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'login') {
    return (
      <div className={styles.wrapper}>
        <Navbar />
        <div className={styles.formCenter}>
          <div className={styles.authCard}>
            <h2 className={styles.authTitle}>Login</h2>
            <input className={styles.input} placeholder="email" type="email" />
            <input className={styles.input} placeholder="password" type="password" />
            <div className={styles.socialRow}>
              <button className={styles.socialBtn} title="Google">
                <svg width="32" height="32" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.1 0 5.8 1.1 7.9 2.9l5.9-5.9C34.2 3.5 29.4 1.5 24 1.5 14.9 1.5 7.2 7.2 4 15.2l6.9 5.4C12.5 14.6 17.8 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.4 5.5-4.9 7.2l7.7 6c4.5-4.2 7-10.4 7-17.2z"/>
                  <path fill="#FBBC05" d="M10.9 28.5c-.5-1.5-.8-3-.8-4.5s.3-3 .8-4.5L4 14.1C2.4 17.3 1.5 20.5 1.5 24s.9 6.7 2.5 9.9l6.9-5.4z"/>
                  <path fill="#4285F4" d="M24 46.5c5.4 0 10-1.8 13.3-4.9l-7.7-6c-1.9 1.3-4.2 2-5.6 2-6.2 0-11.5-5.1-13.1-11.1L4 31.9C7.2 39.9 14.9 46.5 24 46.5z"/>
                </svg>
              </button>
              <button className={styles.socialBtn} title="Facebook">
                <svg width="32" height="32" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="24" fill="#1877F2"/>
                  <path fill="#fff" d="M27 48V30h6l1-7h-7v-4c0-2 .6-3.4 3.5-3.4H34V9.2C33 9.1 31 9 28.6 9 23.1 9 19 12.7 19 18.6V23h-6v7h6v18h8z"/>
                </svg>
              </button>
            </div>
            <button className={styles.primaryBtn} onClick={() => setLoggedIn(true)}>Login</button>
            <p className={styles.switchText}>No account? <button className={styles.linkBtn} onClick={() => setView('register')}>Register</button></p>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'register') {
    return (
      <div className={styles.wrapper}>
        <Navbar />
        <div className={styles.formCenter}>
          <div className={styles.authCard}>
            <h2 className={styles.authTitle}>Register</h2>
            <input className={styles.input} placeholder="name" />
            <input className={styles.input} placeholder="email" type="email" />
            <input className={styles.input} placeholder="password" type="password" />
            <div className={styles.socialRow}>
              <button className={styles.socialBtn} title="Google">
                <svg width="32" height="32" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.1 0 5.8 1.1 7.9 2.9l5.9-5.9C34.2 3.5 29.4 1.5 24 1.5 14.9 1.5 7.2 7.2 4 15.2l6.9 5.4C12.5 14.6 17.8 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.4 5.5-4.9 7.2l7.7 6c4.5-4.2 7-10.4 7-17.2z"/>
                  <path fill="#FBBC05" d="M10.9 28.5c-.5-1.5-.8-3-.8-4.5s.3-3 .8-4.5L4 14.1C2.4 17.3 1.5 20.5 1.5 24s.9 6.7 2.5 9.9l6.9-5.4z"/>
                  <path fill="#4285F4" d="M24 46.5c5.4 0 10-1.8 13.3-4.9l-7.7-6c-1.9 1.3-4.2 2-5.6 2-6.2 0-11.5-5.1-13.1-11.1L4 31.9C7.2 39.9 14.9 46.5 24 46.5z"/>
                </svg>
              </button>
              <button className={styles.socialBtn} title="Facebook">
                <svg width="32" height="32" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="24" fill="#1877F2"/>
                  <path fill="#fff" d="M27 48V30h6l1-7h-7v-4c0-2 .6-3.4 3.5-3.4H34V9.2C33 9.1 31 9 28.6 9 23.1 9 19 12.7 19 18.6V23h-6v7h6v18h8z"/>
                </svg>
              </button>
            </div>
            <button className={styles.primaryBtn} onClick={() => setLoggedIn(true)}>Register</button>
            <p className={styles.switchText}>Have an account? <button className={styles.linkBtn} onClick={() => setView('login')}>Login</button></p>
          </div>
        </div>
      </div>
    )
  }

  // Landing
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.landing}>
        <div className={styles.btnGroup}>
          <button className={styles.primaryBtnLanding} onClick={() => setView('login')}>Login</button>
          <button className={styles.secondaryBtnLanding} onClick={() => setView('register')}>Register</button>
        </div>
        <p className={styles.landingDesc}>Login or register to get weather and climate update notification.</p>
      </div>
    </div>
  )
}
