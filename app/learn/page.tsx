'use client'

import React, {
  useEffect,
  useRef,
  useState,
} from 'react'

import Navbar from '@/components/Navbar'
import styles from './page.module.css'

const disasters = [
  {
    id: 'hurricane',
    label: 'Hurricane',
    color: '#5B8DEF',
    desc: 'Tropical cyclones with winds exceeding 119 km/h. Visualize wind spiral patterns and storm surge.',
  },
  {
    id: 'flood',
    label: 'Flood',
    color: '#06b6d4',
    desc: 'Rising water levels inundating land. Understand flow dynamics, depth, and spread patterns.',
  },
  {
    id: 'earthquake',
    label: 'Earthquake',
    color: '#f59e0b',
    desc: 'Seismic wave propagation through the Earth&apos;s crust. Visualize P-waves and S-waves.',
  },
  {
    id: 'heatwave',
    label: 'Heatwave',
    color: '#ef4444',
    desc: 'Extended periods of extreme heat. Explore thermal radiation and urban heat island effects.',
  },
  {
    id: 'wildfire',
    label: 'Wildfire',
    color: '#f97316',
    desc: 'Rapidly spreading fires driven by wind, heat, and dry vegetation.',
  },
]

type DisasterCanvasProps = Readonly<{
  type: string
}>

function DisasterCanvas({
  type,
}: DisasterCanvasProps) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return
    }

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const W = canvas.width
    const H = canvas.height

    const drawHurricane = (t: number) => {
      ctx.fillStyle = '#0a1628'
      ctx.fillRect(0, 0, W, H)

      const cx = W / 2
      const cy = H / 2

      for (let arm = 0; arm < 4; arm++) {
        for (let i = 0; i < 300; i++) {
          const r = i * 1.2
          const angle =
            i / 20 + (arm * Math.PI) / 2 + t

          const x = cx + r * Math.cos(angle)
          const y =
            cy + r * Math.sin(angle) * 0.6

          const size = Math.max(
            0.5,
            3 - i / 120
          )

          const alpha = Math.max(
            0,
            1 - i / 300
          )

          ctx.beginPath()
          ctx.arc(
            x,
            y,
            size,
            0,
            Math.PI * 2
          )

          ctx.fillStyle = `rgba(91,141,239,${
            alpha * 0.8
          })`

          ctx.fill()
        }
      }

      const eyeR = 20 + 4 * Math.sin(t * 2)

      const grd = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        eyeR
      )

      grd.addColorStop(
        0,
        'rgba(255,255,255,0.9)'
      )

      grd.addColorStop(
        1,
        'rgba(255,255,255,0)'
      )

      ctx.beginPath()

      ctx.arc(
        cx,
        cy,
        eyeR,
        0,
        Math.PI * 2
      )

      ctx.fillStyle = grd
      ctx.fill()

      ctx.fillStyle =
        'rgba(255,255,255,0.7)'

      ctx.font = '13px DM Sans'
      ctx.textAlign = 'center'

      ctx.fillText(
        'Category 4 — Eye of Storm',
        cx,
        H - 20
      )
    }

    const drawFlood = (t: number) => {
      ctx.fillStyle = '#0c1a2e'
      ctx.fillRect(0, 0, W, H)

      for (let layer = 5; layer >= 0; layer--) {
        const yBase =
          H * 0.3 + layer * H * 0.12

        const alpha = 0.3 + layer * 0.12
        const speed = 0.8 + layer * 0.3

        ctx.beginPath()
        ctx.moveTo(0, H)

        for (let x = 0; x <= W; x += 4) {
          const y =
            yBase +
            18 *
              Math.sin(
                x / 80 +
                  t * speed +
                  layer
              ) +
            8 *
              Math.sin(
                x / 40 +
                  t * speed * 1.3
              )

          ctx.lineTo(x, y)
        }

        ctx.lineTo(W, H)
        ctx.closePath()

        ctx.fillStyle = `rgba(6,182,212,${alpha})`

        ctx.fill()
      }

      for (let i = 0; i < 20; i++) {
        const x = (i * 137 + t * 40) % W

        const y =
          H * 0.35 +
          (i % 4) * 30 +
          10 * Math.sin(t + i)

        ctx.beginPath()

        ctx.arc(
          x,
          y,
          2,
          0,
          Math.PI * 2
        )

        ctx.fillStyle =
          'rgba(255,255,255,0.5)'

        ctx.fill()
      }

      ctx.fillStyle =
        'rgba(255,255,255,0.6)'

      ctx.font = '13px DM Sans'
      ctx.textAlign = 'center'

      ctx.fillText(
        'Water Rising — 3.2m Above Normal',
        W / 2,
        H - 20
      )
    }

    const drawEarthquake = (t: number) => {
      ctx.fillStyle = '#1a0a00'
      ctx.fillRect(0, 0, W, H)

      const cx = W / 2
      const cy = H / 2

      for (let ring = 0; ring < 8; ring++) {
        const progress =
          ((t * 0.5 + ring * 0.4) % 3) / 3

        const r =
          progress *
          Math.min(W, H) *
          0.55

        const alpha =
          Math.max(0, 1 - progress) * 0.7

        ctx.beginPath()

        ctx.arc(
          cx,
          cy,
          r,
          0,
          Math.PI * 2
        )

        ctx.strokeStyle = `rgba(245,158,11,${alpha})`

        ctx.lineWidth = 2
        ctx.stroke()
      }

      ctx.strokeStyle =
        'rgba(245,158,11,0.9)'

      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(cx, cy)

      for (let seg = 0; seg < 20; seg++) {
        const dx =
          (seg % 2 === 0 ? 1 : -1) *
          (10 + 5 * Math.sin(t + seg))

        ctx.lineTo(
          cx + dx + seg * 15,
          cy + seg * 12
        )
      }

      ctx.stroke()

      ctx.fillStyle =
        'rgba(245,158,11,0.8)'

      ctx.font = '11px DM Mono'
      ctx.textAlign = 'left'

      ctx.fillText(
        'P-wave →',
        cx + 10,
        cy - 10
      )

      ctx.fillStyle =
        'rgba(255,255,255,0.6)'

      ctx.font = '13px DM Sans'
      ctx.textAlign = 'center'

      ctx.fillText(
        'M 6.8 — Seismic Wave Propagation',
        cx,
        H - 20
      )
    }

    const drawHeatwave = (t: number) => {
      const grd = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        W * 0.7
      )

      const pulse =
        0.5 + 0.5 * Math.sin(t)

      grd.addColorStop(
        0,
        `rgba(239,68,68,${
          0.4 + pulse * 0.2
        })`
      )

      grd.addColorStop(
        0.4,
        'rgba(249,115,22,0.3)'
      )

      grd.addColorStop(
        1,
        'rgba(15,15,15,0.95)'
      )

      ctx.fillStyle = '#0f0000'
      ctx.fillRect(0, 0, W, H)

      ctx.fillStyle = grd
      ctx.fillRect(0, 0, W, H)

      for (let i = 0; i < 30; i++) {
        const x = (i / 30) * W

        ctx.beginPath()
        ctx.moveTo(x, H)

        for (
          let y = H;
          y > H * 0.3;
          y -= 8
        ) {
          const wobble =
            3 *
            Math.sin(
              y / 20 + t * 3 + i
            )

          ctx.lineTo(x + wobble, y)
        }

        ctx.strokeStyle = `rgba(255,140,50,${
          0.06 + 0.04 * Math.sin(t + i)
        })`

        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.fillStyle =
        'rgba(255,200,150,0.7)'

      ctx.font = '13px DM Sans'
      ctx.textAlign = 'center'

      ctx.fillText(
        `Surface Temp: ${(
          42 +
          3 * Math.sin(t)
        ).toFixed(1)}°C`,
        W / 2,
        H - 20
      )
    }

    const drawWildfire = (t: number) => {
      ctx.fillStyle = '#0d0500'
      ctx.fillRect(0, 0, W, H)

      ctx.fillStyle = '#1a0800'

      ctx.fillRect(
        0,
        H * 0.75,
        W,
        H * 0.25
      )

      for (let i = 0; i < 40; i++) {
        const x = (i / 40) * W + 10

        const flameH =
          60 +
          40 *
            Math.sin(
              t * 3 + i * 0.8
            ) +
          20 * Math.cos(t * 2 + i)

        const baseY = H * 0.75

        const grd = ctx.createLinearGradient(
          x,
          baseY - flameH,
          x,
          baseY
        )

        grd.addColorStop(
          0,
          'rgba(255,50,0,0)'
        )

        grd.addColorStop(
          0.4,
          'rgba(255,140,0,0.7)'
        )

        grd.addColorStop(
          1,
          'rgba(255,200,50,0.9)'
        )

        ctx.beginPath()
        ctx.moveTo(x - 8, baseY)

        ctx.quadraticCurveTo(
          x + 5 * Math.sin(t * 4 + i),
          baseY - flameH * 0.6,
          x,
          baseY - flameH
        )

        ctx.quadraticCurveTo(
          x - 5 * Math.sin(t * 3 + i),
          baseY - flameH * 0.6,
          x + 8,
          baseY
        )

        ctx.fillStyle = grd
        ctx.fill()
      }

      for (let i = 0; i < 50; i++) {
        const progress =
          ((t * 0.4 + i * 0.3) % 3) / 3

        const x =
          (i * 73) % W +
          20 * Math.sin(t + i)

        const y =
          H * 0.75 -
          progress * H * 0.8

        const alpha = Math.sin(
          progress * Math.PI
        )

        ctx.beginPath()

        ctx.arc(
          x,
          y,
          1.5,
          0,
          Math.PI * 2
        )

        ctx.fillStyle = `rgba(255,${
          100 +
          Math.floor(100 * progress)
        },0,${alpha})`

        ctx.fill()
      }

      ctx.fillStyle =
        'rgba(255,200,100,0.7)'

      ctx.font = '13px DM Sans'
      ctx.textAlign = 'center'

      ctx.fillText(
        'Wind 45 km/h — Rapid Spread Active',
        W / 2,
        H - 20
      )
    }

    const draw = () => {
      timeRef.current += 0.02

      const t = timeRef.current

      ctx.clearRect(0, 0, W, H)

      switch (type) {
        case 'hurricane':
          drawHurricane(t)
          break

        case 'flood':
          drawFlood(t)
          break

        case 'earthquake':
          drawEarthquake(t)
          break

        case 'heatwave':
          drawHeatwave(t)
          break

        case 'wildfire':
          drawWildfire(t)
          break

        default:
          break
      }

      animRef.current =
        requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(
          animRef.current
        )
      }
    }
  }, [type])

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
    />
  )
}

export default function LearnPage() {
  const [active, setActive] =
    useState<string>('hurricane')

  const current =
    disasters.find(
      (d) => d.id === active
    ) ?? disasters[0]

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={styles.body}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarTitle}>
            Natural Disasters
          </div>

          {disasters.map((d) => (
            <button
              key={d.id}
              className={`${
                styles.sidebarItem
              } ${
                active === d.id
                  ? styles.sidebarActive
                  : ''
              }`}
              style={
                {
                  '--accent': d.color,
                } as React.CSSProperties
              }
              onClick={() =>
                setActive(d.id)
              }
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className={styles.main}>
          <div className={styles.vizWrapper}>
            <DisasterCanvas
              key={active}
              type={active}
            />

            <div className={styles.playBtn}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#5B8DEF"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>

          <div className={styles.infoPanel}>
            <h2 className={styles.infoTitle}>
              {current.label}
            </h2>

            <p className={styles.infoDesc}>
              {current.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
