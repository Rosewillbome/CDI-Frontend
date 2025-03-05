"use client";
import { useEffect, useState, useMemo } from "react";
import Highcharts from "highcharts/highstock";
import axios from "axios";
import { uuid } from "uuidv4";
import { filterByMonth, filterByYear } from "../utils/selectYear";
const TimeSeriesChart = ({
  indicator,
  timerange,
  month,
  district,
  chart_id,
}) => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [Hreload, setHreload] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          `${
            process.env.NEXT_PUBLIC_API
          }cdi/district/${indicator?.toLowerCase()}/${district?.toUpperCase()}`
        )
        .then((response) => {
          setData(response?.data?.data);
          setHreload(uuid());
        })
        .catch((error) => {
          console.error("comming error", error);
        });
    };
    fetchData();
  }, [indicator, district]);

  useEffect(() => {
    if (data?.length > 0) {
      const filterbypcu = data.filter(
        (month_data) =>
          filterByMonth(month_data) === month &&
          filterByYear(month_data) === parseInt(timerange)
      );
      setFiltered(filterbypcu);
      setHreload(uuid());
      //filterByMonth(month_data) === month &&
    }
  }, [data, month, timerange]);

  useEffect(() => {
    Highcharts.stockChart(`${chart_id}`, {
      rangeSelector: { selected: 1, inputEnabled: false },
      title: {
        text: `${indicator?.toUpperCase()} Values with Drought Classification`,
      },
      xAxis: { type: "datetime", title: { text: "Date" } },
      yAxis: {
        title: { text: `${indicator?.toUpperCase()} Value` },
        plotBands: [
          {
            from: 1.0,
            to: 2.0,
            color: "rgba(144, 238, 144, 0.2)",
            // label: { text: "No Drought (> 1.0)" },
          },
          {
            from: 0.8,
            to: 1.0,
            color: "rgba(255, 255, 0, 0.2)",
            // label: { text: "Mild (0.8 - 1.0)" },
          },
          {
            from: 0.6,
            to: 0.8,
            color: "rgba(255, 165, 0, 0.2)",
            // label: { text: "Moderate (0.6 - 0.8)" },
          },
          {
            from: 0.4,
            to: 0.6,
            color: "rgba(255, 69, 0, 0.2)",
            // label: { text: "Severe (0.4 - 0.6)" },
          },
          {
            from: 0,
            to: 0.4,
            color: "rgba(139, 0, 0, 0.2)",
            // label: { text: "Extreme (< 0.4)" },
          },
        ],
        min: 0,
        max: 1.9,
      },
      tooltip: {
        formatter: function () {
          let droughtLevel = "No Drought";
          const value = this.y;
          if (value <= 0.4) droughtLevel = "Extreme";
          else if (value <= 0.6) droughtLevel = "Severe";
          else if (value <= 0.8) droughtLevel = "Moderate";
          else if (value <= 1.0) droughtLevel = "Mild";
          return `<b>Date:</b> ${Highcharts.dateFormat(
            "%d %b %Y",
            this.x
          )}<br><b>PDI:</b> ${this.y.toFixed(
            4
          )}<br><b>Drought Level:</b> ${droughtLevel}`;
        },
      },
      series: [
        {
          name: `${indicator?.toUpperCase()} Uganda`,
          data: filtered?.length > 0 ? filtered : data,
          color: "#2f7ed8",
          lineWidth: 3,
          marker: { enabled: true, radius: 4 },
        },
      ],
    });
  }, [Hreload]);

  return <div id={chart_id} style={{ height: "100%", minWidth: "100%" }}></div>;
};

export default TimeSeriesChart;
