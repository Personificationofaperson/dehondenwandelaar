export default function Sterren({ aantal = 5, klein = false, label }) {
  const maat = klein ? 14 : 17
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={label ?? `${aantal} van de 5 sterren`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={maat}
          height={maat}
          viewBox="0 0 24 24"
          fill={i < aantal ? "#F5A623" : "#DDE5EA"}
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.35l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95L12 2.5z" />
        </svg>
      ))}
    </div>
  )
}
