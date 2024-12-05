import { Progress } from "@/components/ui/progress"

interface RadialChartProps {
  value: number;
}

export function RadialChart({ value }: RadialChartProps) {
  const percentage = Math.round(value * 100);

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          className="text-blue-600 progress-ring__circle stroke-current"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray={`${percentage * 2.51} 251.2`}
          strokeDashoffset="0"
          transform="rotate(-90 50 50)"
        ></circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
    </div>
  )
}
