import { create } from "zustand";
import axios from "axios";

const userStore = create((set, get) => ({
    isLoading: false,
    error: null,
    message: null,
    user: null,
    isAuthenticated: false,
    logIn : async (smartID, fullname) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v2/auth/login`,
                { smartID, fullname }
            );
            if (response.status === 200) {
                const { accessToken, user } = response.data.data;
                localStorage.setItem("accessToken", accessToken);
                set({
                    user,
                    isAuthenticated: true,
                    isLoading: false
                });

                console.log("from store", { accessToken, user });
            } else {
                set({ user: null, isAuthenticated: false, isLoading: false });
            }
        } catch (error) {
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },
    currentUser : async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v2/auth/current`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            );
            if (response.status === 200) {
                const user = response.data.data;
                set({
                    user,
                    isAuthenticated: true,
                    isLoading: false
                });
            } else {
                set({ user: null, isAuthenticated: false, isLoading: false });
            }
        } catch (error) {
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },
    logOut : async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v2/auth/logout`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            );
            if (response.status === 200) {
                localStorage.removeItem("accessToken");
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false
                });
            } else {
                set({ user: null, isAuthenticated: false, isLoading: false });
            }
        } catch (error) {
            set({ isLoading: false, error: error.message });
            throw error;
        }
    }
}))


export default userStore;