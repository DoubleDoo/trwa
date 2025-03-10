import axios from "axios";

import crypto from "crypto";

const API_BASE_URL = "http://188.227.86.94:8080"; // Replace with your actual backend URL
const SECRET_KEY = "eee14b586ed5fdcef2e5f98c1c7b73e4fd62aaf494d9547df1f003b9b27db4f7";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    header: "Content-Type application/json",
});

export const registerUser = async (user: any) => {
    let data={
        nick:user.username??"dodubina",
        tg_id:user.id??"6498348206"
    }
    console.log(data)
    try {
        const response = await apiClient.post("/users/create", data);
        console.log(response.data);
        return { success: true};
    } catch (error) {
        console.log(error)
        return { success: false};
    }
};


export const authenticateUser = async (user: any) => {
    try {
        const payload = JSON.stringify({ id: user.id??"6498348206" });
        const signature = crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");

        const response = await apiClient.post("/auth", {
            hash: signature,
            tg_id: user.id??"6498348206"
        });
        return { success: true, token:response.data.token }
    } catch (error) {
        console.error("Authentication failed:", error);
        return { success: false, error };
    }
};
