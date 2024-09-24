'use client'
// import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

// const Header: React.FC = () => {
//   return (
//     <>
//       <div className="flex h-screen w-full justify-center pt-20">
//         <div className="flex gap-8">
//           <Popover>
//             <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
//               test
//             </PopoverButton>
//             <PopoverPanel
//               transition
//               anchor="bottom"
//               className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
//             >
//               <a
//                 className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
//                 href="#"
//               >
//                 <p className="font-semibold text-white">Insights</p>
//                 <p className="text-white/50">Measure actions your users take</p>
//               </a>
//             </PopoverPanel>
//           </Popover>
//           <Popover>
//             <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
//               Solutions
//             </PopoverButton>
//             <PopoverPanel
//               transition
//               anchor="bottom"
//               className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
//             >
//               <div className="p-3">
//                 <a
//                   className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
//                   href="#"
//                 >
//                   <p className="font-semibold text-white">Insights</p>
//                   <p className="text-white/50">
//                     Measure actions your users take
//                   </p>
//                 </a>
//                 <a
//                   className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
//                   href="#"
//                 >
//                   <p className="font-semibold text-white">Automations</p>
//                   <p className="text-white/50">
//                     Create your own targeted content
//                   </p>
//                 </a>
//                 <a
//                   className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
//                   href="#"
//                 >
//                   <p className="font-semibold text-white">Reports</p>
//                   <p className="text-white/50">Keep track of your growth</p>
//                 </a>
//               </div>
//               <div className="p-3">
//                 <a
//                   className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
//                   href="#"
//                 >
//                   <p className="font-semibold text-white">Documentation</p>
//                   <p className="text-white/50">
//                     Start integrating products and tools
//                   </p>
//                 </a>
//               </div>
//             </PopoverPanel>
//           </Popover>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Header

// ------------------
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useState, useEffect, useRef } from 'react'
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design'
import '@aptos-labs/wallet-adapter-ant-design/dist/index.css'
import '../styles/wallet.css'
import Image from 'next/image'

function HoverPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const handleMouseEnter = () => {
    console.log('[INFO] 打开 Popover: ', isOpen)
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    console.log('[INFO] 打开 Popover: ', isOpen)
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false)
    }, 200) // 0ms delay before closing
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <div className="flex w-full pt-2 pd-4">
        <div className="justify-start px-2">
          <a href="#">
            <Image src="/assets/chyraw.svg" alt="logo" width={40} height={40} />
          </a>
        </div>
        <div className="gap-8 flex px-2">
          <Popover className="relative">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <PopoverButton className="block text-lg/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                <span>Info</span>
              </PopoverButton>
              {isOpen && (
                <PopoverPanel
                  transition
                  anchor="bottom"
                  static
                  // className="absolute z-10 mt-2 w-48 p-4 bg-white border rounded shadow-md"
                  className="absolute z-10 mt-2 w-48 p-4 bg-white border rounded shadow-md divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition  ease-in-out  bg-opacity-20 backdrop-blur-sm"
                >
                  <a
                    className="block rounded-lg py-2 px-3 transition  bg-opacity-30 backdrop-blur-md"
                    href="#"
                  >
                    <p className="font-semibold text-white">Name</p>
                    <p className="text-white/50">
                      描述房东放大放大色啊发森阿森阿森打算放大森动改啊跟邓丢过
                    </p>
                  </a>
                </PopoverPanel>
              )}
            </div>
          </Popover>
          <Popover>
            <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
              Solutions
            </PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 bg-opacity-20 backdrop-blur-sm"
            >
              <div className="p-3">
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Insights</p>
                  <p className="text-white/50">
                    Measure actions your users take
                  </p>
                </a>
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Automations</p>
                  <p className="text-white/50">
                    Create your own targeted content
                  </p>
                </a>
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Reports</p>
                  <p className="text-white/50">Keep track of your growth</p>
                </a>
              </div>
              <div className="p-3">
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Documentation</p>
                  <p className="text-white/50">
                    Start integrating products and tools
                  </p>
                </a>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
        <div className="flex justify-end">
          <WalletSelector />
        </div>
        <div className="flex justify-end px-2">
          <Image
            src="/assets/github-mark-white.svg"
            alt="logo"
            width={40}
            height={40}
          />
        </div>
      </div>
    </>
  )
}

export default HoverPopover

// import React from 'react'
// import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

// export default function HoverPopover() {
//   return (
//     <Popover className="relative">
//       {({ open }) => (
//         <>
//           <PopoverButton className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//             悬浮我
//           </PopoverButton>

//           <PopoverPanel
//             static
//             className={`
//               absolute z-10 w-64 p-4 mt-2 bg-white rounded-md shadow-lg
//               transition-opacity duration-300 ease-in-out
//               ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//             `}
//           >
//             <div className="text-sm text-gray-500">
//               <p className="font-medium text-gray-700">
//                 这里是 Popover 的内容!
//               </p>
//               <p className="mt-2">可以放置更多信息或操作。</p>
//             </div>
//           </PopoverPanel>
//         </>
//       )}
//     </Popover>
//   )
// }
