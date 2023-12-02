import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

const LineChart = () => {
  const labels = [1, 2, 3, 4, 5, 6, 7]
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  }
  const chartOptions = {
    scale: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  }

  return (
    <div>
      <Line data={data} options={chartOptions} />
    </div>
  )
}

export default LineChart
