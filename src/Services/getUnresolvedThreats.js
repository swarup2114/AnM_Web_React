import { getUnresolvedThreatesURL } from "../Redux/baseAPI";
import apiInstance from "../Redux/baseAPI";

export const FetchAllUnresolvedThreats = async () => {
    try {
        const response = await apiInstance.get(getUnresolvedThreatesURL);
        console.log(response.data, "response.data")
        return response.data.threatsResponseList;
    } catch (error) {
        console.log(error.message, "FetchAllDeviceThreats error")
        return error.message;
    }
}