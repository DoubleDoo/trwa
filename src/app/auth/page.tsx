'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useTelegram from "@/tgapi";

function AuthPage() {
  const [authStatus, setAuthStatus] = useState("Initializing...");
  const router = useRouter();
  let tg=useTelegram();
  let user=null;

  const ffff = async () => {
    if (!tg) {
      console.error("Telegram WebApp is not initialized yet.");
      return;
    }

    // Retrieve user information
    user = tg.initDataUnsafe?.user;
    console.log(`User: ${JSON.stringify(user)}`);

    try {
      // Store a value
      console.log(tg.CloudStorage);
      await tg.CloudStorage.setItem("keykey", "value");
      console.log("Successfully set item in CloudStorage");

      // Retrieve keys correctly
      let {stts,vallll} =await tg.CloudStorage.getKeys((sdasd:any,keys:any) => {
        console.log(`Retrieved Keys1: ${JSON.stringify(keys)}`);
      });
      console.log(`Retrieved Keys2: ${JSON.stringify(vallll)}`);
      // Retrieve stored value
      const {status,value} = await tg.CloudStorage.getItem("keykey")
      console.log(`Retrieved Value: ${JSON.stringify(value)},${JSON.stringify(status)}`);
    } catch (error:any) {
      console.error("Error interacting with CloudStorage:", error);
    }
  };


  if(tg){
    ffff();
  }
  useEffect(() => {
    async function authenticate() {
      // try {
    //     setAuthStatus("Retrieving launch params...");
    //     const { initDataRaw } = await retrieveLaunchParams();
    //     const user = tg?.initDataUnsafe?.user;
    //
    //     console.log("Telegram Launch Params:", initDataRaw);
    //     console.log("Telegram User Data:", user);
    //
    //     setAuthStatus("Checking stored token...");
    //     let token = await cloudStorage.getItem("bearerToken");
    //
    //     if (!token) {
    //       setAuthStatus("No token found. Registering user...");
    //       const registerResponse = await api.registerUser(initDataRaw);
    //
    //       if (!registerResponse?.success || !registerResponse?.token) {
    //         setAuthStatus("Registration failed. Please try again.");
    //         console.error("Registration failed:", registerResponse);
    //         return;
    //       }
    //
    //       token = registerResponse.token;
    //     }
    //
    //     setAuthStatus("Authenticating...");
    //     const authResponse = await api.authenticateUser(token);
    //
    //     if (!authResponse?.success) {
    //       setAuthStatus("Authentication failed. Please try again.");
    //       console.error("Authentication failed:", authResponse);
    //       return;
    //     }
    //
    //     setAuthStatus("Authentication successful. Saving token...");
    //     await cloudStorage.setItem("bearerToken", token);
    //
    //     setAuthStatus("Redirecting to game...");
    //     router.push("/game");
    //   } catch (error) {
    //     setAuthStatus("An error occurred. Please try again.");
    //     console.error("Authentication error:", error);
    //   }
    }

    authenticate();
  }, [router]);

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <h2>{authStatus}</h2>
      </div>
  );
}

export default AuthPage;
