import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import AuthenticationContext from '../../context/authentication'
import { APIURL } from '../../App'

const LineChart = () => {
  const { token } = useContext(AuthenticationContext)
  const [labels, setLabels] = useState<string[] | undefined>(undefined)
  const [dataset, setDataset] = useState<number[] | undefined>(undefined)

  useEffect(() => {
    const fetchTotalAmountOfEachDay = async () => {
      try {
        const totalAmountLast30DaysResponse = await fetch(
          `${APIURL}/api/v1/orders/getEarningsForLast30Days`,
          {
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        if (!totalAmountLast30DaysResponse.ok) {
          throw new Error(`Error fetching amount array for last 30 days array`)
        }

        const totalAmountLast30DaysData = await totalAmountLast30DaysResponse.json()
        setLabels(totalAmountLast30DaysData.data[0])
        setDataset(totalAmountLast30DaysData.data[1])
      } catch (error) {
        console.log('Failed to fetch orders of last 30 days', error)
      }
    }

    fetchTotalAmountOfEachDay()
  }, [token])

  const data = {
    labels: labels || [],
    datasets: [
      {
        label: 'Analysis for earnings in the past 30 days',
        data: dataset || [],
      },
    ],
  }
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount earned',
        },
        grid: {
          display: true,
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
    <div className="h-96">
      {labels && dataset ? (
        <Line data={data} options={chartOptions} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default LineChart
