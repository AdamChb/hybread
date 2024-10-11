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
  async mounted() {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);

    const ctx = document.getElementById("myDonutChart").getContext("2d");
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/chart/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    const rawData = await response.json();
    console.log(rawData);

    let data = [];
    rawData.forEach(category => {
      data.push(Number(category.Number_of_Liked_Books));      
    });
    console.log(data);
    

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Children's Books",
          "Science Fiction",
          "Mystery & Thriller",
          "Historical",
          "Educational",
        ],
        datasets: [
          {
            label: "Number of Books",
            data: data,
            backgroundColor: [
              "#3B8397",
              "#479FA2",
              "#5DB9A0",
              "#87D296",
              "#BCE78A",
            ],
            hoverOffset: 15,
            hoverBackgroundColor: [
              "#3B8397",
              "#479FA2",
              "#5DB9A0",
              "#87D296",
              "#BCE78A",
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            font: {
              weight: "bold",
              size: 14,
            },
          },
          datalabels: {
            display: true,
            color: "white",
            font: {
              weight: "bold",
              size: 14,
            },
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
