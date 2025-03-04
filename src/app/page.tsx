'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import useTelegram from "@/app/tgapi";
import {useEffect, useState} from "react";

function App() {
  let user=null;
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const tg = useTelegram();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (tg) {
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUsername(JSON.stringify(user) || `${JSON.stringify(user)}`);
      }
    }
  }, [tg]);

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

      <div>Welcome {username || "Guest"}!</div>
    </>
  )
}

export default App
