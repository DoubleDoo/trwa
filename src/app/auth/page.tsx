'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useTelegram from "@/tgapi";
import API from "@/api/user/user";
import DataStore from "@/dataStore"; // Import DataStore class

const api = new API("https://your-api.com", "your-auth-token");

function AuthWaitingPage() {
  const tg = useTelegram();
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState("Authenticating...");

  useEffect(() => {
    async function authenticate() {
      let src=DataStore.getInstance();
      const user=src.getUser()
      if (!user) return setAuthStatus("Failed to get Telegram user data.");
      console.log("_______________");
      console.log(user);
      console.log(src.getBearerToken());
      console.log("_______________");

      try {
        const token = await api.authenticateUser(user);
        console.log("_______________");
        console.log(token);
        console.log("_______________");
        if (token) {
          console.log("_______________");
          console.log(await src.getBearerToken());
          await src.setBearerToken(token);
          console.log(await src.getBearerToken());
          console.log("_______________");
          return router.push("/game");
        }
      } catch (error) {
        setAuthStatus("Authentication failed. Redirecting...");
        setTimeout(() => router.push("/register"), 5000);
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
