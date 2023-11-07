import { Chart } from "@/app/components/General/Widget/VMCharts";
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

const useChartOptions = (labels: any) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [
      "rgba(84, 59, 59, .5)",
      theme.palette.warning.main,
      "rgba(84, 59, 59, 1)",
      "#dfd68a",
    ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

export const AnalyticsSocialSources = (props: any) => {
  const { chartSeries, labels } = props;
  const chartOptions = useChartOptions(labels);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  return (
    <>
      <Chart
        height={200}
        width={"100%"}
        options={chartOptions}
        series={chartSeries}
        type="donut"
      />

      <Grid container spacing={1}>
        {chartSeries.map((item: any, index: any) => (
          <Grid key={index} xs={12} sm={6}>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Box
                sx={{
                  backgroundColor: chartOptions.colors[index],
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                }}
              />
              <Typography variant="subtitle2">{labels[index]}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
