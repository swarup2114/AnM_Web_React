
import { getAllReportedLogsURL } from "../Redux/baseAPI";
import apiInstance from "../Redux/baseAPI";


const FetchAllReportedThreatLogs = async (reportId) => {
    // const payload = {
    //     reportId: reportId,
    //     threatId: threatId,
    //     mobileNumber: mobileNumber
    // }
    try {
        const response = await apiInstance.post(getAllReportedLogsURL, { reportId: reportId });
        console.log(response.data, "FetchAllReportedThreatLogs success")
        return response.data;
    } catch (error) {
        console.log(error.message, "FetchAllReportedThreatLogs error")
        return error.message;
    }
};

export default FetchAllReportedThreatLogs;
