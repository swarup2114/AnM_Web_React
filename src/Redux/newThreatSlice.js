import { createSlice } from "@reduxjs/toolkit";

const threatsSlice = createSlice({
    name: "threats",
    initialState: {
        threatsData: [], // For threats
        eventsData: [], // For merchants
        eventSearhData: [],
        DeviceThreats: [],
        policies: [],
        terminals: [],
        threadReportedLogs: [],
        unResolvedThreats: [],
        loading: false,
    },
    reducers: {
        setLoading(state) {
            state.loading = true;
        },
        setLoaded(state) {
            state.loading = false;
        },
        // Fetch Threats Actions
        fetchThreatsSuccess(state, action) {
            state.threatsData = action.payload; // Update threats data
        },
        // Fetch Merchant Data Actions
        fetchEventsSuccess(state, action) {
            state.eventsData = action.payload; // Update merchant data
        },
        // Fetch Event Search Data Actions
        fetchEventsSearchSuccess(state, action) {
            state.eventSearhData = action.payload; // Update Event Search data
        },
        fetchDeviceThreatsSuccess(state, action) {
            state.DeviceThreats = action.payload; // Update Device Threats data
        },
        fetchPoliciesSuccess(state, action) {
            state.policies = action.payload; // Update Policies data
        },
        fetchTerminalsSuccess(state, action) {  // Fetch Terminals Actions
            state.terminals = action.payload; // Update Terminals data
        },
        fetchReportedThreatLogSuccess(state, action) {
            state.threadReportedLogs = action.payload; // Update Threat Reported Logs data
        },
        fetchAllUnresolvedThreatsSuccess(state, action) {
            state.unResolvedThreats = action.payload;
        }
    },
});

export const { fetchThreatsSuccess, fetchEventsSuccess, fetchEventsSearchSuccess, fetchDeviceThreatsSuccess, fetchPoliciesSuccess, fetchTerminalsSuccess, fetchReportedThreatLogSuccess, fetchAllUnresolvedThreatsSuccess, setLoading, setLoaded } = threatsSlice.actions;

export default threatsSlice.reducer;
