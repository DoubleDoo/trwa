"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useTelegramAPI from "@/useTelegram";
import {authenticateUser, registerUser} from "@/api";

function AuthPage() {
  const [authStatus, setAuthStatus] = useState("Initializing...");
  const router = useRouter();
  const { tg, api } = useTelegramAPI(); // Use the custom Telegram API hook

  useEffect(() => {
    if (!tg || !api) return;
    authenticate();
  }, [tg, api]);

  const authenticate = async () => {
    try {
      setAuthStatus("Retrieving Telegram user...");

      const user = api!.getUser();
      if (!user) {
        setAuthStatus("User data unavailable.");
        return;
      }
      console.log("Telegram User:", user);

      setAuthStatus("Checking stored token...");
      let token = await api!.getItem("bearerToken");

      if (!token) {
        setAuthStatus("No token found. Registering user...");
        const registerResponse = await registerUser(user);

        if (!registerResponse?.success || !registerResponse?.token) {
          setAuthStatus("Registration failed.");
          console.error("Registration failed:", registerResponse);
          return;
        }

        token = registerResponse.token;
        await api!.setItem("bearerToken", token!);
      }

      setAuthStatus("Authenticating...");
      const authResponse = await authenticateUser(token!);

      if (!authResponse?.success) {
        setAuthStatus("Authentication failed.");
        console.error("Authentication failed:", authResponse);
        return;
      }

      setAuthStatus("Authentication successful! Redirecting...");
      setTimeout(() => {
        router.push("/game");
      }, 1000);
    } catch (error) {
      setAuthStatus("An error occurred. Please try again.");
      console.error("Authentication error:", error);
    }
  };

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <h2>{authStatus}</h2>
      </div>
  );
}

export default AuthPage;
