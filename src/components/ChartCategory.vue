<template>
    <div class="chart-container">
      <canvas id="myDonutChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  
  export default {
    name: "DonutChart",
    mounted() {
      Chart.register(...registerables);
      Chart.register(ChartDataLabels);
      
      const ctx = document.getElementById('myDonutChart').getContext('2d');
  
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Children\'s Books', 'Historical', 'Educational', 'Mystery & Thriller', 'Science Fiction'],
          datasets: [{
            label: 'Number of Books',
            data: [122, 87, 43, 153, 184],
            backgroundColor: [
              '#66c2a5', 
              '#fc8d62', 
              '#8da0cb', 
              '#e78ac3', 
              '#a6d854'
            ],
            hoverOffset: 4
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false // Hides the default legend
            },
            datalabels: {
              formatter: (value, ctx) => {
                return ctx.chart.data.labels[ctx.dataIndex] + ": " + value;
              },
              color: '#000',
              align: 'end',
              anchor: 'end',
              offset: 10
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 400px;
    height: 400px;
    position: relative;
  }
  </style>
  