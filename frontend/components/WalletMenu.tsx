'use client'
import React, { useState } from 'react'
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design'
import { Popover, Transition } from '@headlessui/react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { Fragment } from 'react'

const WalletMenu = () => {
  const { connected, disconnect } = useWallet()
  const [isModalOpen, setModalOpen] = useState(false)

  if (!connected) {
    return (
      <WalletSelector isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    )
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
              ${open ? 'text-white bg-blue-700' : 'text-white bg-blue-600'}
              inline-flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
            `}
          >
            <span>Wallet</span>
            <svg
              className={`${
                open ? 'transform rotate-180' : ''
              } ml-2 h-5 w-5 transition-transform`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
              <div className="px-1 py-1">
                <button
                  className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 hover:bg-blue-500 hover:text-white"
                  onClick={() => {
                    /* 添加您的操作 */
                  }}
                >
                  查看余额
                </button>
                <button
                  className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 hover:bg-blue-500 hover:text-white"
                  onClick={() => {
                    /* 添加您的操作 */
                  }}
                >
                  交易历史
                </button>
              </div>
              <div className="px-1 py-1">
                <button
                  className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 hover:bg-red-500 hover:text-white"
                  onClick={disconnect}
                >
                  断开连接
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default WalletMenu
