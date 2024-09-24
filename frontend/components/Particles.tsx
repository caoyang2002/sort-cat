'use client'
import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  color: string
}

const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const particles: Particle[] = []
    const particleCount = 5000
    const noiseScale = 0.005
    const noiseSpeed = 0.001
    let time = 0

    // 创建具有更多随机属性的粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        life: Math.random() * 200 + 50,
        size: Math.random() * 2 + 0.5, // 随机大小
        color: `hsl(${Math.random() * 360}, 50%, 50%)`, // 随机颜色
      })
    }

    // Perlin noise 函数保持不变
    const noise = (x: number, y: number) => {
      // ... (保持原有的 noise 函数实现)
      const X = Math.floor(x)
      const Y = Math.floor(y)
      x = x - X
      y = y - Y
      const XX = X & 255
      const YY = Y & 255
      const g1 = p[p[XX] + YY]
      const g2 = p[p[XX + 1] + YY]
      const g3 = p[p[XX] + YY + 1]
      const g4 = p[p[XX + 1] + YY + 1]
      const u = fade(x)
      const v = fade(y)
      return lerp(
        v,
        lerp(u, dot2d(g1, x, y), dot2d(g2, x - 1, y)),
        lerp(u, dot2d(g3, x, y - 1), dot2d(g4, x - 1, y - 1))
      )
    }

    // 初始化 permutation 表
    const p = new Array(512)
    for (let i = 0; i < 256; i++) p[i] = i
    for (let i = 0; i < 256; i++) {
      const j = Math.floor(Math.random() * (256 - i)) + i
      ;[p[i], p[j]] = [p[j], p[i]]
      p[i + 256] = p[i]
    }

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
    const lerp = (t: number, a: number, b: number) => a + t * (b - a)
    const dot2d = (g: number, x: number, y: number) => {
      const v = ((g % 3) - 1) * x + ((Math.floor(g / 3) % 3) - 1) * y
      return v
    }

    const updateParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i]
        const n = noise(p.x * noiseScale, p.y * noiseScale + time)
        const angle = n * Math.PI * 2

        // 添加随机扰动到速度
        const randomFactor = Math.random() * 0.5 + 0.75 // 0.75 到 1.25 之间的随机数
        const speed = 2 * randomFactor

        p.vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 0.5 // 添加小的随机偏移
        p.vy = Math.sin(angle) * speed + (Math.random() - 0.5) * 0.5

        p.x += p.vx
        p.y += p.vy
        p.life--

        // 当粒子"死亡"或离开画布时重置
        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          p.x = Math.random() * width
          p.y = Math.random() * height
          p.life = Math.random() * 200 + 50
          p.size = Math.random() * 2 + 0.5 // 重置大小
          p.color = `hsl(${Math.random() * 360}, 50%, 50%)` // 重置颜色
        }
      }
      time += noiseSpeed
    }

    const drawParticles = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'block',
        background: 'black',
      }}
    />
  )
}

export default Particles
