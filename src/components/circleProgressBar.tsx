interface CircularProgressBarProps {
  percentage: string;
  color: string;
  size?: number;
  isDiplayed?: boolean;
}
export default function CircularProgressBar({ percentage, color, size = 16, isDiplayed = false }: CircularProgressBarProps) {
  // Define the function to determine the color based on the given value
  function filledColorSwitch(color) {
    switch (color) {
      case 'text-veryLow':
        return '#F04438';
      case 'text-low':
        return '#FD853A';
      case 'text-medium':
        return '#FEC84B';
      case 'text-high':
        return '#24B299';
      case 'text-veryHigh':
        return '#039855';
      default:
        return '#000000';
    }
  }

  // Determine the filled color based on the input color
  const filledColor = filledColorSwitch(color);
  console.log(color);
  // Convert the percentage to a number
  const percentageNumber = Number(percentage);
  // Calculate the angle based on the percentage
  const angle = (percentageNumber / 100) * 360;

  // Calculate the coordinates of the endpoint of the progress arc
  const x = Math.cos((angle - 90) * (Math.PI / 180)) * 7 + 8;
  const y = Math.sin((angle - 90) * (Math.PI / 180)) * 7 + 8;

  // Determine the large-arc-flag based on whether the angle is greater than 180 degrees
  const largeArcFlag = angle > 180 ? 1 : 0;

  // Construct the path
  const path = `M8,1 A7,7 0 ${largeArcFlag},1 ${x},${y} L8,8 Z`;

  return (
    <div className="">
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_6017_3953)">
          <circle opacity="0.2" cx="8" cy="8" r="7" fill={filledColor} />
          <path d={path} fill={filledColor} />
          {isDiplayed && (
             <text x="8" y="8" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="6" fontFamily="outfit" fontWeight={900}>
             {percentage}
           </text>)}
        </g>
        <defs>
          <clipPath id="clip0_6017_3953">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
