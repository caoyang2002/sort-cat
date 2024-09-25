'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useState, useEffect, useRef } from 'react'
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design'
import '@aptos-labs/wallet-adapter-ant-design/dist/index.css'
import '../styles/wallet.css'
import Image from 'next/image'

function HoverPopover() {
  const [isOpenAbout, setIsOpenAbout] = useState(false)
  const [isOpenTips, setIsOpenTips] = useState(false)
  const timeoutRefAbout = useRef<number | null>(null)
  const timeoutRefTips = useRef<number | null>(null)

  const handleMouseEnter = (popover: string) => {
    if (popover === 'about') {
      if (timeoutRefAbout.current !== null) {
        clearTimeout(timeoutRefAbout.current)
      }
      setIsOpenAbout(true)
    } else if (popover === 'tips') {
      if (timeoutRefTips.current !== null) {
        clearTimeout(timeoutRefTips.current)
      }
      setIsOpenTips(true)
    }
  }

  const handleMouseLeave = (popover: string) => {
    if (popover === 'about') {
      timeoutRefAbout.current = window.setTimeout(() => {
        setIsOpenAbout(false)
      }, 100)
    } else if (popover === 'tips') {
      timeoutRefTips.current = window.setTimeout(() => {
        setIsOpenTips(false)
      }, 100)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRefAbout.current !== null) {
        clearTimeout(timeoutRefAbout.current)
      }
      if (timeoutRefTips.current !== null) {
        clearTimeout(timeoutRefTips.current)
      }
    }
  }, [])

  return (
    <>
      <div className="flex justify-center w-full py-2 px-2 rounded-lg bg-opacity-30 backdrop-blur-md block">
        <div className="flex justify-between w-full max-w-4xl items-center ">
          {/* LOGO */}
          <div className="flex-none justify-start px-2">
            <a href="#">
              <Image
                src="/assets/cat-head.svg"
                alt="logo"
                width={40}
                height={40}
              />
            </a>
          </div>
          <div className="flex-none justify-center">
            {/* Popover */}
            <div className="flex items-center justify-center space-x-8">
              <div className="flex-1 justify-center">
                <Popover className="relative">
                  <div
                    onMouseEnter={() => handleMouseEnter('about')}
                    onMouseLeave={() => handleMouseLeave('about')}
                  >
                    <PopoverButton className="block text-lg/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                      <span>About</span>
                    </PopoverButton>
                    {isOpenAbout && (
                      <PopoverPanel
                        transition
                        anchor="bottom"
                        static
                        className="absolute z-10 mt-1 w-48 p-1 bg-white border rounded shadow-md divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition  ease-in-out  bg-opacity-20 backdrop-blur-sm"
                      >
                        <div className="p-3">
                          <div>
                            <a
                              className="px-2 py-2 bg-opacity-60 backdrop-blur-xl block rounded-lg transition hover:bg-white/5"
                              href="#"
                            >
                              <p className="font-semibold text-white ">Score</p>
                              <p className="text-white/50">积分规则</p>
                            </a>
                          </div>
                          <div>
                            <a
                              className="px-2 py-2 mt-2 bg-opacity-60 backdrop-blur-xl block rounded-lg transition hover:bg-white/5"
                              href="#"
                            >
                              <p className="font-semibold text-white ">
                                Insert
                              </p>
                              <p className="text-white/50">插入</p>
                            </a>
                          </div>
                          <div>
                            <a
                              className="px-2 py-2 mt-2 bg-opacity-60 backdrop-blur-xl block rounded-lg transition hover:bg-white/5"
                              href="#"
                            >
                              <p className="font-semibold text-white ">Team</p>
                              <p className="text-white/50">开发团队</p>
                            </a>
                          </div>
                        </div>
                      </PopoverPanel>
                    )}
                  </div>
                </Popover>
              </div>
              <div className="flex-1 justify-center">
                {/* Tips */}
                <Popover className="relative flex-1 justify-center">
                  <div
                    onMouseEnter={() => handleMouseEnter('tips')}
                    onMouseLeave={() => handleMouseLeave('tips')}
                  >
                    <PopoverButton className="block text-lg/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                      <span>Tips</span>
                    </PopoverButton>
                    {isOpenTips && (
                      <PopoverPanel
                        transition
                        anchor="bottom"
                        static
                        // className="absolute z-10 mt-2 w-48 p-4 bg-white border rounded shadow-md"
                        className="absolute z-10 mt-1 w-48 p-1 bg-white border rounded shadow-md divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition  ease-in-out  bg-opacity-20 backdrop-blur-sm"
                      >
                        <div className="p-3">
                          <a
                            className="px-2 py-2 bg-opacity-30 backdrop-blur-md block rounded-lg transition hover:bg-white/5"
                            href="#"
                          >
                            <p className="font-semibold text-white">Name</p>
                            <p className="text-white/50">玩法介绍</p>
                          </a>
                          <a
                            className="px-2 py-2 mt-2 bg-opacity-30 backdrop-blur-md block rounded-lg transition hover:bg-white/5"
                            href="#"
                          >
                            <p className="font-semibold text-white ">Name</p>
                            <p className="text-white/50">玩法介绍</p>
                          </a>
                        </div>
                      </PopoverPanel>
                    )}
                  </div>
                </Popover>
              </div>
              <div className="flex-1 justify-center">
                <Image
                  src="/assets/twitter-x.svg"
                  alt="logo"
                  width={32}
                  height={32}
                  style={{
                    width: '32px',
                    height: '32px',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <div className="flex-1 justify-center">
                <Image
                  src="/assets/github-mark-white.svg"
                  alt="logo"
                  width={32}
                  height={32}
                  style={{
                    width: '32px',
                    height: '32px',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex-none justify-end">
            <WalletSelector />
          </div>
        </div>
      </div>
    </>
  )
}

export default HoverPopover
