'use client';

import { useEffect, useState } from 'react';
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function FutureGamePage() {
    const [loading, setLoading] = useState(true);

    const { addEventListener, removeEventListener, unityProvider, isLoading, isLoaded } = useUnityContext({
        loaderUrl: "/Build/WebBuild.loader.js",
        dataUrl: "/Build/WebBuild.data",
        frameworkUrl: "/Build/WebBuild.framework.js",
        codeUrl: "/Build/WebBuild.wasm",
    });
    return <Unity unityProvider={unityProvider} />;
}
