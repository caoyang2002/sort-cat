'use client'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { Network } from '@aptos-labs/ts-sdk'
import { PropsWithChildren } from 'react'
import AptosAccount from './AptosAccount'

export const WalletProvider = ({ children }: PropsWithChildren) => {
  console.log('[INFO] 加载 Provider')

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
        <AptosAccount />
        {children}
      </AptosWalletAdapterProvider>
    </>
  )
}
