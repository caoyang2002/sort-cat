import React, { useEffect, useState } from 'react'
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design'
import {
  Popover,
  Transition,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { Fragment } from 'react'
// import { get } from 'http'
import {
  // AccountAddressInput,
  Aptos,
  AptosConfig,
  Network,
} from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'
interface ResponseBalanceType {
  current_fungible_asset_balances: Array<{ amount: number; asset_type: string }>
}
//

const WalletMenu = () => {
  const { connected, disconnect, account } = useWallet()

  const fetchBalance = async () => {
    if (!account) return
    const variablesObj = {
      address: account?.address,
    }

    const query_syntax = `query GetFungibleAssetBalances($address: String, $offset: Int) {
    current_fungible_asset_balances(
      where: {owner_address: {_eq: $address}},
      offset: $offset,
      limit: 100,
      order_by: {amount: desc}
    ) {
      asset_type
      amount
      __typename
    }
  }`

    try {
      const response = await aptos.queryIndexer({
        query: {
          query: query_syntax,
          variables: variablesObj,
        },
      })
      const amountOriginal = (response as ResponseBalanceType)
        .current_fungible_asset_balances[0].amount
      const amount = new BigNumber(amountOriginal)
      // console.log('the response is ', amount)
      const factor = new BigNumber(10).pow(8)
      setBalance(amount.dividedBy(factor).toString())
    } catch (error) {
      console.error('查询 balance 时发生错误:', error)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [account]) // 当 account 更改时重新执行

  const config = new AptosConfig({ network: Network.TESTNET })
  const aptos = new Aptos(config)

  const [isModalOpen, setModalOpen] = useState(false)
  const [balance, setBalance] = useState('0')

  // ui
  if (!connected) {
    return (
      <WalletSelector isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    )
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            className={`
              ${open ? 'text-white bg-gray-700' : 'text-white bg-gray-500'}
              inline-flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-white hover:text-black text-white focus-visible:text-gray-700 focus-visible:bg-gray-100`}
          >
            <span className="font-bold">
              {account?.address && account.address.length > 8
                ? `${account.address.slice(0, 6)}...${account.address.slice(
                    -4
                  )}`
                : account?.address || ''}
            </span>

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
          </PopoverButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              transition
              anchor="bottom"
              static
              className="absolute z-10 mt-1 w-48 p-1 bg-white border rounded shadow-md divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition  ease-in-out  bg-opacity-20 backdrop-blur-sm"
            >
              <div className="divide-y divide-gray-100">
                <div className="px-1 py-1">
                  <button
                    className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-white hover:bg-opacity-20 hover:backdrop-blur-sm hover:text-white hover:bg-white/10"
                    onClick={() => {
                      fetchBalance()
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <p>Balance</p>

                      <p className="text-gray-100 ml-2">{balance}</p>
                    </div>
                  </button>
                  <button
                    className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-white hover:bg-opacity-20 hover:backdrop-blur-sm hover:text-white hover:bg-white/10"
                    onClick={() => {
                      /* 添加您的操作 */
                    }}
                  >
                    History
                  </button>
                  <button
                    className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-white hover:bg-opacity-20 hover:backdrop-blur-sm hover:text-white hover:bg-white/10"
                    onClick={() => {}}
                  >
                    Ranking
                  </button>
                </div>
                <div className="px-1 py-1">
                  <button
                    className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-red-200 hover:bg-opacity-20 hover:backdrop-blur-sm hover:text-red-600 hover:bg-white/10"
                    onClick={disconnect}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default WalletMenu
