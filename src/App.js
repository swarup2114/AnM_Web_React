import React, { useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";
import { EventDataWrapper } from "./components/DataWrapper";
import FetchAllThreats from "../src/Services/getAllThreats";
import {
  fetchEventsSearchSuccess,
  fetchThreatsSuccess,
  fetchDeviceThreatsSuccess,
  fetchEventsSuccess,
  fetchPoliciesSuccess,
  fetchTerminalsSuccess,
  fetchAllUnresolvedThreatsSuccess,
  setLoaded,
  setLoading,
} from "./Redux/newThreatSlice";
import EventSearch from "./PagesComponents/EventSearch";
import LoginPage from "./PagesComponents/Login";
import PolicyList from "./PagesComponents/Policies";
import { useLocation } from "react-router-dom";
import FetchEventData from "./Services/eventSearch";
import FetchAllPolicies from "./Services/getAllPolicies";
import FetchAllTerminals from "./Services/getAllTerminals";
import FetchAllDeviceThreats from "./Services/getAllDeviceThreats";
import ThreatsBasedOnDevice from "./PagesComponents/ReportedThreats";
import ThreatOverView from "./PagesComponents/ThreatsOverview";
import RecordsContainer from "../src/Containers/RecordsContainer";
import AboutUs from "./PagesComponents/Aboutus";
import Header from "./components/AppBar";
import Sidebar from "./components/SideBar";
import Footer from "./components/Footer";
import PagenotFound from "./PagesComponents/NoPageFound";
import Devices from "./PagesComponents/Devices";
import ThreatDetails from "./PagesComponents/ThreatDetails";
import EventDetails from "./Containers/EventDetails";
import { FetchAllUnresolvedThreats } from "./Services/getUnresolvedThreats";
import ThreatList from "./PagesComponents/ThreatList";
import ThreatsHandling from "./PagesComponents/ThreatsHandling";

const App = () => {
  const dispatch = useDispatch();
  const dataFetching = useSelector((state) => state.newThreadSlice);
  const location = useLocation();
  const payload = {
    merchantId: "111118",
    dateFrom: "2023-08-29T20:44:31.657016",
    dateTo: "",
  };

  useEffect(() => {
    const fetchThreatsAndMerchants = async () => {
      try {
        dispatch(setLoading());
        const threats = await FetchAllThreats();
        const events = await FetchEventData(
          payload.merchantId,
          payload.dateFrom,
          payload.dateTo
        );
        const DeviceThreats = await FetchAllDeviceThreats();
        const policies = await FetchAllPolicies();
        const terminals = await FetchAllTerminals();
        const UnResolvedThreats = await FetchAllUnresolvedThreats();
        const threatIds = threats.threatsResponseList.map(
          (threat) => threat.threatId
        );
        localStorage.setItem("threatIds", JSON.stringify(threatIds));
        dispatch(fetchEventsSuccess(events));
        dispatch(fetchThreatsSuccess(threats.threatsResponseList));
        dispatch(fetchEventsSearchSuccess(events));
        dispatch(fetchDeviceThreatsSuccess(DeviceThreats.threatsResponseList));
        dispatch(fetchPoliciesSuccess(policies));
        dispatch(fetchTerminalsSuccess(terminals));
        dispatch(fetchAllUnresolvedThreatsSuccess(UnResolvedThreats));
        dispatch(setLoaded());
      } catch (error) {
        dispatch(setLoaded());
        console.error("Error fetching data:", error.message);
      }
    };
    fetchThreatsAndMerchants();
  }, [dispatch]);

  const noHeaderSidebarRoutes = ["/"];

  const shouldHideHeaderSidebar = noHeaderSidebarRoutes.includes(
    location.pathname
  );

  return (
    <Suspense fallback={<Loading />}>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        width="100%"
        overflow="hidden"
      >
        {!shouldHideHeaderSidebar && <Header />}
        <Box display="flex" flexGrow={1} width="100%" overflow="hidden">
          {!shouldHideHeaderSidebar && <Sidebar />}
          <Box
            flexGrow={1}
            padding={!shouldHideHeaderSidebar ? 1 : 0}
            sx={{
              backgroundColor: "#f8f8f8",
              overflow: "auto",
              maxWidth: "100%",
            }}
          >
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/DeviceUser"
                element={
                  <RecordsContainer data={EventDataWrapper("deviceUser")} />
                }
              />
              <Route
                path="/General"
                element={
                  <RecordsContainer data={EventDataWrapper("general")} />
                }
              />
              <Route
                path="/Password"
                element={
                  <RecordsContainer data={EventDataWrapper("password")} />
                }
              />
              <Route
                path="/Security"
                element={
                  <RecordsContainer data={EventDataWrapper("security")} />
                }
              />
              <Route
                path="/Transactions"
                element={
                  <RecordsContainer data={EventDataWrapper("transactions")} />
                }
              />
              <Route path="/event-search" element={<EventSearch />} />
              <Route path="/events/:eventType" element={<EventDetails />} />
              <Route path="/threats-list" element={<ThreatList />} />
              <Route path="/threats-overview" element={<ThreatOverView />} />
              <Route path="/threats-overview/:id" element={<ThreatDetails />} />
              <Route
                path="/threats-reported"
                element={<ThreatsBasedOnDevice />}
              />
              <Route path="/threats-handling" element={<ThreatsHandling />} />
              <Route path="/threats" element={<ThreatsBasedOnDevice />} />
              <Route path="/Devices" element={<Devices />} />
              <Route path="/policies" element={<PolicyList />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="*" element={<PagenotFound />} />
            </Routes>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Suspense>
  );
};

export default App;
