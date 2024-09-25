import React from 'react'
import Image from 'next/image'
import { CatSrc, CatCaption } from '@/components/Cat'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollingSvgBackground from '@/components/ScrollingSVGBackground'

const EnhancedCatGallery = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(CatSrc).map(([key, src]) => {
        // 确保 key 是 CatCaption 的有效键
        const isValidKey = key in CatCaption

        return (
          <div
            key={key}
            className="flex flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            <div className="relative overflow-hidden rounded-lg">
              {/* 使用 Next.js 的 Image 组件来优化图片加载 */}
              <Image
                src={src}
                alt={`cat ${key}`}
                width={128}
                height={128}
                className="transition-opacity duration-300 hover:opacity-80"
              />
            </div>
            <p className="mt-2 text-center font-semibold">Cat {key}</p>
            <p className="text-center text-sm">
              {/* 如果 key 有效，显示对应的说明；否则显示默认文本 */}
              {isValidKey
                ? CatCaption[key as keyof typeof CatCaption]
                : '暂无说明'}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default function Tips() {
  return (
    <div className="">
      <div className="mt-2">
        <Header />
      </div>
      {/* 滚动的 SVG 背景 */}
      <ScrollingSvgBackground
        svgPath="/assets/cat-head-gray.svg"
        svgSize={{ width: 32, height: 32 }}
        scrollDirection="stop"
        backgroundColor="#000"
        scrollSpeed={0}
      />
      {/* 猫咪画廊组件 */}
      <EnhancedCatGallery />
      <Footer />
    </div>
  )
}
