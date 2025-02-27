'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

function App() {
  let user=null;
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.expand(); // Expands the app to full screen
    this.user = window.Telegram.WebApp.initDataUnsafe?.user;
  }

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      <div>USER: {user?`${user.first_name} ${user.last_name}`:"null"}</div>
    </>
  )
}

export default App
