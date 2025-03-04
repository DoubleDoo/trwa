'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useTelegram from "@/app/tgapi";
import API from "@/api/user/user";

const api = new API("https://your-api.com", "your-auth-token");

function AuthWaitingPage() {
  const tg = useTelegram();
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState("Authenticating...");

  useEffect(() => {
    async function authenticate() {
      const user = tg?.initDataUnsafe?.user;
      if (!user) return setAuthStatus("Failed to get Telegram user data.");
      console.log(user)
      try {
        const token = await api.authenticateUser({ tg_id: user.id, hash: "some_hash" });
        if (token) return router.push("/game");
      } catch {
          setAuthStatus("Authentication failed. Redirecting...");
          setTimeout(() => router.push("/register"), 2000);
      }
    }

    authenticate();
  }, [tg, router]);

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <h2>{authStatus}</h2>
      </div>
  );
}

export default AuthWaitingPage;