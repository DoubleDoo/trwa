'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useTelegram from "@/tgapi";
import API from "@/api/user/user";
import DataStore from "@/dataStore";
import { cloudStorage } from '@telegram-apps/sdk';

const api = new API("https://your-api.com", "your-auth-token");

function AuthWaitingPage() {
  const [authStatus, setAuthStatus] = useState("Authenticating...");
  const [isClient, setIsClient] = useState(false); // Ensure rendering only on the client
  const router = useRouter();
  let src = DataStore.getInstance();
  let tg = useTelegram();

  useEffect(() => {
    setIsClient(true); // Mark as client-side
  }, []);

  useEffect(() => {
    if (!isClient) return; // Prevent execution on the server

    async function authenticate() {
      let info= cloudStorage.isSupported();
      setAuthStatus(`Set token: ${info}`);
      let token = await src.getBearerToken();
      if (token) {
        console.log("Have token:", token);
        setAuthStatus(`Have token: ${token}`);
      } else {
        await src.setBearerToken(new Date().toISOString());
        token = await src.getBearerToken(); // Retrieve updated token
        console.log("Set token:", token);
        setAuthStatus(`Set token: ${token}`);
      }
    }

    authenticate();
  }, [isClient, src, tg, router]);

  // Avoid rendering mismatched UI during hydration
  if (!isClient) {
    return <div>Loading...</div>; // Ensures SSR output is stable
  }

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <h2>{authStatus}</h2>
      </div>
  );
}

export default AuthWaitingPage;
