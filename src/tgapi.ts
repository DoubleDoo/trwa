import { useEffect, useState } from "react";
import { init, expandViewport,initDataUser,cloudStorage } from "@telegram-apps/sdk";

const useTelegram = () => {
    useEffect(() => {
        init();
        expandViewport();
    }, []);
};

export default useTelegram;