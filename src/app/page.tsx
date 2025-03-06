'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { init, miniApp } from '@telegram-apps/sdk';
import useTelegram from "@/tgapi";
import {useEffect, useState} from "react";

function App() {
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
      <div>Welcome {username || "Guest"}!</div>
    </>
  )
}

export default App
