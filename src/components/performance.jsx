import React from 'react';
import Chart from 'react-apexcharts';

const PerformancePieChart = () => {
  const options = {
    chart: {
      type: 'pie',
    },
    labels: ['Memory Usage', 'CPU Usage'],
    colors: ['#00E396', '#008FFB'],
    title: {
      text: 'Performance Chart: Memory vs CPU',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    legend: {
      position: 'bottom',
    },
  };

  const series = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]; // Random data for memory and CPU usage

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width="400"
    />
  );
};

export default PerformancePieChart;
