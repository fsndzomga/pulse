import { NextResponse } from 'next/server'

const SCORE_API_URL = process.env.SCORE_API_URL
const AUTH_TOKEN = process.env.AUTH_TOKEN

export async function GET() {
  if (!SCORE_API_URL) {
    return NextResponse.json({ error: 'Score API URL not configured' }, { status: 500 })
  }

  try {
    const response = await fetch(SCORE_API_URL, {
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
    console.error('Error fetching score data:', error)
    return NextResponse.json({ error: 'Failed to fetch score data' }, { status: 500 })
  }
}
