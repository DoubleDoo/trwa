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
        loaderUrl: "./build/tg_survivor.loader.js",
        dataUrl: "./build/tg_survivor.data.gz",
        frameworkUrl: "./build/tg_survivor.framework.js.gz",
        codeUrl: "./build/tg_survivor.wasm.gz",
    });
    return <Unity unityProvider={unityProvider} />;
}
