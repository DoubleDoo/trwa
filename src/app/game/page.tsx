'use client';

import { useEffect, useState } from 'react';
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function FutureGamePage() {
    const [loading, setLoading] = useState(true);

    // Load Unity assets and manage loading state
    const { unityProvider, isLoading, isLoaded } = useUnityContext({
        loaderUrl: "./build/tg_survivor.loader.js",
        dataUrl: "./build/tg_survivor.data.gz",
        frameworkUrl: "./build/tg_survivor.framework.js.gz",
        codeUrl: "./build/tg_survivor.wasm.gz",
    });

    // Use useEffect to handle the Unity loading state
    useEffect(() => {
        if (!isLoading && !loading) {
            setLoading(false); // Unity finished loading
        }
    }, [isLoading, loading]);

    if (loading || isLoading) {
        return <div>Loading...</div>; // Display loading indicator until Unity is ready
    }

    return <Unity unityProvider={unityProvider} />;
}
