'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { retrieveLaunchParams, cloudStorage } from "@telegram-apps/sdk";
import API from "@/api/user/user";
import useTelegram from "@/tgapi";

const api = new API("https://your-api.com", "your-auth-token");

function AuthWaitingPage() {
  const [authStatus, setAuthStatus] = useState("Authenticating...");
  const router = useRouter();
  const tg = useTelegram();

  useEffect(() => {
    async function authenticate() {
      try {
        setAuthStatus("Retrieving launch params...");
        const { initDataRaw } = await retrieveLaunchParams();
        const user = tg.initDataUnsafe?.user;
        console.log(initDataRaw)
        console.log(user)
        setAuthStatus("Checking stored token...");
        let token = await cloudStorage.getItem("bearerToken");

        if (!token) {
          setAuthStatus("No token found. Trying to register...");
          const registerResponse = await api.registerUser(initDataRaw);

          if (!registerResponse.success) {
            setAuthStatus("Registration failed. Please try again.");
            return;
          }

          setAuthStatus("Registration successful. Trying authentication...");
          token = registerResponse.token;
        }

        const authResponse = await api.authenticateUser(token);
        if (!authResponse.success) {
          setAuthStatus("Authentication failed. Please try again.");
          return;
        }

        setAuthStatus("Authentication successful. Saving token...");
        await cloudStorage.setItem("bearerToken", token);

        setAuthStatus("Redirecting to game...");
        router.push("/game");
      } catch (error) {
        setAuthStatus("An error occurred. Please try again.");
        console.error("Auth error:", error);
      }
    }

    authenticate();
  }, [router]);

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <h2>{authStatus}</h2>
      </div>
  );
}

export default AuthWaitingPage;
