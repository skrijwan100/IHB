import { create } from "zustand";
import axios from "axios";

const tourGuideStore = create((set, get) => ({
    isLoading: false,
    error: null,
    message: null,
    tourGuide: null,
    allTourGuides: null,
    
    // Create Tour Guide
    createTourGuide: async (tourGuideData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v5/tourguide/createTourGuide`,
                tourGuideData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 201) {
                const tourGuide = response.data.data;
                set({
                    tourGuide,
                    isLoading: false,
                    message: response.data.message
                });
                return tourGuide;
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
    
    // Get All Tour Guides
    getAllTourGuides: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v5/tourguide/allTourGuides`
            );
            if (response.status === 200) {
                const tourGuides = response.data.data;
                set({
                    allTourGuides: tourGuides,
                    isLoading: false
                });
                return tourGuides;
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
    
    // Get Tour Guide By ID
    getTourGuideById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v5/tourguide/getTourGuideById/${id}`
            );
            if (response.status === 200) {
                const tourGuide = response.data.data;
                set({
                    tourGuide,
                    isLoading: false
                });
                return tourGuide;
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
    
    // Get Tour Guide By Email
    getTourGuideByEmail: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v5/tourguide/getTourGuideByEmail/${email}`
            );
            if (response.status === 200) {
                const tourGuide = response.data.data;
                set({
                    tourGuide,
                    isLoading: false
                });
                return tourGuide;
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
    
    // Update Tour Guide
    updateTourGuide: async (id, tourGuideData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/v5/tourguide/updateTourGuide/${id}`,
                tourGuideData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                const tourGuide = response.data.data;
                set({
                    tourGuide,
                    isLoading: false,
                    message: response.data.message
                });
                
                // Update the tour guide in allTourGuides if it exists
                const { allTourGuides } = get();
                if (allTourGuides) {
                    const updatedTourGuides = allTourGuides.map(guide => 
                        guide._id === id ? tourGuide : guide
                    );
                    set({ allTourGuides: updatedTourGuides });
                }
                
                return tourGuide;
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
    
    // Rate Tour Guide
    ratingTourGuide: async (id, rating) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v5/tourguide/ratingTourGuide/${id}`,
                { rating },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                const tourGuide = response.data.data;
                set({
                    tourGuide,
                    isLoading: false,
                    message: response.data.message
                });
                
                // Update the tour guide in allTourGuides if it exists
                const { allTourGuides } = get();
                if (allTourGuides) {
                    const updatedTourGuides = allTourGuides.map(guide => 
                        guide._id === id ? tourGuide : guide
                    );
                    set({ allTourGuides: updatedTourGuides });
                }
                
                return tourGuide;
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
    
    // Delete Tour Guide
    deleteTourGuide: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/v5/tourguide/deleteTourGuide/${id}`
            );
            if (response.status === 200) {
                const tourGuide = response.data.data;
                set({
                    tourGuide,
                    isLoading: false,
                    message: response.data.message
                });
                
                // Remove the deleted tour guide from allTourGuides if it exists
                const { allTourGuides } = get();
                if (allTourGuides) {
                    const updatedTourGuides = allTourGuides.filter(guide => guide._id !== id);
                    set({ allTourGuides: updatedTourGuides });
                }
                
                return tourGuide;
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

export default tourGuideStore;