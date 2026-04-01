export default function ManaoLogo({
  width = 120,
  height = 120,
  className = ""
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* House building icon */}
      <g>
        {/* Roof - Triangle */}
        <path
          d="M60 20L95 50H25L60 20Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Main building */}
        <rect
          x="28"
          y="48"
          width="64"
          height="52"
          fill="white"
          stroke="white"
          strokeWidth="2"
        />

        {/* Door */}
        <rect
          x="52"
          y="75"
          width="16"
          height="25"
          fill="#1F2937"
          stroke="#1F2937"
          strokeWidth="1"
        />

        {/* Left window */}
        <rect
          x="35"
          y="58"
          width="12"
          height="12"
          fill="#1F2937"
          stroke="#1F2937"
          strokeWidth="1"
        />

        {/* Right window */}
        <rect
          x="73"
          y="58"
          width="12"
          height="12"
          fill="#1F2937"
          stroke="#1F2937"
          strokeWidth="1"
        />

        {/* Left upper window */}
        <rect
          x="35"
          y="68"
          width="12"
          height="12"
          fill="#1F2937"
          stroke="#1F2937"
          strokeWidth="1"
        />

        {/* Right upper window */}
        <rect
          x="73"
          y="68"
          width="12"
          height="12"
          fill="#1F2937"
          stroke="#1F2937"
          strokeWidth="1"
        />

        {/* Accent line - representing growth/value */}
        <path
          d="M20 100 L45 85 L70 95 L100 70"
          stroke="white"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </g>
    </svg>
  );
}
