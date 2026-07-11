const RAY = "M0,-12 L1.7,-2.2 L0,0 L-1.7,-2.2 Z";
const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * The site's logo mark: an eight-ray tapered spark, drawn in currentColor.
 * Pass `size` for fixed pixel dimensions, or size via className (w-/h-).
 */
export default function SparkMark({
  size,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      {...(size ? { width: size, height: size } : {})}
      viewBox="-14 -14 28 28"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      {ANGLES.map((a) => (
        <path key={a} d={RAY} transform={`rotate(${a})`} />
      ))}
    </svg>
  );
}
