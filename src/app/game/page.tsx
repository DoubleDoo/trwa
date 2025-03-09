'use client';

import { useUnityContext } from "react-unity-webgl";
import { useEffect, useState } from "react";

export default function FutureGamePage() {
    const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl: "/tg_survivor/tg_survivor.loader.js",
        dataUrl: "/tg_survivor/tg_survivor.data.gz",
        frameworkUrl: "/tg_survivor/tg_survivor.framework.js.gz",
        codeUrl: "/tg_survivor/tg_survivor.wasm.gz",
    });

    return (
        <div>
            {!isLoaded && <p>Loading... {Math.round(loadingProgression * 100)}%</p>}
            {isLoaded && <Unity unityProvider={unityProvider} style={{ width: "960px", height: "600px" }} />}
        </div>
    );
}
