import apiInstance from "../Redux/baseAPI";

const apiCall = async (apiMethod, url, payload = null) => {
    try {
        const response = await apiInstance[apiMethod](url, payload);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API Error:", error.message);
        return { success: false, error: error.message };
    }
};

export default apiCall;
