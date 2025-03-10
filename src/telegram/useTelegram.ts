import { useEffect, useState } from "react";
import TelegramAPI from "@/telegram/telegramApi";

const useTelegramAPI = () => {
    const [tg, setTg] = useState<any | null>(null);
    const [api, setApi] = useState<TelegramAPI | null>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js?56";
        script.async = true;
        script.onload = () => {
            if (window.Telegram?.WebApp) {
                const webApp = window.Telegram.WebApp;
                webApp.expand();
                setTg(webApp);
                setApi(new TelegramAPI(webApp));
                console.log("Telegram WebApp Initialized:", webApp);
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return { tg, api };
};

export default useTelegramAPI;
