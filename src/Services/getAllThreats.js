import { getAllThreatsURL } from "../Redux/baseAPI";
import apiCall from "../Utiles/apiCall";

const FetchAllThreats = async () => {
    const { success, data, error } = await apiCall("get", getAllThreatsURL);
    if (success) {
        return data;
    } else {
        throw new Error(error);
    }
};

export default FetchAllThreats;
