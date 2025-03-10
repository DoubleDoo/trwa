'use client';

import { Unity, useUnityContext } from "react-unity-webgl";
import { Fragment, useEffect, useState } from "react";

export default function FutureGamePage() {
    const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl: "/tg_survivor_js/tg_survivor.loader.js",
        dataUrl: "/tg_survivor/tg_survivor.data.gz",
        frameworkUrl: "/tg_survivor/tg_survivor.framework.js.gz",
        codeUrl: "/tg_survivor/tg_survivor.wasm.gz",
    });

    return (
        <Fragment>
            {!isLoaded && (
                <p style={{textAlign: "center", fontSize: "1.2rem"}}>
                    Loading Application... {Math.round(loadingProgression * 100)}%
                </p>
            )}
            <div style={{
                width: "100vw",
                height: "100vh",
                margin: 0,
                padding: 0,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Unity unityProvider={unityProvider} style={{width: "100%", height: "100%"}}/>
            </div>
        </Fragment>
    );
}
