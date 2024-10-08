<!-- ------------------------------
  Hybread - ChartCategory.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the chart.
------------------------------ -->

<script>
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  name: "DonutChart",
  mounted() {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);

    const ctx = document.getElementById("myDonutChart").getContext("2d");

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Children's Books",
          "Historical",
          "Educational",
          "Mystery & Thriller",
          "Science Fiction",
        ],
        datasets: [
          {
            label: "Number of Books",
            data: [122, 87, 43, 153, 184],
            backgroundColor: [
              "#D9D9D9",
              "#93725B",
              "#92877A",
              "#F5E2C8",
              "#6C6C6C",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
          datalabels: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  },
};
</script>

<template>
  <div class="chart-container">
    <canvas id="myDonutChart"></canvas>
  </div>
</template>

<!-- Style of the component -->
<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
