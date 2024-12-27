import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://ec2-65-0-85-78.ap-south-1.compute.amazonaws.com:8083/',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const apiInstance2 = axios.create({
  baseURL: 'http://ec2-65-0-85-78.ap-south-1.compute.amazonaws.com:8081/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventSearchURL = "api/ina-ams-event/search"
export const getAllPoliciesURL = 'api/ina-ams-policy/getAllPolicies';

export const getAllTerminalsURL = 'api/ina-merchant-terminal/getAllTerminals';

export const getAllThreatsURL = 'api/ina-ams-threat/getAllThreats';

export const getAllReportedThreatsURL = "api/ina-ams-threat/getAllReportedThreats";

export const getAllReportedLogsURL = "api/ina-ams-threat/getReportedThreatLogs";

export const getAllDeviceThreatsURL = 'api/ina-ams-threat/getAllDevicesReportedThreats';

export const createPolicyURL = 'api/ina-ams-policy/create';

export const mitigateThreatURL = "api/ina-ams-threat/mitigateThreat";

export const MERCHANT_ID = "111118";
export const getUnresolvedThreatesURL = "api/ina-ams-threat/getAllUnresolvedThreats"

export const updateThreatStatusURL = "api/ina-ams-threat/updateThreatStatus"
export default apiInstance;
