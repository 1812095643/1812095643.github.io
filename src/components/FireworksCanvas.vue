<template>
  <canvas ref="canvasRef" class="fireworks"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import anime from 'animejs'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvasEl = canvasRef.value
  if (!canvasEl) return
  const ctx = canvasEl.getContext('2d')!

  const colors = ['rgba(99, 97, 220, 0.2)', 'rgba(99, 97, 220, 0.4)', 'rgba(139, 240, 254, 0.2)']
  const numberOfParticules = 20
  let pointerX = 0
  let pointerY = 0
  const tap: 'touchstart' | 'mousedown' = ('ontouchstart' in window || (navigator as any).msMaxTouchPoints) ? 'touchstart' : 'mousedown'

  function setCanvasSize() {
    canvasEl.width = window.innerWidth * 2
    canvasEl.height = window.innerHeight * 2
    canvasEl.style.width = window.innerWidth + 'px'
    canvasEl.style.height = window.innerHeight + 'px'
    canvasEl.getContext('2d')!.scale(2, 2)
  }

  function updateCoords(e: MouseEvent | TouchEvent) {
    if (e instanceof MouseEvent) {
      pointerX = e.clientX
      pointerY = e.clientY
    } else {
      const t = e.touches[0]
      pointerX = t.clientX
      pointerY = t.clientY
    }
  }

  function setParticuleDirection(p: any) {
    const angle = anime.random(0, 360) * Math.PI / 180
    const value = anime.random(50, 180)
    const radius = ([-1, 1] as const)[anime.random(0, 1)] * value
    return { x: p.x + radius * Math.cos(angle), y: p.y + radius * Math.sin(angle) }
  }

  function createParticule(x: number, y: number) {
    const p: any = {}
    p.x = x
    p.y = y
    p.color = colors[anime.random(0, colors.length - 1)]
    p.radius = anime.random(8, 16)
    p.endPos = setParticuleDirection(p)
    p.draw = function() {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
      ctx.fillStyle = p.color
      ctx.fill()
    }
    return p
  }

  function createCircle(x: number, y: number) {
    const p: any = {}
    p.x = x
    p.y = y
    p.color = '#6361DC'
    p.radius = 0.1
    p.alpha = 0.01
    p.lineWidth = 2
    p.draw = function() {
      ctx.globalAlpha = p.alpha
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
      ctx.lineWidth = p.lineWidth
      ctx.strokeStyle = p.color
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    return p
  }

  function renderParticule(anim: any) {
    for (let i = 0; i < anim.animatables.length; i++) {
      anim.animatables[i].target.draw()
    }
  }

  function animateParticules(x: number, y: number) {
    const circle = createCircle(x, y)
    const particules = [] as any[]
    for (let i = 0; i < numberOfParticules; i++) {
      particules.push(createParticule(x, y))
    }
    anime.timeline()
      .add({
        targets: particules,
        x: (p: any) => p.endPos.x,
        y: (p: any) => p.endPos.y,
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
      })
      .add({
        targets: circle,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: { value: 0, easing: 'linear', duration: anime.random(600, 800) },
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
        offset: 0,
      })
  }

  const render = anime({
    duration: Infinity,
    update: function() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    },
  })

  function onTap(e: any) {
    render.play()
    updateCoords(e)
    animateParticules(pointerX, pointerY)
  }

  setCanvasSize()
  window.addEventListener('resize', setCanvasSize)
  document.addEventListener(tap, onTap, false)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setCanvasSize)
    document.removeEventListener(tap, onTap)
  })
})
</script>
