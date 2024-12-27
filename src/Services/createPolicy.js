import { createPolicyURL } from "../Redux/baseAPI";
import apiInstance from "../Redux/baseAPI";

const CreatePolicy = async (id, name, group, threatList, score) => {
    const payload = {
        id: id,
        name: name,
        group: group,
        threatList: threatList,
        score: score,
    }
    try {
        const response = await apiInstance.post(createPolicyURL, payload);
        console.log(response.data, "CreatePolicy success");
        return response.data;
    } catch (error) {
        console.log(error.message, "CreatePolicy error");
        return error.message;
    }
};

export default CreatePolicy;