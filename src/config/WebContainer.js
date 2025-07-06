import { WebContainer } from '@webcontainer/api';

// Call only once
let webcontainerInstance = null;

export const getWebContainer = async () => {
    try {
        if (webcontainerInstance === null) {
            console.log("Initializing WebContainer...");
            webcontainerInstance = await WebContainer.boot();
            console.log("WebContainer initialized successfully:", webcontainerInstance);
            return webcontainerInstance;
        }
        console.log("Returning existing WebContainer instance");
        return webcontainerInstance;
    } catch (error) {
        console.error("Error initializing WebContainer:", error);
        throw error;
    }
    }