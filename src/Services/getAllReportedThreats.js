
import { getAllReportedThreatsURL } from "../Redux/baseAPI";
import apiInstance from "../Redux/baseAPI";


const FetchAllReportedThreats = async (threatId) => {
    try {
        const response = await apiInstance.post(getAllReportedThreatsURL, { threatId: threatId });
        console.log(response.data, "FetchAllReportedThreats success")
        return response.data;
    } catch (error) {
        console.log(error.message, "FetchAllReportedThreats error")
        return error.message;
    }
};

export default FetchAllReportedThreats;
