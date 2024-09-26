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
      {/* 猫咪画廊组件 */}
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
          In the case of limited insertable cats,{' '}
        </p>
        <p className="text-2xl font-bold text-gray-200">
          the more cats you align the higher your score will be,{' '}
        </p>
        <p className="text-2xl font-bold text-gray-200">
          and the aligned cats will appear as a background of a specific color.{' '}
        </p>
        <p className="text-4xl font-bold text-gray-100">Have a good time</p>
      </div>
      <Footer />
    </div>
  )
}
