import { useEffect, useState } from "react";

const useTelegram = () => {
    const [tg, setTg] = useState<any>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        script.onload = () => {
            if (window.Telegram?.WebApp) {
                setTg(window.Telegram.WebApp);
                window.Telegram.WebApp.expand();
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return tg;
};

export default useTelegram;
