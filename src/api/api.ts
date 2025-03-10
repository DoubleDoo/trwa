import axios from "axios";

import crypto from "crypto";

const API_BASE_URL = "https://188.227.86.94:8080/projects/admin_panel_6768/prod/rest_api_o21j"; // Replace with your actual backend URL
const SECRET_KEY = "eee14b586ed5fdcef2e5f98c1c7b73e4fd62aaf494d9547df1f003b9b27db4f7";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    header: {
        "Content-Type": "application/json",
    },
});

export const registerUser = async (user: any) => {
    let data={
        nick:user.username,
        tg_id:user.id
    }
    console.log(data)
    try {
        const response = await apiClient.post("/models/c6kqziew", data);
        console.log(response.data);
    } catch (error) {}
    return { success: true};
};


export const authenticateUser = async (user: any) => {
    try {
        const payload = JSON.stringify({ id: user.id });
        const signature = crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");

        const response = await apiClient.post("/actions/s8q5h13b", {
            hash: signature,
            tg_id: user.id
        });
        return { success: true, token:response.data.token }
    } catch (error) {
        console.error("Authentication failed:", error);
        return { success: false, error };
    }
};
