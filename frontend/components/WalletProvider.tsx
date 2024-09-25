'use client'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { Network } from '@aptos-labs/ts-sdk'
import { PropsWithChildren } from 'react'
import React from 'react'

export const WalletProvider = ({ children }: PropsWithChildren) => {
  // const { account, signAndSubmitTransaction } = useWallet()
  // console.log()

  // 定义一个状态来存储输出的文字
  // const [accountAddress, setAccountAddress] = React.useState('')

  // 定义一个处理函数，用于更新状态并输出文字
  // const handleButtonClick = () => {
  //   setAccountAddress(account?.address || 'none')
  // }
  return (
    <>
      <AptosWalletAdapterProvider
        plugins={[]}
        autoConnect={true}
        dappConfig={{
          network: Network.TESTNET,
          aptosConnectDappId: 'dapp-id',
        }}
      >
        {children}
      </AptosWalletAdapterProvider>
    </>
  )
}
