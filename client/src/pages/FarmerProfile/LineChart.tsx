import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { getFormattedDateWithoutYear } from '../../utils/getFormattedDate'
import AuthenticationContext from '../../context/authentication'

const LineChart = () => {
  const { token } = useContext(AuthenticationContext)
  let initialArray: Number[] = []
  for (let i = 0; i < 30; i++) {
    initialArray.push(0)
  }
  const [dataArray, setDataArray] = useState<Number[]>(initialArray)
  let dates: Date[] = []
  let today = new Date()

  for (let i = 29; i >= 0; i--) {
    dates.push(new Date(today.getTime() - i * 24 * 60 * 60 * 1000))
  }

  let labels: string[] = []
  for (let i = 0; i < 30; i++) {
    labels.push(getFormattedDateWithoutYear(dates[i]))
  }

  useEffect(() => {
    const fetchTotalAmountOfEachDay = async () => {
      try {
        const totalAmountLast30Days = await Promise.all(
          dates.map(async (date) => {
            const response = await fetch(
              `http://localhost:5000/api/v1/orders/date/${date}`,
              {
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              },
            )
            if (!response.ok) {
              throw new Error(
                `Error fetching data for ${date}: ${response.statusText}`,
              )
            }

            const totalAmountByDate = await response.json()
            return totalAmountByDate.totalAmount
          }),
        )
        setDataArray(totalAmountLast30Days)
      } catch (error) {
        console.log('Failed to fetch orders of last 30 days', error)
      }
    }

    fetchTotalAmountOfEachDay()
  }, [])

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First Dataset',
        data: dataArray,
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
    <div className="h-96">
      <Line data={data} options={chartOptions} />
    </div>
  )
}

export default LineChart
