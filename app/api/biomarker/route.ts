import { NextResponse } from 'next/server'

const BIOMARKER_API_URL = process.env.BIOMARKER_API_URL
const AUTH_TOKEN = process.env.AUTH_TOKEN

export async function GET() {
  if (!BIOMARKER_API_URL) {
    return NextResponse.json({ error: 'Biomarker API URL not configured' }, { status: 500 })
  }

  try {
    const response = await fetch(BIOMARKER_API_URL, {
      headers: {
        'Authorization': AUTH_TOKEN || '',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching biomarker data:', error)
    return NextResponse.json({ error: 'Failed to fetch biomarker data' }, { status: 500 })
  }
}
