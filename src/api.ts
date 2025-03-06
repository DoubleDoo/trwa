import axios from "axios";

const API_BASE_URL = "https://your-backend-url.com/api"; // Replace with your actual backend URL

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    header: {
        "Content-Type": "application/json",
    },
});

export const registerUser = async (user: any) => {
    return { success: true, token: user.id};
    // try {
    //     const response = await apiClient.post("/auth/register", { user });
    //     return response.data; // Expected response: { success: true, token: "jwt_token" }
    // } catch (error) {
    //     console.error("Registration failed:", error);
    //     return { success: false, error };
    // }
};


export const authenticateUser = async (token: string) => {
    return { success: false};
    // try {
    //     const response = await apiClient.post(
    //         "/auth/login",
    //         {},
    //         {
    //             headers: { Authorization: `Bearer ${token}` },
    //         }
    //     );
    //     return response.data; // Expected response: { success: true }
    // } catch (error) {
    //     console.error("Authentication failed:", error);
    //     return { success: false, error };
    // }
};

export const validateToken = async (token: string) => {
    return { success: true};
    // try {
    //     const response = await apiClient.get("/auth/validate", {
    //         headers: { Authorization: `Bearer ${token}` },
    //     });
    //     return response.data; // Expected response: { success: true, valid: true }
    // } catch (error) {
    //     console.error("Token validation failed:", error);
    //     return { success: false, valid: false, error };
    // }
};
