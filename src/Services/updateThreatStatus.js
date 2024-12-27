import { updateThreatStatusURL } from "../Redux/baseAPI";
import apiInstance from "../Redux/baseAPI";

const updateThreatStatus = async (threatId, status) => {
    const payload = {
        threatId: threatId,
        status: status
    }

    try {
        const response = await apiInstance.post(updateThreatStatusURL, payload);
        console.log(response.data, "CreatePolicy success");
        return response.data;
    } catch (error) {
        console.log(error.message, "CreatePolicy error");
        return error.message;
    }
};

export default updateThreatStatus;