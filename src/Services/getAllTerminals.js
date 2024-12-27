
import { getAllTerminalsURL } from "../Redux/baseAPI";
import { apiInstance2 } from "../Redux/baseAPI";


const FetchAllTerminals = async () => {
    try {
        const response = await apiInstance2.get(getAllTerminalsURL);
        console.log(response.data, "FetchAllTerminals success")
        return response.data;
    } catch (error) {
        console.log(error.message, "FetchAllTerminals error")
        return error.message;
    }
};

export default FetchAllTerminals;
