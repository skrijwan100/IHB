import { create } from "zustand";
import axios from "axios";

const conversionStore = create((set, get) => ({
    isLoading: false,
    error: null,
    message: null,
    conversion: null,
    allConversions: null,
    
    // Create Conversion
    createConversion: async (content) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v6/conversion/createConversion`,
                { content },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            );
            if (response.status === 201) {
                const { conversion } = response.data.data;
                set({
                    conversion,
                    isLoading: false,
                    message: response.data.message
                });
                return conversion;
            } else {
                set({ isLoading: false });
                return null;
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            set({ isLoading: false, error: errorMsg });
            throw error;
        }
    },
    
    // Get All Conversions
    getAllConversions: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v6/conversion/allConversions`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            );
            if (response.status === 200) {
                const { conversions } = response.data.data;
                set({
                    allConversions: conversions,
                    isLoading: false
                });
                return conversions;
            } else {
                set({ isLoading: false });
                return null;
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            set({ isLoading: false, error: errorMsg });
            throw error;
        }
    },
    
    // Get Conversion By ID
    getConversionById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v6/conversion/getConversionById/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            );
            if (response.status === 200) {
                const conversion = response.data.data;
                set({
                    conversion,
                    isLoading: false
                });
                return conversion;
            } else {
                set({ isLoading: false });
                return null;
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            set({ isLoading: false, error: errorMsg });
            throw error;
        }
    },
    
    // Update Conversion
    updateConversion: async (id, content) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/v6/conversion/updateConversion/${id}`,
                { content },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            );
            if (response.status === 200) {
                const conversion = response.data.data;
                set({
                    conversion,
                    isLoading: false,
                    message: response.data.message
                });
                return conversion;
            } else {
                set({ isLoading: false });
                return null;
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            set({ isLoading: false, error: errorMsg });
            throw error;
        }
    },
    
    // Delete Conversion
    deleteConversion: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/v6/conversion/deleteConversion/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            );
            if (response.status === 200) {
                const conversion = response.data.data;
                set({
                    conversion,
                    isLoading: false,
                    message: response.data.message
                });
                
                const { allConversions } = get();
                if (allConversions) {
                    const updatedConversions = allConversions.filter(conv => conv._id !== id);
                    set({ allConversions: updatedConversions });
                }
                
                return conversion;
            } else {
                set({ isLoading: false });
                return null;
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            set({ isLoading: false, error: errorMsg });
            throw error;
        }
    },
    
    clearState: () => {
        set({ error: null, message: null });
    }
}));

export default conversionStore;