interface ProgressCircleProps {
  value: number
  label: string
  color: string
}

export default function ProgressCircle({ value, label, color }: ProgressCircleProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={`h-20 w-20 rounded-full ${color} flex items-center justify-center mb-2`}>
        <span className="font-bold text-xl">{value}</span>
      </div>
      <span className="text-xs text-gray-400 text-center">{label}</span>
    </div>
  )
}

