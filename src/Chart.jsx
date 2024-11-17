import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const getHourlyDataForSelectedDay = (selectedDayIndex, timestamps, data) => {
  const startIndex = selectedDayIndex * 24;
  const endIndex = startIndex + 24;
  const hourlyTimestamps = timestamps.slice(startIndex, endIndex);
  const dataArray = Array.isArray(data) ? data : Object.values(data);

  const hourlyData = dataArray.slice(startIndex, endIndex).map(value => Math.round(value)); // or use Math.floor() or Math.ceil()
  return { hourlyTimestamps, hourlyData };
};

const shiftTimeBy16Hours = (timestamps) => {
  return timestamps.map((timestamp) => {
    const date = new Date(timestamp);
    date.setHours(date.getHours() - 16);  // Subtract 16 hours
    return date;
  });
};

const Chart = ({ timestamps, temperatures, rainfall, selectedDay }) => {
  const { hourlyTimestamps, hourlyData: hourlyTemperatures } = getHourlyDataForSelectedDay(
    selectedDay,
    timestamps,
    temperatures
  );
  const { hourlyData: hourlyRainfall } = getHourlyDataForSelectedDay(selectedDay, timestamps, rainfall);

  // Shift the time by 16 hours
  const adjustedTimestamps = shiftTimeBy16Hours(hourlyTimestamps);

  const chartData = {
    labels: adjustedTimestamps.map((time) =>
      time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    ),
    datasets: [
      {
        label: 'Hourly Temperature (°F)',
        data: hourlyTemperatures,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-temp',
        fill: true,
      },
      {
        label: 'Hourly Rainfall Probability (%)',
        data: hourlyRainfall,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y-rainfall',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    aspectRatio: 1.3,
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      'y-temp': {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°F)',
        },
        grid: {
          drawOnChartArea: true,
        },
        ticks: {
          color: 'rgba(255, 99, 132, 1)', 
        },
      },
      'y-rainfall': {
        min: 0,
        max: 100,
        stepSize: 10,
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Rainfall Probability (%)',
        },
        grid: {
          drawOnChartArea: false, 
        },
        ticks: {
          color: 'rgba(54, 162, 235, 1)', 
          min: 0,  
          max: 100, 
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default Chart;
