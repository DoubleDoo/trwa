'use client';

import { useEffect, useState } from 'react';
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function FutureGamePage() {
    const [loading, setLoading] = useState(true);

    const { addEventListener, removeEventListener, unityProvider, isLoading, isLoaded } = useUnityContext({
        loaderUrl: "/build/WebBuild.loader.js",
        dataUrl: "/build/WebBuild.data.gz",
        frameworkUrl: "/build/WebBuild.framework.js",
        codeUrl: "/build/WebBuild.wasm.gz",
    });
    return <Unity unityProvider={unityProvider} />;
}
