
import { getAllPoliciesURL } from "../Redux/baseAPI";
import apiInstance from "../Redux/baseAPI";


const FetchAllPolicies = async () => {
    try {
        const response = await apiInstance.get(getAllPoliciesURL);
        console.log(response.data, "FetchAllPolicies success")
        return response.data;
    } catch (error) {
        console.log(error.message, "FetchAllPolicies error")
        return error.message;
    }
};

export default FetchAllPolicies;
