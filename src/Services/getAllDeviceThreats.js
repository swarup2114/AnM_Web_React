
import { getAllDeviceThreatsURL } from "../Redux/baseAPI";
import apiInstance from "../Redux/baseAPI";


const FetchAllDeviceThreats = async () => {
    try {
        const response = await apiInstance.get(getAllDeviceThreatsURL);
        console.log(response.data, "FetchAllDeviceThreats success")
        return response.data;
    } catch (error) {
        console.log(error.message, "FetchAllDeviceThreats error")
        return error.message;
    }
};

export default FetchAllDeviceThreats;
