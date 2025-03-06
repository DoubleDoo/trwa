'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {retrieveLaunchParams, cloudStorage, init} from "@telegram-apps/sdk";
import API from "@/api/user/user";
import useTelegram from "@/tgapi";

const api = new API("https://your-api.com", "your-auth-token");

function AuthPage() {
  const [authStatus, setAuthStatus] = useState("Authenticating...");
  const router = useRouter();
  const tg = useTelegram();

  useEffect(() => {
    async function authenticate() {
      try {
        await init();
        setAuthStatus("Retrieving launch params...");
        const { initDataRaw } = await retrieveLaunchParams();
        const user = tg?.initDataUnsafe?.user;

        console.log("Telegram Launch Params:", initDataRaw);
        console.log("Telegram User Data:", user);

        setAuthStatus("Checking stored token...");
        let token = await cloudStorage.getItem("bearerToken");

        if (!token) {
          setAuthStatus("No token found. Registering user...");
          const registerResponse = await api.registerUser(initDataRaw);

          if (!registerResponse?.success || !registerResponse?.token) {
            setAuthStatus("Registration failed. Please try again.");
            console.error("Registration failed:", registerResponse);
            return;
          }

          token = registerResponse.token;
        }

        setAuthStatus("Authenticating...");
        const authResponse = await api.authenticateUser(token);

        if (!authResponse?.success) {
          setAuthStatus("Authentication failed. Please try again.");
          console.error("Authentication failed:", authResponse);
          return;
        }

        setAuthStatus("Authentication successful. Saving token...");
        await cloudStorage.setItem("bearerToken", token);

        setAuthStatus("Redirecting to game...");
        router.push("/game");
      } catch (error) {
        setAuthStatus("An error occurred. Please try again.");
        console.error("Authentication error:", error);
      }
    }

    authenticate();
  }, [router, tg]);

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <h2>{authStatus}</h2>
      </div>
  );
}

export default AuthPage;
