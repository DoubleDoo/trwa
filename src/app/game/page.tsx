'use client';

import { useEffect, useState } from 'react';
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function FutureGamePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

    const { unityProvider } = useUnityContext({
        loaderUrl: "./build/UnityBuild.loader.js",
        dataUrl: "./build/UnityBuild.data.unityweb",
        frameworkUrl: "./build/UnityBuild.framework.js." +
            "",
        codeUrl: "./build/UnityBuild.wasm.unityweb",
    });
    return <Unity unityProvider={unityProvider} />;
}
