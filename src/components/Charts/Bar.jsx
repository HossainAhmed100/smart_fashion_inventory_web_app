import { Card, CardBody } from "@nextui-org/react";
import Chart from "react-apexcharts";

const chartConfig = {
    type: "bar",
    height: 350,
    series: [
      {
        name: "Completed",
        data: [320, 160, 300, 220, 600, 250, 600, 130, 500],
      },
      {
        name: "Active",
        data: [120, 50, 400, 320, 500, 450, 200, 430, 300],
      },
      {
        name: "Paused",
        data: [220, 60, 500, 120, 400, 250, 400, 530, 300],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#ffe300", "#ffcdff", "#e4daff"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };


export default function Bar() {
return (
    <Card>
    <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
    </CardBody>
    </Card>
);
}
