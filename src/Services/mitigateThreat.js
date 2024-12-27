import { mitigateThreatURL } from "../Redux/baseAPI";
import apiInstance from "../Redux/baseAPI";

const MitigateThreat = async (payload) => {
    try {
        const response = await apiInstance.post(mitigateThreatURL, payload);
        console.log(response.data, "CreatePolicy success");
        return response.data;
    } catch (error) {
        console.log(error.message, "CreatePolicy error");
        return error.message;
    }
};

export default MitigateThreat;