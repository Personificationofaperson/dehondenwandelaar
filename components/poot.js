/**
 * Een hondenpootje. Erft de kleur van zijn ouder via currentColor, zodat
 * hetzelfde icoon overal past zonder varianten.
 *
 * Bewust terughoudend gebruikt: als een pootje overal opduikt wordt het
 * behang in plaats van een accent.
 */
export default function Poot({ className = "", size = 16, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      {/* vier tenen */}
      <ellipse cx="6.1" cy="9.4" rx="2.5" ry="3.2" transform="rotate(-18 6.1 9.4)" />
      <ellipse cx="10.3" cy="6.3" rx="2.4" ry="3.3" transform="rotate(-6 10.3 6.3)" />
      <ellipse cx="14.9" cy="6.5" rx="2.4" ry="3.3" transform="rotate(8 14.9 6.5)" />
      <ellipse cx="18.5" cy="10" rx="2.5" ry="3.1" transform="rotate(20 18.5 10)" />
      {/* zool */}
      <path d="M12.3 12.2c2.6 0 4.4 1.4 5.4 3 .9 1.5.7 3.2-.5 4.2-1 .9-2.4.8-3.6.5a5.6 5.6 0 0 0-2.7 0c-1.2.3-2.6.4-3.6-.5-1.2-1-1.4-2.7-.5-4.2 1-1.6 2.9-3 5.5-3Z" />
    </svg>
  )
}

/**
 * Variant met een ronde zool, bedoeld als achtergrond voor een cijfer.
 * De gewone poot heeft een brede, lage zool waar een getal niet netjes in
 * past. Hier is de zool een cirkel, dus staat het cijfer altijd gecentreerd.
 */
export function PootBadge({ className = "", size = 56, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <ellipse cx="5.8" cy="12.2" rx="2.5" ry="3.3" transform="rotate(-26 5.8 12.2)" />
      <ellipse cx="11.4" cy="7.6" rx="2.6" ry="3.5" transform="rotate(-9 11.4 7.6)" />
      <ellipse cx="20.6" cy="7.6" rx="2.6" ry="3.5" transform="rotate(9 20.6 7.6)" />
      <ellipse cx="26.2" cy="12.2" rx="2.5" ry="3.3" transform="rotate(26 26.2 12.2)" />
      <circle cx="16" cy="21.2" r="9" />
    </svg>
  )
}
