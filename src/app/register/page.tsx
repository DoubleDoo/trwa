'use client'

import useTelegram from "@/app/tgapi";
import { useEffect, useState } from "react";
import API from "@/api/user/user";

const api = new API("https://your-api.com", "your-auth-token");

function AuthWaitingPage() {
  const tg = useTelegram();
  const [username, setUsername] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<string>("Waiting for authentication...");

  useEffect(() => {
    async function authenticate() {
      if (tg) {
        const user = tg.initDataUnsafe?.user;
        if (user) {
          setUsername(user.first_name || "User");
          try {
            const token = await api.authenticateUser({ tg_id: user.id, hash: "some_hash" });
            if (token) {
              setAuthStatus("Authenticated successfully!");
              return;
            }
          } catch (error) {
            console.error("Authentication failed, attempting to create user...");
          }

          try {
            await api.createUser({ nick: user.first_name, tg_id: user.id });
            const token = await api.authenticateUser({ tg_id: user.id, hash: "some_hash" });
            if (token) {
              setAuthStatus("Authenticated successfully after user creation!");
            }
          } catch (error) {
            setAuthStatus("Failed to authenticate. Please try again later.");
          }
        }
      }
    }

    authenticate();
  }, [tg]);

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <h2>Authenticating...</h2>
        <p>{authStatus}</p>
      </div>
  );
}

export default AuthWaitingPage;
