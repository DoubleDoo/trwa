import { useEffect, useState } from "react";

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

class TelegramAPI {
    private storage: any;
    private tg: any;

    constructor(tg: any) {
        if (!tg) throw new Error("Telegram WebApp instance is required.");
        this.tg = tg;
        this.storage = tg.CloudStorage;
    }

    async setItem(key: string, value: string): Promise<{ success: boolean; status: any }> {
        return new Promise((resolve, reject) => {
            this.storage.setItem(key, value, (status: any, isSet: boolean) => {
                if (!status) {
                    resolve({ success: isSet, status });
                } else {
                    reject(new Error("Failed to set item"));
                }
            });
        });
    }

    async getItem(key: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            this.storage.getItem(key, (status: any, value: string | null) => {
                if (!status) {
                    resolve(value);
                } else {
                    reject(new Error("Failed to get item"));
                }
            });
        });
    }

    async getKeys(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.storage.getKeys((status: any, keys: string[]) => {
                if (!status) {
                    resolve(keys);
                } else {
                    reject(new Error("Failed to get keys"));
                }
            });
        });
    }


    getUser(): any | null {
        return this.tg.initDataUnsafe?.user || null;
    }
}

export default useTelegramAPI;
