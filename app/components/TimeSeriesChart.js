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
import {
  CDI_legend,
  PDI_legend,
  TDI_legend,
  VDI_legend,
} from "../utils/drought_levels";
import { ToastContainer, toast } from "react-toastify";

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

  const errorAdding = () => toast.error("No data available for current filter");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API}data/district/${
            district?.trim()?.toLowerCase() === "all" || district?.trim() === ""
              ? `all/${indicator?.trim()?.toLowerCase()}`
              : `${indicator?.trim()?.toLowerCase()}/${district
                  ?.trim()
                  ?.toUpperCase()}`
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
    let filtered = data;
    // setFiltered(data);

    if (timerange?.trim()?.length !== 0) {
      if (filtered?.length > 0) {
        const filterbypcu = filtered?.filter(
          (month_data) => filterByYear(month_data) === parseInt(timerange)
        );
        filtered = filterbypcu;
        // setFiltered(filterbypcu);
        filterbypcu?.length === 0 && errorAdding();
      } else {
        const filterbypcu = data?.filter(
          (month_data) => filterByYear(month_data) === parseInt(timerange)
        );
        filtered = filterbypcu;
        // setFiltered(filterbypcu);
        filterbypcu?.length === 0 && errorAdding();
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
        console.log("filteredbylegend", filteredbylegend);
        filtered = filteredbylegend;
        // setFiltered(filteredbylegend);
        filteredbylegend?.length === 0 && errorAdding();
      } else {
        const filteredbylegend_two = filterDataByLegend(filterBylegend, data);
        console.log("filteredbylegend_two", filteredbylegend_two);
        filtered = filteredbylegend_two;
        // setFiltered(filteredbylegend_two);
        filteredbylegend_two?.length === 0 && errorAdding();
      }
    }
    setFiltered(filtered);
    setHreload(v4());
  }, [data, timerange, filterBylegend]);

  useEffect(() => {
    Highcharts.stockChart(`${chart_id}`, {
      chart: {
        marginLeft: 50,
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
            : indicator === "VDI"
            ? VDI_legend
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
            )}<br><b>CDI:</b> ${point.y.toFixed(
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
            )}<br><b>TDI:</b> ${point.y.toFixed(
              4
            )}<br><b>Temperature Level:</b> ${Temperature}`;
          };
          const VDI_data_hover = (point) => {
            let Vegetation = "Normal to below normal";
            const value = point.y;
            if (value <= 0.4) Temperature = "Exeptionally higher than normal";
            else if (value <= 0.8) Vegetation = "Higher than normal vegetation";
            return `<b>Date:</b> ${Highcharts.dateFormat(
              "%d %b %Y",
              point.x
            )}<br><b>VDI:</b> ${point.y.toFixed(
              4
            )}<br><b>Vegetation Level:</b> ${Vegetation}`;
          };
          return indicator === "PDI"
            ? PDI_data_hover(this)
            : indicator === "CDI"
            ? CDI_data_hover(this)
            : indicator === "TDI"
            ? TDI_data_hover(this)
            : indicator === "VDI"
            ? VDI_data_hover(this)
            : "";
        },
      },
      series: [
        {
          name: `Uganda ${indicator?.toUpperCase()}`,
          data:
            // filteredLegend?.length > 0
            //   ? filteredLegend
            //   : filtered?.length > 0
            //   ? filtered
            //   : data,

            // filtered?.length > 0 ? filtered : data,
            filtered,
          color: "#2f7ed8",
          lineWidth: 2.5,
          marker: { enabled: false, radius: 4 },
        },
      ],
    });
  }, [Hreload, data, filtered, indicator]);

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
      <ToastContainer />
    </>
  );
};

export default TimeSeriesChart;
