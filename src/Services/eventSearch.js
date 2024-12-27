import { eventSearchURL } from "../Redux/baseAPI";
import apiInstance from "../Redux/baseAPI";

const FetchEventData = async (merchantId, dateFrom, dateTo) => {
    const payload = {
        criteria: {
            dateFrom: dateFrom,
            dateTo: dateTo,
        },
        searchBy: {
            merchantId: merchantId,
        },
    };

    try {
        const response = await apiInstance.post(eventSearchURL, payload);
        if (response.data.responseCode == "200") {
            return response.data;
        } else if (response.data.responseCode == "5000") {
            return null;
        }

        console.log(response, "FetchEventData success");
        // return response;
    } catch (error) {
        console.log(error.message, "FetchEventData error");
        return error.message;
    }
};

export default FetchEventData;
