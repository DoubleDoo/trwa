'use client';

import { useEffect, useState } from 'react';
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function FutureGamePage() {
    const [loading, setLoading] = useState(true);

    const { addEventListener, removeEventListener, unityProvider, isLoading, isLoaded } = useUnityContext({
        loaderUrl: "/Build/WebBuild.loader.js",
        dataUrl: "/Build/WebBuild.data.gz",
        frameworkUrl: "/Build/WebBuild.framework.js",
        codeUrl: "/Build/WebBuild.wasm.gz",
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
