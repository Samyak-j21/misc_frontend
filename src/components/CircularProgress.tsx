interface CircularProgressProps {
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
}

export function CircularProgress({
  easySolved,
  easyTotal,
  mediumSolved,
  mediumTotal,
  hardSolved,
  hardTotal,
}: CircularProgressProps) {
  const easyPercentage = (easySolved / easyTotal) * 100;
  const mediumPercentage = (mediumSolved / mediumTotal) * 100;
  const hardPercentage = (hardSolved / hardTotal) * 100;

  const size = 200;
  const center = size / 2;
  const strokeWidth = 18;

  // Radii for concentric circles (from outer to inner)
  const hardRadius = 78;
  const mediumRadius = 58;
  const easyRadius = 38;

  const getCircumference = (radius: number) => 2 * Math.PI * radius;
  const getOffset = (percentage: number, radius: number) => {
    const circumference = getCircumference(radius);
    return circumference - (percentage / 100) * circumference;
  };

  return (
    <div className="flex items-center gap-12">
      {/* Circular Progress Visualization */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Hard (Outer) - Red */}
          <circle
            cx={center}
            cy={center}
            r={hardRadius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
            className="dark:stroke-zinc-700"
          />
          <circle
            cx={center}
            cy={center}
            r={hardRadius}
            stroke="#ef4444"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={getCircumference(hardRadius)}
            strokeDashoffset={getOffset(hardPercentage, hardRadius)}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />

          {/* Medium (Middle) - Orange */}
          <circle
            cx={center}
            cy={center}
            r={mediumRadius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
            className="dark:stroke-zinc-700"
          />
          <circle
            cx={center}
            cy={center}
            r={mediumRadius}
            stroke="#f97316"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={getCircumference(mediumRadius)}
            strokeDashoffset={getOffset(mediumPercentage, mediumRadius)}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />

          {/* Easy (Inner) - Green */}
          <circle
            cx={center}
            cy={center}
            r={easyRadius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
            className="dark:stroke-zinc-700"
          />
          <circle
            cx={center}
            cy={center}
            r={easyRadius}
            stroke="#22c55e"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={getCircumference(easyRadius)}
            strokeDashoffset={getOffset(easyPercentage, easyRadius)}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl text-zinc-900 dark:text-white">
            {easySolved + mediumSolved + hardSolved}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Solved</span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Easy</span>
            <span className="text-sm text-zinc-900 dark:text-white ml-2">
              {easySolved}/{easyTotal}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
          <div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Medium</span>
            <span className="text-sm text-zinc-900 dark:text-white ml-2">
              {mediumSolved}/{mediumTotal}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Hard</span>
            <span className="text-sm text-zinc-900 dark:text-white ml-2">
              {hardSolved}/{hardTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
