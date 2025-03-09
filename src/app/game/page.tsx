'use client';

import {Unity, useUnityContext} from "react-unity-webgl";
import {Fragment, useEffect, useState} from "react";

export default function FutureGamePage() {
    const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl: "/tg_survivor/tg_survivor.loader.js",
        dataUrl: "/tg_survivor/tg_survivor.data.gz",
        frameworkUrl: "/tg_survivor/tg_survivor.framework.js.gz",
        codeUrl: "/tg_survivor/tg_survivor.wasm.gz",
    });

    return (
        <Fragment>
            {!isLoaded && (
                <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
            )}
            <Unity
                unityProvider={unityProvider}
                style={{ visibility: isLoaded ? "visible" : "hidden" }}
            />
        </Fragment>
    );

}
