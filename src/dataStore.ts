class DataStore {
    private static instance: DataStore;
    private user: { id: number; name: string } | null = null;
    private bearerToken: string | null = null;

    private constructor() {}

    public static getInstance(): DataStore {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    public setUser(user: { id: number; name: string }): void {
        this.user = user;
    }

    public getUser(): { id: number; name: string } | null {
        return this.user;
    }

    public setBearerToken(token: string): void {
        this.bearerToken = token;
    }

    public getBearerToken(): string | null {
        return this.bearerToken;
    }

    public async fetchBearerTokenFromTelegramCloudStorage(): Promise<void> {
        if (window.Telegram?.WebApp) {
            try {
                const tgWebApp = window.Telegram.WebApp;

                // Retrieve the bearer token from CloudStorage using Telegram API
                const token = await tgWebApp.cloudStorage.getData("bearer_token"); // Assuming bearer token is stored in CloudStorage
                if (token) {
                    this.setBearerToken(token);
                }
            } catch (error) {
                console.error("Error fetching bearer token from Telegram CloudStorage:", error);
            }
        }
    }
}
