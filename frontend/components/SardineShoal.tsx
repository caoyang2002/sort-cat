'use client'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SardineShoal: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // 场景设置
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // 相机位置
    camera.position.z = 50

    // 创建实例化几何体
    const geometry = new THREE.CircleGeometry(0.1, 8)
    const material = new THREE.MeshBasicMaterial({ color: 0x00a0ff })
    const instancedMesh = new THREE.InstancedMesh(geometry, material, 2000)

    // 初始化矩阵
    const matrix = new THREE.Matrix4()
    const positions = new Float32Array(2000 * 3)
    const velocities = new Float32Array(2000 * 3)

    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = Math.random() * 100 - 50
      positions[i * 3 + 1] = Math.random() * 100 - 50
      positions[i * 3 + 2] = 0

      velocities[i * 3] = (Math.random() - 0.5) * 0.2
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2
      velocities[i * 3 + 2] = 0

      matrix.setPosition(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      )
      instancedMesh.setMatrixAt(i, matrix)
    }

    scene.add(instancedMesh)

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate)

      for (let i = 0; i < 2000; i++) {
        // 更新位置
        positions[i * 3] += velocities[i * 3]
        positions[i * 3 + 1] += velocities[i * 3 + 1]

        // 边界检查
        if (positions[i * 3] > 50 || positions[i * 3] < -50)
          velocities[i * 3] *= -1
        if (positions[i * 3 + 1] > 50 || positions[i * 3 + 1] < -50)
          velocities[i * 3 + 1] *= -1

        // 应用分离、对齐和凝聚规则
        applyRules(i)

        // 更新矩阵
        matrix.setPosition(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        )
        instancedMesh.setMatrixAt(i, matrix)
      }

      instancedMesh.instanceMatrix.needsUpdate = true

      renderer.render(scene, camera)
    }

    // 分离、对齐和凝聚规则
    const applyRules = (index: number) => {
      let separationX = 0,
        separationY = 0
      let alignmentX = 0,
        alignmentY = 0
      let cohesionX = 0,
        cohesionY = 0
      let neighborCount = 0

      for (let i = 0; i < 2000; i++) {
        if (i !== index) {
          const dx = positions[index * 3] - positions[i * 3]
          const dy = positions[index * 3 + 1] - positions[i * 3 + 1]
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 5) {
            // 分离
            separationX += dx / distance
            separationY += dy / distance

            // 对齐
            alignmentX += velocities[i * 3]
            alignmentY += velocities[i * 3 + 1]

            // 凝聚
            cohesionX += positions[i * 3]
            cohesionY += positions[i * 3 + 1]

            neighborCount++
          }
        }
      }

      if (neighborCount > 0) {
        // 应用规则
        velocities[index * 3] +=
          separationX * 0.05 +
          (alignmentX / neighborCount) * 0.05 +
          (cohesionX / neighborCount - positions[index * 3]) * 0.05
        velocities[index * 3 + 1] +=
          separationY * 0.05 +
          (alignmentY / neighborCount) * 0.05 +
          (cohesionY / neighborCount - positions[index * 3 + 1]) * 0.05

        // 限制速度
        const speed = Math.sqrt(
          velocities[index * 3] * velocities[index * 3] +
            velocities[index * 3 + 1] * velocities[index * 3 + 1]
        )
        if (speed > 0.5) {
          velocities[index * 3] = (velocities[index * 3] / speed) * 0.5
          velocities[index * 3 + 1] = (velocities[index * 3 + 1] / speed) * 0.5
        }
      }
    }

    animate()

    // 处理窗口大小变化
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
}

export default SardineShoal
