import useTelegram from "@/tgapi";
import AuthWaitingPage from "@/app/auth/page";

class DataStore {
    private static instance: DataStore;
    private constructor() {}

    private tg = useTelegram();

    public static getInstance(): DataStore {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    public getUser() {
        return this.tg.initDataUnsafe?.user;
    }

    public async setBearerToken(token: string) {
        await this.tg.cloudStorage.setData("bearer_token",token)
    }

    public async getBearerToken() {
        let token=await this.tg.cloudStorage.getData("bearer_token")
        if (token) {
            return token;
        }
        return null;
    }
}

export default DataStore;