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
      console.log(tg.CloudStorage);
      await tg.CloudStorage.setItem("keykey", "value",(setStatus,resultA, resultB)=>{
        console.log(`setItem: ${JSON.stringify(setStatus)}  ${JSON.stringify(resultA)}  ${JSON.stringify(resultB)}`);
      });

      await tg.CloudStorage.getKeys((setStatus,resultA, resultB)=>{
        console.log(`setItem: ${JSON.stringify(setStatus)}  ${JSON.stringify(resultA)}  ${JSON.stringify(resultB)}`);
      });

      const {getStatus,resultE, resultF} = await tg.CloudStorage.getItem("keykey",(setStatus,resultA, resultB)=>{
        console.log(`setItem: ${JSON.stringify(setStatus)}  ${JSON.stringify(resultA)}  ${JSON.stringify(resultB)}`);
      });

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
      //   setAuthStatus("Retrieving launch params...");
      //   const { initDataRaw } = await retrieveLaunchParams();
      //   const user = tg?.initDataUnsafe?.user;
      //
      //   console.log("Telegram Launch Params:", initDataRaw);
      //   console.log("Telegram User Data:", user);
      //
      //   setAuthStatus("Checking stored token...");
      //   let token = await cloudStorage.getItem("bearerToken");
      //
      //   if (!token) {
      //     setAuthStatus("No token found. Registering user...");
      //     const registerResponse = await api.registerUser(initDataRaw);
      //
      //     if (!registerResponse?.success || !registerResponse?.token) {
      //       setAuthStatus("Registration failed. Please try again.");
      //       console.error("Registration failed:", registerResponse);
      //       return;
      //     }
      //
      //     token = registerResponse.token;
      //   }
      //
      //   setAuthStatus("Authenticating...");
      //   const authResponse = await api.authenticateUser(token);
      //
      //   if (!authResponse?.success) {
      //     setAuthStatus("Authentication failed. Please try again.");
      //     console.error("Authentication failed:", authResponse);
      //     return;
      //   }
      //
      //   setAuthStatus("Authentication successful. Saving token...");
      //   await cloudStorage.setItem("bearerToken", token);
      //
      //   setAuthStatus("Redirecting to game...");
      //   router.push("/game");
      // } catch (error) {
      //   setAuthStatus("An error occurred. Please try again.");
      //   console.error("Authentication error:", error);
      // }
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
