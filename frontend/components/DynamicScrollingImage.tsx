'use client'
import styles from '@/styles/DynamicScrollingImage.module.css'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface DynamicScrollingImageProps {
  initialImages: string[]
}

const DynamicScrollingImage: React.FC<DynamicScrollingImageProps> = ({
  initialImages,
}) => {
  const [images, setImages] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const IMAGE_SIZE = 60 // Image size in pixels
  const SCROLL_DURATION = 20 // Duration of one full scroll cycle in seconds

  useEffect(() => {
    // Duplicate the initial images to ensure smooth looping
    setImages([...initialImages, ...initialImages])
  }, [initialImages])

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const imageCount = Math.ceil(containerWidth / IMAGE_SIZE) + 1

      // Ensure we have enough images to fill the container plus one
      while (images.length < imageCount) {
        setImages((prevImages) => [...prevImages, ...initialImages])
      }
    }
  }, [images, initialImages])

  if (images.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        className={styles.scrollContainer}
        style={
          {
            '--image-count': images.length,
            '--image-size': `${IMAGE_SIZE}px`,
            '--scroll-duration': `${SCROLL_DURATION}s`,
          } as React.CSSProperties
        }
      >
        {images.map((src, index) => (
          <div key={`${src}-${index}`} className={styles.imageWrapper}>
            <Image
              src={src}
              alt={`Scrolling image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="px-1 py-1 rounded rounded-lg "
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DynamicScrollingImage
