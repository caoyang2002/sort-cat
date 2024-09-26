import React from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollingSvgBackground from '@/components/ScrollingSVGBackground'

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
      <div className="flex flex-col items-center">
        {/* 新增：使用 flex 容器并居中项目 */}
        <div className="flex justify-center">
          {/* 新增：Image 的父容器 */}
          <Image
            src="/assets/cat-head.svg"
            alt="cat-head-gray"
            width={128}
            height={128}
          />
        </div>
        <p className="text-2xl font-bold text-gray-200">
          The left side is the usable cat,
        </p>
        <p className="text-2xl font-bold text-gray-200">
          which can be used to insert in the cat view,
        </p>
        <p className="text-2xl font-bold text-gray-200">
          the right side is the cat that needs to be aligned
        </p>
        <p className="text-2xl font-bold text-gray-200">
          your score will be displayed in real time at the top,
        </p>
        <p className="text-2xl font-bold text-gray-200">
          when you think you have done your best,{' '}
        </p>
        <p className="text-2xl font-bold text-gray-200">
          you can submit your action to the blockchain.{' '}
        </p>
        <p className="text-4xl font-bold text-gray-100">Have a good time</p>
      </div>
      <Footer />
    </div>
  )
}
