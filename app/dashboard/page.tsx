"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { processHealthData, processScoreData } from '@/utils/processData'
import { RadialChart } from '@/components/radial-chart'

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

export default function HealthDashboard() {
  const [healthData, setHealthData] = useState([])
  const [scoreData, setScoreData] = useState({})

  useEffect(() => {
    fetchData('/api/biomarker').then(data => setHealthData(processHealthData(data)));
    fetchData('/api/score').then(data => setScoreData(processScoreData(data)));
  }, [])

  const metrics = [
    { key: 'steps', title: 'Daily Steps', unit: 'steps' },
    { key: 'active_energy_burned', title: 'Active Energy Burned', unit: 'kcal' },
    { key: 'sleep_in_bed_duration', title: 'Sleep Duration', unit: 'minutes' },
    { key: 'activity_sedentary_duration', title: 'Sedentary Time', unit: 'minutes' },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Health Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.entries(scoreData).map(([type, data]) => (
          <Card key={type}>
            <CardHeader>
              <CardTitle>{type.replace('_', ' ').charAt(0).toUpperCase() + type.slice(1)}</CardTitle>
              <CardDescription>Latest score: {data[data.length - 1]?.score.toFixed(2) || 'N/A'}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadialChart value={data[data.length - 1]?.score || 0} />
            </CardContent>
          </Card>
        ))}
      </div>
      <Tabs defaultValue="steps">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {metrics.map((metric) => (
            <TabsTrigger key={metric.key} value={metric.key}>
              {metric.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {metrics.map((metric) => (
          <TabsContent key={metric.key} value={metric.key}>
            <Card>
              <CardHeader>
                <CardTitle>{metric.title}</CardTitle>
                <CardDescription>Daily {metric.title.toLowerCase()} over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={healthData.find(d => d.type === metric.key)?.data || []}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis unit={` ${metric.unit}`} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
