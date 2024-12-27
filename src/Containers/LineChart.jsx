import React from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "../components/Loading";

const AreaChartComponent = () => {
  const ReduxData = useSelector((state) => state.newThreadSlice)
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getFullYear()}`;
  };

  const today = new Date();
  const recentDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    return formatDate(date);
  });

  const counts = recentDates.map((date) => {
    if (ReduxData.DeviceThreats) {
      return ReduxData.DeviceThreats.filter(
        (item) => formatDate(item.updatedTime) === date
      ).length;
    }
    return 0;
  });

  const chartData = recentDates.map((date, index) => ({
    name: date,
    count: counts[index],
    amt: counts[index],
  }));

  return (
    <div style={{ backgroundColor: "aliceblue" }}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <XAxis
            dataKey="name"
            tick={{
              fontSize: 12,
              fill: "#333",
            }}
            tickLine={false}
            axisLine={{ stroke: "#000", strokeWidth: 2 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            tick={{
              fontSize: 12,
              fill: "#333",
            }}
            tickLine={false}
            axisLine={{ stroke: "#000", strokeWidth: 2 }}
            domain={["auto", "auto"]}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
