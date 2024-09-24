'use client'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const InstancedParticles: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // 场景设置
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    camera.position.set(0, 0, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // 创建实例化mesh
    const geometry = new THREE.IcosahedronGeometry(5, 0)
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: { value: 0 },
        rotationSpeed: { value: 0.1 },
      },
      vertexShader: `
        precision highp float;
        
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float time;
        uniform float rotationSpeed;
        
        attribute vec3 position;
        attribute vec3 offset;
        attribute vec3 random;
        
        varying vec3 vColor;
        
        void main() {
          vec3 pos = position;
          
          // 旋转
          float theta = time * rotationSpeed * random.x;
          float c = cos(theta);
          float s = sin(theta);
          pos.xz = mat2(c, -s, s, c) * pos.xz;
          
          // 位置偏移
          vec3 displaced = offset + pos;
          displaced.x += sin(time * random.y) * 50.0;
          displaced.y += cos(time * random.z) * 50.0;
          displaced.z += sin(time * random.x) * 50.0;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
          
          // 颜色
          vColor = vec3(random.x, random.y, random.z);
        }
      `,
      fragmentShader: `
        precision highp float;
        
        varying vec3 vColor;
        
        void main() {
          gl_FragColor = vec4(vColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    })

    const COUNT = 100000
    const instancedMesh = new THREE.InstancedMesh(geometry, material, COUNT)

    const dummy = new THREE.Object3D()
    const offsetAttribute = new THREE.InstancedBufferAttribute(
      new Float32Array(COUNT * 3),
      3
    )
    const randomAttribute = new THREE.InstancedBufferAttribute(
      new Float32Array(COUNT * 3),
      3
    )

    for (let i = 0; i < COUNT; i++) {
      // 随机位置
      dummy.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000
      )
      dummy.updateMatrix()
      instancedMesh.setMatrixAt(i, dummy.matrix)

      // 设置偏移和随机属性
      offsetAttribute.setXYZ(
        i,
        dummy.position.x,
        dummy.position.y,
        dummy.position.z
      )
      randomAttribute.setXYZ(i, Math.random(), Math.random(), Math.random())
    }

    instancedMesh.geometry.setAttribute('offset', offsetAttribute)
    instancedMesh.geometry.setAttribute('random', randomAttribute)

    scene.add(instancedMesh)

    // 动画循环
    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)

      const time = clock.getElapsedTime()
      material.uniforms.time.value = time

      renderer.render(scene, camera)
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

export default InstancedParticles
