import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const getHourlyTimestampsForSelectedDay = (selectedDayIndex, timestamps, temps) => {
    const startIndex = selectedDayIndex * 24; 
    const endIndex = startIndex + 24;
    const tempArray = Object.values(temps);

    const hourlyTimestamps = timestamps.slice(startIndex, endIndex);
    const hourlyTemperatures = tempArray.slice(startIndex, endIndex);
  
    return { hourlyTimestamps, hourlyTemperatures };
  };

const Chart = ({ timestamps, temperatures, selectedDay}) => {
    console.log("data", timestamps);
    console.log("selectedDay", selectedDay);
    console.log("temperatures", temperatures);

    const { hourlyTimestamps, hourlyTemperatures } = getHourlyTimestampsForSelectedDay(selectedDay, timestamps, temperatures);

    console.log('hourlyTimestamps:', hourlyTimestamps);


  console.log('hourlyTemperatures:', hourlyTemperatures);

  const chartData = {
    labels: hourlyTimestamps.map(time => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: 'Hourly Temperature (°C)',
        data: hourlyTemperatures,
        borderColor: 'cyan',
        backgroundColor: 'cyan',
        fill: true,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°F)'
        }
      }
    }
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
