import axios, { AxiosInstance } from 'axios';

interface UserDTO {
    nick: string;
    tg_id: number;
}

interface AuthData {
    tg_id: number;
    hash: string;
}

class API {
    private api: AxiosInstance;

    constructor(private baseURL: string, private authToken: string) {
        this.api = axios.create({
            baseURL: this.baseURL,
            // headers: {
            //     'Authorization': `Bearer ${this.authToken}`,
            //     'Content-Type': 'application/json'
            // }
        });
    }

    async registerUser(user: any): Promise<any> {
        try {
            const response = await this.api.post('/models/c6kqziew', user);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async authenticateUser(user: any): Promise<any> {
        try {
            // const response = await this.api.post('/auth', user);
            // return response.data;
            let token="Bearer token"
            return token;
        } catch (error) {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }
}

export default API;
