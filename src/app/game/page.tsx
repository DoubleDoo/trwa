'use client';

import { useEffect, useState } from 'react';
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function FutureGamePage() {
    const [loading, setLoading] = useState(true);

    const { addEventListener, removeEventListener, unityProvider, isLoading, isLoaded } = useUnityContext({
        loaderUrl: "/tg_survivor.loader.js",
        dataUrl: "/tg_survivor.data.gz",
        frameworkUrl: "/tg_survivor.framework.js.gz",
        codeUrl: "/tg_survivor.wasm.gz",
    });
    return <Unity unityProvider={unityProvider} />;
}
