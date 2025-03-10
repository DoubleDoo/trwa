"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useTelegramAPI from "@/telegram/useTelegram";
import { authenticateUser, registerUser } from "@/api/api";

function AuthPage() {
  const [authStatus, setAuthStatus] = useState("Initializing...");
  const router = useRouter();
  const { tg, api } = useTelegramAPI();

  useEffect(() => {
    if (!tg || !api) return;
    authenticate();
  }, [tg, api]);

  const authenticate = async () => {
    try {
      setAuthStatus("Retrieving Telegram user...");

      let user = api!.getUser()
      if (!user) {
        //TEST
        user= {
          username:"dodubina",
          id:"6498348206"
        }
        //TEST
        // setAuthStatus("User data unavailable.");
        // return;
      }
      console.log("Telegram User:", user);

      setAuthStatus("Checking stored token...");
      let token = await api!.getItem("bearerToken2");

      if (!token) {
        setAuthStatus("No token found. Registering user...");
        const registerResponse = await registerUser(user);

        if (!registerResponse?.success) {
          setAuthStatus("Registration failed.");
          console.error("Registration failed:", registerResponse);
          return;
        }

        setAuthStatus("Authenticating...");
        const authResponse = await authenticateUser(user);

        if (!authResponse?.success || !authResponse.token) {
          setAuthStatus("Authentication failed.");
          console.error("Authentication failed:", authResponse);
          return;
        }

        token = authResponse.token;
        await api!.setItem("bearerToken2", token!);
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
        <h2>{authStatus}</h2>
      </div>
  );
}

export default AuthPage;