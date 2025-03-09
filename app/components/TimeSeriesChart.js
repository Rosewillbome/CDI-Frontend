"use client";
import { useEffect, useState, useMemo } from "react";
import Highcharts from "highcharts/highstock";
import axios from "axios";
import { v4 } from "uuid";
import {
  filterByMonth,
  filterByYear,
  filterDataByLegend,
} from "../utils/selectYear";
import { CDI_legend, PDI_legend, TDI_legend } from "../utils/drought_levels";
const TimeSeriesChart = ({
  indicator,
  timerange,
  month,
  district,
  chart_id,
  filterBylegend,
}) => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filteredLegend, setFilteredLegend] = useState([]);
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
          setHreload(v4());
        })
        .catch((error) => {
          console.error("comming error", error);
        });
    };
    fetchData();
  }, [indicator, district]);

  useEffect(() => {
    if (data?.length === 0) return;

    const filterbypcu = data.filter(
      (month_data) =>
        filterByMonth(month_data) === month &&
        filterByYear(month_data) === parseInt(timerange)
    );

    setFiltered(filterbypcu);
    setHreload(v4());
  }, [data, month, timerange]);

  useEffect(() => {
    if (data?.length === 0) return;
    if (filterBylegend?.length === 0) return;
    if (filtered?.length > 0) {
      const filteredbylegend = filterDataByLegend(filterBylegend, filtered);
      setFilteredLegend(filteredbylegend);
      setHreload(v4());
    } else {
      const filteredbylegend_two = filterDataByLegend(filterBylegend, data);
      setFilteredLegend(filteredbylegend_two);
      setHreload(v4());
    }
  }, [filterBylegend]);

  useEffect(() => {
    Highcharts.stockChart(`${chart_id}`, {
      rangeSelector: { selected: 5, inputEnabled: false },
      // title: {
      //   text: `${indicator?.toUpperCase()} Values with Drought Classification`,
      // },
      xAxis: { type: "datetime", title: { text: "Date" } },
      yAxis: {
        title: { text: `${indicator?.toUpperCase()} Value` },
        // plotBands: [
        //   {
        //     from: 1.0,
        //     to: 2.0,
        //     color: "#D2FBD2",
        //     label: { text: "No Drought (> 1.0)" },
        //   },
        //   {
        //     from: 0.8,
        //     to: 1.0,
        //     color: "#E6987B",
        //     label: { text: "Mild (0.8 - 1.0)" },
        //   },
        //   {
        //     from: 0.6,
        //     to: 0.8,
        //     color: "rgba(255, 165, 0, 0.2)",
        //     label: { text: "Moderate (0.6 - 0.8)" },
        //   },
        //   {
        //     from: 0.4,
        //     to: 0.6,
        //     color: "#D03A27",
        //     label: { text: "Severe (0.4 - 0.6)" },
        //   },
        //   {
        //     from: 0,
        //     to: 0.4,
        //     color: "#940905",
        //     label: { text: "Extreme (< 0.4)" },
        //   },
        // ],
        plotBands:
          indicator === "CDI"
            ? CDI_legend
            : indicator === "PDI"
            ? PDI_legend
            : indicator === "TDI"
            ? TDI_legend
            : [],
        min: 0,
        max: 2.5,
      },
      tooltip: {
        formatter: function () {
          const PDI_data_hover = (point) => {
            // let droughtLevel = "No Drought";
            // const value = this.y;
            // if (value <= 0.4) droughtLevel = "Extreme";
            // else if (value <= 0.6) droughtLevel = "Severe";
            // else if (value <= 0.8) droughtLevel = "Moderate";
            // else if (value <= 1.0) droughtLevel = "Mild";
            // return `<b>Date:</b> ${Highcharts.dateFormat(
            //   "%d %b %Y",
            //   this.x
            // )}<br><b>PDI:</b> ${this.y.toFixed(
            //   4
            // )}<br><b>Drought Level:</b> ${droughtLevel}`;
            let rainfall = "Above average";
            const value = point.y;
            if (value <= 0.4) rainfall = "Significantly below average";
            // else if (value <= 0.6) rainfall = "Severe";
            else if (value <= 0.8) rainfall = "Below average";
            else if (value <= 1.0) rainfall = "Average";
            return `<b>Date:</b> ${Highcharts.dateFormat(
              "%d %b %Y",
              point.x
            )}<br><b>PDI:</b> ${point.y.toFixed(
              4
            )}<br><b>Rainfall Level:</b> ${rainfall}`;
          };
          const CDI_data_hover = (point) => {
            let droughtLevel = "No Drought";
            const value = point.y;
            if (value <= 0.4) droughtLevel = "Extreme";
            else if (value <= 0.6) droughtLevel = "Severe";
            else if (value <= 0.8) droughtLevel = "Moderate";
            else if (value <= 1.0) droughtLevel = "Mild";
            return `<b>Date:</b> ${Highcharts.dateFormat(
              "%d %b %Y",
              point.x
            )}<br><b>PDI:</b> ${point.y.toFixed(
              4
            )}<br><b>Drought Level:</b> ${droughtLevel}`;
          };
          const TDI_data_hover = (point) => {
            let Temperature = "Normal to below normal";
            const value = point.y;
            if (value <= 0.4) Temperature = "Exeptionally higher than normal";
            else if (value <= 0.8)
              Temperature = "Higher than normal temperatures";
            return `<b>Date:</b> ${Highcharts.dateFormat(
              "%d %b %Y",
              point.x
            )}<br><b>PDI:</b> ${point.y.toFixed(
              4
            )}<br><b>Temperature Level:</b> ${Temperature}`;
          };
          return indicator === "PDI"
            ? PDI_data_hover(this)
            : indicator === "CDI"
            ? CDI_data_hover(this)
            : indicator === "TDI"
            ? TDI_data_hover(this)
            : "";
        },
      },
      series: [
        {
          name: `${indicator?.toUpperCase()} Uganda`,
          data:
            filteredLegend?.length > 0
              ? filteredLegend
              : filtered?.length > 0
              ? filtered
              : data,
          color: "#2f7ed8",
          lineWidth: 2.5,
          marker: { enabled: false, radius: 4 },
        },
      ],
    });
  }, [Hreload]);

  return <div id={chart_id} style={{ height: "100%", minWidth: "100%" }}></div>;
};

export default TimeSeriesChart;
