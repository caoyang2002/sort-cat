import React from 'react'
import Image from 'next/image'
// import { CatSrc, CatCaption } from '@/components/Cat'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollingSvgBackground from '@/components/ScrollingSVGBackground'

export default function Tips() {
  return (
    <div className="flex flex-col min-h-screen">
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
      <div className="flex-grow flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <div className="flex items-start mb-8">
            <Image
              src="/assets/simons.png"
              alt="simons"
              width={128}
              height={128}
              className="transition-opacity duration-300 hover:opacity-80 rounded-full"
            />
            <div className="pl-4 text-left">
              <h1 className="font-bold text-2xl">Simons</h1>
              <p className="my-2">
                Brand Strategy Marketing Designer, Independent developer
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-900 text-blue-400 text-sm font-semibold">
                  #Brands
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-900 text-blue-400 text-sm font-semibold">
                  #Designer
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-900 text-blue-400 text-sm font-semibold">
                  #Developer
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <Image
              src="/assets/image.png"
              alt="simons"
              width={128}
              height={128}
              className="transition-opacity duration-300 hover:opacity-80 rounded-full"
            />
            <div className="pl-4 text-left">
              <h1 className="font-bold text-2xl">Yongbye</h1>
              <p className="my-2">
                illustrator, designer, and game concept designer.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-900 text-blue-400 text-sm font-semibold">
                  #Illustrator
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-900 text-blue-400 text-sm font-semibold">
                  # Conceptual design
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
