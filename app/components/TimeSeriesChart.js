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
  const [Hreload, setHreload] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API}data/district/${
            district?.trim()?.toLowerCase() === "all" || district?.trim() === ""
              ? `all/${indicator?.trim()?.toLowerCase()}`
              : `${indicator?.trim()?.toLowerCase()}/${district?.trim()?.toUpperCase()}`
          }`
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
    if (data?.length === 0) {
      setFiltered([]);
      setHreload(v4());
      return;
    }
    let filtered = [];

    if (timerange?.trim()?.length !== 0) {
      if (filtered?.length > 0) {
        const filterbypcu = filtered?.filter(
          (month_data) => filterByYear(month_data) === parseInt(timerange)
        );
        filtered = filterbypcu;
      } else {
        const filterbypcu = data?.filter(
          (month_data) => filterByYear(month_data) === parseInt(timerange)
        );
        filtered = filterbypcu;
      }
    }

    // if (month?.trim()?.length !== 0) {
    //   if (filtered?.length > 0) {
    //     const filterbypcu = filtered?.filter(
    //       (month_data) =>
    //         filterByMonth(month_data)?.toLowerCase() === month?.toLowerCase()
    //     );
    //     filtered = filterbypcu;
    //   } else {
    //     const filterbypcu = data?.filter(
    //       (month_data) =>
    //         filterByMonth(month_data)?.toLowerCase() === month?.toLowerCase()
    //     );
    //     filtered = filterbypcu;
    //   }
    // }

    if (filterBylegend?.length > 0) {
      if (filtered?.length > 0) {
        const filteredbylegend = filterDataByLegend(filterBylegend, filtered);
        filtered = filteredbylegend;
      } else {
        const filteredbylegend_two = filterDataByLegend(filterBylegend, data);
        filtered = filteredbylegend_two;
      }
    }
    setFiltered(filtered);
    setHreload(v4());
  }, [data, timerange, filterBylegend]);

  useEffect(() => {
    Highcharts.stockChart(`${chart_id}`, {
      chart: {
        marginLeft: 5,
      },
      exporting: {
        buttons: {
          contextButton: {
            enabled: false,
          },
          csv: {
            dateFormat: "%d-%m-%Y %H:%M:%S",
          },
        },
      },
      rangeSelector: {
        x: -10,
        allButtonsEnabled: false,
        enabled: false,
        inputEnabled: false,
        buttonPosition: {
          align: "right",
        },
        labelStyle: {
          display: "none",
        },
      },
      title: {
        text: `${indicator?.toUpperCase()} Time Series`,
      },
      xAxis: {
        minRange: 0,
        scrollbar: {
          enabled: true,
        },
        type: "datetime",
        opposite: false,
      },
      yAxis: {
        title: {
          text: `${indicator?.toUpperCase()} Value`,
          margin: 5,
          rotation: 270,
          style: {
            fontSize: "0.5 em",
          },
        },
        reversed: false,
        opposite: false,
        showEmpty: true,
        zoomEnabled: true,
        endOnTick: false,

        plotBands:
          indicator === "CDI"
            ? CDI_legend
            : indicator === "PDI"
            ? PDI_legend
            : indicator === "TDI"
            ? TDI_legend
            : [],
            offset: 0,
        min: 0,
        tickInterval: 0.5,
        max: 3,
      },
      legend: {
        enabled: "true",
      },
      tooltip: {
        formatter: function () {
          const PDI_data_hover = (point) => {
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
            // filteredLegend?.length > 0
            //   ? filteredLegend
            //   : filtered?.length > 0
            //   ? filtered
            //   : data,

            filtered?.length > 0 ? filtered : data,
          color: "#2f7ed8",
          lineWidth: 2.5,
          marker: { enabled: false, radius: 4 },
        },
      ],
    });
  }, [Hreload,data,filtered]);

  return (
    <>
      <div
    id={chart_id}
    style={{
      width: "100%",
      height: "100%", 
      padding: "2px", 
      boxSizing: "border-box", 
    }}
  ></div>
    </>
  );
};

export default TimeSeriesChart;
